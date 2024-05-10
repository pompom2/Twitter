// data/auth.js
import Mongoose from 'mongoose';
import { useVirtualId } from '../db/database.js';

const userSchema = new Mongoose.Schema({
    username: {type: String, require: true},
    name: {type: String, require: true},
    email: {type: String, require: true},
    password: {type: String, require: true},
    url: String
});

useVirtualId(userSchema);

const User = Mongoose.model('User', userSchema) // 컬랙션생성



// // 아이디(username) 중복 검사
export async function findByUsername(username){
    return User.findOne({username});
} 

// // id 중복 검사 
export async function findById(id){
    return User.findById(id);
}

export async function createUser(user){
    return new User(user).save().then((data) => data.id);
}


// function mapOptionalUser(user){
//     return user ? { ...user, id: user._id.toString() } : user;
// }

// export async function login(username){
//     return users.find((users) => users.username === username);
// }


// {
//     "username":"orange",
//     "password":"12345",
//     "name":"오렌지",
//     "email":"orange@orange.com",
//     "url":"https://img.freepik.com/premium-vector/banana-cute-kawaii-style-fruit-character-vector-illustration_787461-1772.jpg"
// }