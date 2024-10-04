const conn = require('../mariadb')
const {StatusCodes} = require('http-status-codes');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const dotenv = require('dotenv');
dotenv.config();
const { body, param, validationResult } = require('express-validator');

const validate = (req, res, next) => {
    const err = validationResult(req)

    if (err.isEmpty()) {
        return next()
    } else {
        return res.status(400).json(err.array())
    }
}

const join = [
    [
        body('email').notEmpty().isEmail().withMessage('이메일 확인 필요'),
        body('password').notEmpty().isString().withMessage('비밀번호 확인 필요'),
        body('name').notEmpty().isString().withMessage('이름 확인 필요'),
        validate
    ],
    (req, res) => {
        const { email, password, name } = req.body;
        
        let sql = 'INSERT INTO users (email, password, salt, name) VALUES (?,?,?,?)';

        // 암호화된 비밀번호와 salt 값을 같이 DB에 저장
        const salt = crypto.randomBytes(64).toString('base64');
        const hashPassword = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('base64');

        let values = [email, hashPassword, salt, name];
        conn.query(sql, values,
            (err, results) => {
                if (err) {
                    console.log(err);
                    return res.status(StatusCodes.BAD_REQUEST).end();
                }

                if (results.affectedRows == 0) {
                    return res.status(400).end()
                } else {
                    res.status(StatusCodes.CREATED).json(results);
                }
            }
        )
    }
];

const login = [
    [
        body('email').notEmpty().isEmail().withMessage('이메일 확인 필요'),
        body('password').notEmpty().isString().withMessage('비밀번호 확인 필요'),
        validate
    ],
    (req, res) => {
        const { email, password } = req.body;
        let sql = 'SELECT * FROM users WHERE email = ?';
        conn.query(sql, email,
            (err, results) => {
                if (err) {
                    console.log(err);
                    return res.status(StatusCodes.BAD_REQUEST).end();
                }

                var loginUser = results[0]

                const hashPassword = crypto.pbkdf2Sync(password, loginUser.salt, 10000, 64, 'sha512').toString('base64');

                if(loginUser && loginUser.password == hashPassword){
                    const token = jwt.sign({
                        email : loginUser.email,
                        password : loginUser.password,
                        name : loginUser.name
                    }, process.env.PRIVATE_KEY,{
                        expiresIn : '30m',
                        issuer : "junho"
                    });

                    res.cookie("token", token, {
                        httpOnly : true
                    });
                    console.log(token);

                    res.status(StatusCodes.OK).json({
                        message : `${loginUser.name} 님 로그인 되셨습니다.`
                    });
                } else{
                    res.status(StatusCodes.UNAUTHORIZED).json({
                        message : "이메일 또는 비밀번호를 확인해주세요."
                    })
                }
            }
        )
    }
];

const passwordResetRequest = [
    [
        body('email').notEmpty().isEmail().withMessage('이메일 확인 필요'),
        validate
    ],
    (req, res) => {
        const {email} = req.body;
        let sql = 'SELECT * FROM users WHERE email = ?';
        conn.query(sql, email,
            (err, results) => {
                if (err) {
                    console.log(err);
                    return res.status(StatusCodes.BAD_REQUEST).end();
                }

                const user = results[0];
                if(user){
                    return res.status(StatusCodes.OK).json({
                        email : email
                    });
                } else{
                    return res.status(StatusCodes.UNAUTHORIZED).end();
                }
            }
        )
    }
];

const passwordReset = [
    [
        body('email').notEmpty().isEmail().withMessage('이메일 확인 필요'),
        body('password').notEmpty().isString().withMessage('비밀번호 확인 필요'),
        validate
    ],
    (req, res) => {
        const { email, password } = req.body;

        
        let sql = 'UPDATE users SET password = ?, salt = ? WHERE email = ?';
        
        const salt = crypto.randomBytes(64).toString('base64');
        const hashPassword = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('base64');

        let values = [hashPassword, salt, email]
        conn.query(sql, values,
            (err, results) => {
                if (err) {
                    console.log(err);
                    return res.status(StatusCodes.BAD_REQUEST).end();
                }

                if (results.affectedRows == 0) {
                    return res.status(StatusCodes.BAD_REQUEST).end()
                } else {
                    return res.status(StatusCodes.OK).json(results);
                }
            }
        )
    }
];

module.exports = {
    join,
    login,
    passwordResetRequest,
    passwordReset
};