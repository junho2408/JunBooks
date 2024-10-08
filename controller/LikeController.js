const conn = require('../mariadb')
const {StatusCodes} = require('http-status-codes');
const { body, param, validationResult } = require('express-validator');

const validate = (req, res, next) => {
    const err = validationResult(req)

    if (err.isEmpty()) {
        return next()
    } else {
        return res.status(400).json(err.array())
    }
}

const addLike = [
    [
        param('id').notEmpty().isInt().withMessage('책 아이디 확인 필요'),
        validate
    ],
    (req, res) => {
        const { id } = req.params;
        const { user_id } = req.body;
        let sql = 'INSERT INTO likes (user_id, liked_book_id) VALUES (?, ?)';
        let values = [user_id, id];
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

const removeLike = [
    [
        param('id').notEmpty().isInt().withMessage('책 아이디 확인 필요'),
        validate
    ],
    (req, res) => {
        const { id } = req.params;
        const { user_id } = req.body;
        let sql = `DELETE FROM likes WHERE user_id = ? AND liked_book_id = ?`;
        let values = [user_id, id];
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

module.exports = {
    addLike,
    removeLike
};