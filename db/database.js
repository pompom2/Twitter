import { config } from '../config.js';
import MongoDB from 'mongodb';
let db;
export async function connectDB(){
    return MongoDB.MongoClient.connect(config.db.host).then((client) => db = client.db());
}
export function getUsers(){
    return db.collection('users');   //데이터를 넣을 때 users객체에 넣겠다
}
export function getTweets(){
    return db.collection('tweets');
}