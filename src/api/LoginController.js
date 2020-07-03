import send from '../config/MailConfig'
import moment from 'moment'
import jsonwebtoken from 'jsonwebtoken'
import {JWT_SECRET} from '../config/config'
import json from 'koa-json';
import {checkCode} from '../common/utils'
import Users from '../model/Users'


class LoginController {
    constructor() {

    }

    async forget(ctx) {

        //在发送邮件前应检查邮件名在数据库中是否存在以及发送过来的验证码是否正确
        const {body: {username, code}} = ctx.request;
        console.log(ctx.request)
        let message = '';
        try{
            console.log(username, code)
            message = await send({
                user: 'mock',
                expire: moment().add(30, 'm').format('YYYY M D h:mm:ss'),
                user: username,
                to: username
            })
        } catch (err) {
            console.log(err);
        }
        ctx.body = {
            code: 200,
            message
        }
    }

    async login(ctx) {
        //检查验证码是否匹配及其有效性
        //验证用户名密码是否正确
        //返回token
        const {username, password, sid, code} = ctx.request.body;
        // console.log(username,password,code)
        const res = await checkCode(sid, code);
        //验证码正确且在时效范围内时：
        if (res) {
            //从数据库中查询与用户名对应的密码，当用户名存在且密码正确时，颁发token
            //当用户名不存在时应该进行错误处理
            const mongoPassword = await Users.findOne({'username':username});
            if (mongoPassword.password == password) {
                const token = jsonwebtoken.sign({id: 'dzz'}, JWT_SECRET, {expiresIn: '1d'})
                ctx.body = {
                    code: 200,
                    token
                }
            } else {
                ctx.body = {
                    code: 401,
                    msg: '密码错误'
                }
            }
        } else {
            ctx.body = {
                code: 401,
                msg: '验证码错误'
            }
        }
    }

    async reg(ctx) {
        const msg = {} //用来返回错误的对象，数据结构需要与veevalidate规定的一致
        const {code, nickname, password, email, sid} = ctx.request.body;
        //1.接收前端发送的数据
        //2.检查验证码是否正确及有效期
        //3.检查emai是否已存在
        //4.检查nickname是否已存在
        //5.若都不存在则进行注册并返回200
        //6.返回msg对象

        //2.
        const res = await checkCode(sid, code);
        let exist = false;
        //验证码正确且在时效范围内时：
        if (res) {
            //3.
            const mongoUsername = await Users.findOne({'username':email});
            if (mongoUsername) {
                msg.email = ['邮箱已注册！']
                exist = true;
            } 
            //4.
            const mongoNickName = await Users.findOne({'nickname': nickname})
            if (mongoNickName) {
                msg.nickname = ['昵称已存在！']
                exist = true;
            }
            //5.
            if (!exist) {
                const users = new Users({
                    username: email,
                    nickname,
                    password
                })
                //进行存储操作
                const mongoRes = await users.save()
                ctx.body = {
                    code: 200,
                    msg: '注册成功!',
                    data: mongoRes
                }
                return //当昵称和用户名均有效时，不执行118行内容，否则执行
            }
        } else {
            msg.code = ['验证码错误']
            ctx.body = {
                code: 401,
                msg
            }
        }
        ctx.body = {
            code: 500,
            msg
        }
    }

    async test(ctx) {
        const {username} = ctx.request.body
        console.log(username)
        console.log(ctx.request.body)
    }
}

export default new LoginController()