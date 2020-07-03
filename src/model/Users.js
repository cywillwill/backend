import mongoose from '../config/mongoConnect'
// const mongoose = require('../config/mongoConnect')

//在model文件夹中完成连接mongodb中对应collection的任务

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    password: String,
    nickname: String
})

//通过model()方法连接collection，并生成了Model类，实例化model可得到model的实例即document，同时完成了对mongodb
//数据库中对应collection的操作
const Users = mongoose.model('users', userSchema);




export default Users;
// module.exports = Users;