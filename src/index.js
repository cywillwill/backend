import koa from 'koa'
import path from 'path'
import koaBody from 'koa-body'
import bodyParser from 'koa-bodyparser'
import cors from '@koa/cors'
import router from './routes/index'
import serve from 'koa-static'
import compose from 'koa-compose'
import jwt from 'koa-jwt'
import {JWT_SECRET} from './config/config'
import errorHandle from './common/errorHandle'


const app = new koa();

const config = {
    extensions: ['.png']
}
const middleware = compose([
    cors(),
    koaBody(),
    serve(path.join(__dirname, '../public'), config), //配置静态文件路径
    errorHandle, //对未认证的请求进行错误处理
    jwt({secret: JWT_SECRET}).unless({path: [/^\/public/, /^\/login/]}), // /public开头的路径不需要进行鉴权
    
])

app.use(middleware)


app.use( async (ctx, next) => {
    
    await next()
    console.log('finalllllllllllll')

})

app.use(router())

app.listen(8000);