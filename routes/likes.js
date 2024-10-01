const express = require('express');
const router = express.Router();
const { body, param, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const cookie = require('cookie');

router.use(express.json());

// 좋아요 추가
router.put('/likes/:bookId', (req,res) => {
    res.status(200).json({
        message : "좋아요 추가"
    })
})

// 좋아요 취소
router.delete('/likes/:bookId', (req,res) => {
    res.status(200).json({
        message : "좋아요 취소"
    })
})


module.exports =  router