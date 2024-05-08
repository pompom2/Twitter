// app.js

import express from "express";
import morgan from "morgan";
import tweetsRouter from './router/tweets.js'
import authRouter from './router/auth.js'
import { config } from "./config.js";
// import { db } from "./db/database.js";

const app = express();

app.use(express.json());  // json로 연결
app.use(morgan("dev"));

//tweetsRouter 미들웨어 등록
app.use('/tweets', tweetsRouter);  
//authsRouter 미들웨어 등록
app.use('/auth', authRouter); 

app.use((req, res, next) => {
    res.sendStatus(404);
});

// DB 연결 테스트!
// db.getConnection().then(Connection => console.log(Connection));

app.listen(config.host.port);