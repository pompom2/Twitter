// tweets.js

import express from "express";
import * as tweetController from '../controller/tweet.js';
import { body } from 'express-validator';
import { validate } from "../middleware/validator.js";
import { isAuth } from "../middleware/auth.js";

const router = express.Router();

/*
    문제
    Post, Put에 text에 대해 빈문자열을 없애고, 최소 3자 이상 입력해야 데이터를 저장하도록 API에 적용 
*/
const validateTweet = [
    body('text').trim().isLength({min: 3}).withMessage('최소 3자 이상 입력'), validate
]


// 해당 아이디에 대한 트윗 가져오기
// GET
// http://localhost:8080/tweets?username=:username
// http://localhost:8080/tweets?username=banana
router.get('/', isAuth, tweetController.getTweets);

// 글번호에 대한 트윗 가져오기
// GET
// http://localhost:8080/tweets/:id
// http://localhost:8080/tweets/1
router.get('/:id', isAuth, tweetController.getTweet);

// 트윗하기
// POST
// http://localhost:8080/tweets
// name, username, text
// json 형태로 입력 후 추가된 데이터까지 모두 json으로 출력
// {
//     "id":55,
//     "text":"트윗을 추가했어요555",
//     "name":"김사과",
//     "username":"apple"
// }
router.post('/', validateTweet, isAuth, tweetController.createTweet);

// 트윗 수정하기
// PUT
// http://localhost:8080/tweets/:id
// http://localhost:8080/tweets/1
// id, username, text
// json 형태로 입력 후 변경된 데이터까지 모두 json으로 출력
// {
//     "text":"트윗을 변경했어요!"
// }
router.put('/:id', validateTweet, isAuth, tweetController.createTweet);

// 트윗 삭제하기
// DELETE
// http://localhost:8080/tweets/:id:
router.delete('/:id', isAuth, tweetController.deleteTweet);

export default router; 
