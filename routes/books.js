const express = require('express');
const router = express.Router();
const { body, param, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const cookie = require('cookie');

router.use(express.json());

// 전체 도서 조회
router.get('/books', (req,res) => {
    res.status(200).json({
        message : "전체 도서 조회"
    })
})

// 개별 도서 조회
router.get('/login/:bookId', (req,res) => {
    res.status(200).json({
        message : "개별 도서 조회"
    })
})

module.exports =  router