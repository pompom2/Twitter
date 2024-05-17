import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import { config } from '../config.js';

class Socket {
    constructor(server) {
        this.io = new Server(server, {
            cors: {
                origin: '*' // 포트번호 달라 블락 걸릴때 원활한 연결을 위해 설정
            }
        })

        this.io.use((socket, next) => {
            const token = socket.handshake.auth.token; // 토큰값
            if(!token){
                return next(new Error('인증 에러!'));
            }
            jwt.verify(token, config.jwt.secretKey, (error, decoded) => {
                if(error) {
                    return next(new Error('인증 에러!'));
                }
                next();
            });
        });
        this.io.on('connection', (socket) => {
            console.log('클라이언트 접속!');
        });
    }
}

let socket;
export function initSocket(server) {
    if(!socket){
        socket = new Socket();
    }
}

export function getSocketIo(){
    if(!socket){
        throw new Error('먼저 init를 실행하세요!');
    }
    return socket.io;
}