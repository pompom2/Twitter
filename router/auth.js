// router/auth.js

import express from 'express';
import { body } from 'express-validator';
import * as authController from '../controller/auth.js';
import { validate } from '../middleware/validator.js';
import { isAuth } from '../middleware/auth.js';

const router = express.Router();

const validateLogin = [
    body('username').trim().notEmpty().withMessage('username을 입력하세요'),
    body('password').trim().isLength({min:4}).withMessage('password는 최소 4자 이상 입력하세요'), validate
];

const validateSignup = [
    ... validateLogin,
    body('name').trim().notEmpty().withMessage('name을 입력하세요'),
    body('email').isEmail().withMessage('이메일 형식을 확인하세요'),
    body('url').isURL().withMessage('URL 형식을 확인하세요'), validate
]


router.post('/signup', validateSignup, authController.signup);

router.post('/login', authController.login);

router.get('/me', isAuth, authController.me);

export default router; 


// http://localhost:8080/auth/signup
// {
//     "username":"orange",
//     "password":"3333",
//     "name":"오렌지",
//     "email":"orange@orange.com"
// }

// http://localhost:8080/auth/login 
// {
//     "username":"orange",
//     "password":"3333"
// }

// {
//     "username":"apple",
//     "password":"1234"
// }

// {
//     "username":"apple",
//     "password":"abcd1234"
// }


// http://localhost:8080/auth/signup
// {
//     "username":"melon",
//     "password":"abcd1234",
//     "name":"이메론",
//     "email":"melon@melon.com"
// }


// http://localhost:8080/auth/login
// {
//     "username":"melon",
//     "password":"abcd1234"
// }
