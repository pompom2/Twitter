// data/auth.js

import { db } from '../db/database.js';

// 아이디(username) 중복 검사 
export async function findByUsername(username){
    return db.execute('select * from users where username = ?', [username]).then((result)=> {
        console.log(result);
        return result[0][0];
    });
}

// id 중복 검사 
export async function findById(id){
    return db.execute('select * from users where id = ?', [id]).then((result) => {
        console.log(result);
        return result[0][0];
    }); 
}

export async function createUser(user){
    console.log(user);
    const {username, hashed, name, email, url} = user;
    return db.execute('insert into users (username, password, name, email, url) values (?, ?, ?, ?, ?)', [username, hashed, name, email, url]).then((result) => {
        console.log(result);    //result[0].insertId
        return result[0].insertId;
    });
}


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