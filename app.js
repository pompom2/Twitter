// app.js

import express from "express";
import morgan from "morgan";
import tweetsRouter from './router/tweets.js'
import authRouter from './router/auth.js'
import { config } from "./config.js";
// import { sequelize } from "./db/database.js";
import { connectDB } from "./db/database.js";
import { initSocket } from "./connection/socket.js";

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
// sequelize.sync().then(() => {
//     app.listen(config.host.port);
// });

// const server = app.listen(config.host.port);
// initSocket(server);


connectDB().then((db) => {
    const server = app.listen(config.host.port);
    initSocket(server);
}).catch(console.error);

// app.listen(config.host.port);