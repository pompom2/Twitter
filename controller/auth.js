import * as authRepository from '../data/auth.js';
import bcrypt from 'bcrypt';
import jswonwebtoken from 'jsonwebtoken';

const secret = "abcd1234%^&*";

async function makeToken(id){
    const token = jswonwebtoken.sign({
        id: id,
        isAdmin: false
    }, secret, {expiresIn: '1h'})
    return token;
}

// 회원가입
export async function signup(req, res, next){
    const { username, password, name, email } = req.body;
    const hashed =bcrypt.hashSync(password, 10);
    const users = await authRepository.createUser(username, hashed, name, email);
    if(users){
        res.status(201).json(users);
    }
}
//로그인
export async function login(req, res, next){
    const { username, password } = req.body;
    const user = await authRepository.login(username);
    // const bcryptPW = bcrypt.hashSync(password, 10);
    // const result = bcrypt.compareSync('abcd1234', bcryptPW);
    if(user){
        if(bcrypt.compareSync(password, user.password)){
        res.status(201).header('Token', makeToken(username)).json(`${username} 로그인 완료`)
        }
        else{
            res.status(404).json({ message: `${username} 님 아이디 또는 비밀번호를 확인해주세요` });
        }
    }
    // else{
    //     res.status(404).json({ message: `${username} 님 아이디 또는 비밀번호를 확인해주세요` });
    // }
}

//토큰이 있는지 여부, 로그인 흔적 확인
export async function verify(req, res, next){
    const token = req.header['Token'];
    if(token){
        res.status(200).json(token);
    }
}