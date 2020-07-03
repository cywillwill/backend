import svgCaptcha from 'svg-captcha'
import {getValue, setValue} from '../config/redisConnect'


class PublicController {
  constructor() {}
  async getCaptcha(ctx) {
    const { sid } = ctx.request.query;
    const newCaptca = svgCaptcha.create({
      size: 4,
      ignoreChars: '0o1il',
      color: true,
      noise: Math.floor(Math.random() * 5),
      width: 150,
      height: 50,
    })
    // console.log(newCaptca)
    //将取到的sid值存入redis中并设置过期时间
    setValue(sid, newCaptca.text, 6000)
    ctx.body = {
      code: 200,
      data: newCaptca.data,
    }
  }
}

export default new PublicController()
