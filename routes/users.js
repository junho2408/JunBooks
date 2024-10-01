const express = require('express');
const router = express.Router();
const { body, param, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const cookie = require('cookie');

router.use(express.json());

// 회원가입
router.post('/join', (req,res) => {
    res.status(200).json({
        message : "회원가입"
    })
})

// 로그인
router.post('/login', (req,res) => {
    res.status(200).json({
        message : "로그인"
    })
})

// 비밀번호 초기화 요청
router.post('/reset', (req,res) => {
    res.status(200).json({
        message : "비밀번호 초기화 요청"
    })
})

// 비밀번호 초기화
router.put('/reset', (req,res) => {
    res.status(200).json({
        message : "비밀번호 초기화"
    })
})

module.exports =  router