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

const allCategory = [
    (req, res) => {
        const { category_id } = req.query;

        let sql = `SELECT * FROM category`;
        conn.query(sql,
            (err, results) => {
                if (err) {
                    console.log(err);
                    return res.status(StatusCodes.BAD_REQUEST).end();
                }
                res.status(StatusCodes.OK).json(results);
            }
        )
    }
];

module.exports = {
    allCategory
};