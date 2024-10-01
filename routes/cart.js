const express = require('express');
const router = express.Router();
const { body, param, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const cookie = require('cookie');

router.use(express.json());

// 장바구니 담기
router.post('/cart', (req,res) => {
    res.status(200).json({
        message : "장바구니 담기"
    })
})

// 장바구니 조회
router.get('/cart', (req,res) => {
    res.status(200).json({
        message : "장바구니 조회"
    })
})

// 장바구니 도서 삭제
router.delete('/cart/:bookId', (req,res) => {
    res.status(200).json({
        message : "장바구니 도서 삭제"
    })
})

module.exports =  router