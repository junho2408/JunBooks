const express = require('express');
const router = express.Router();
const { body, param, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const cookie = require('cookie');

router.use(express.json());

// 장바구니에서 선택한 주문 상품 목록 조회
// router.get('/orders', (req,res) => {
//     res.status(200).json({
//         message : "장바구니에서 선택한 주문 상품 목록 조회"
//     })
// })

// 결제(주문)하기
router.post('/orders', (req,res) => {
    res.status(200).json({
        message : "결제(주문)하기"
    })
})

// 주문 목록 조회
router.get('/orders', (req,res) => {
    res.status(200).json({
        message : "주문 목록 조회"
    })
})

// 주문 상세 상품 조회
router.get('/orders/:orderId', (req,res) => {
    res.status(200).json({
        message : "주문 상세 상품 조회"
    })
})

module.exports =  router