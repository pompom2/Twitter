import { config } from '../config.js';
import Mongoose from 'mongoose';

export async function connectDB(){
    return Mongoose.connect(config.db.host);
}

export function useVirtualId(schema){ 
    schema.virtual('id').get(function(){
        return this._id.toString();
    });
    schema.set('toJSN', {virtuals:true});
    schema.set('toObject', {virtuals:true});
}

let db;

export function getUsers(){
    return db.collection('users');   //데이터를 넣을 때 users객체에 넣겠다
}
export function getTweets(){
    return db.collection('tweets');
}