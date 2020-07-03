import {getValue} from '../config/redisConnect'

//检查前端传递的验证码与redis中存储的验证码信息是否吻合
export const checkCode = async (sid, code) => {
    const res = await getValue(sid)
    if (res.toLowerCase() === code.toLowerCase()) {
        return true
    } else {
        return false;
    }
}