import mongoose from 'mongoose'
// const mongoose = require('mongoose')
import {DB_URL} from './config'
// const {DB_URL} = require('./config')
//连接到mongodb数据库
mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

//连接成功
mongoose.connection.on('connected', () => {
    console.log(`connected to ${DB_URL}`)
})

//断开连接
mongoose.connection.on('disconnected', () => {
    console.log(`disconnect from ${DB_URL}`)
})

//连接异常
mongoose.connection.on('error', (error) => {
    console.log(`connect error: ${error}`)
})

// module.exports =  mongoose
export default mongoose