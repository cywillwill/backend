import bluebird from 'bluebird'
import redis from 'redis'
import {REDIS_OPS} from './config'

//使通过createClient得到的client对象的方法返回的值都是promise实例
bluebird.promisifyAll(redis)


const options = {
    host: REDIS_OPS.host,
    port: REDIS_OPS.port,
    detect_buffers: true,
    retry_strategy: function(options) {
        if (options.error && options.error.code === "ECONNREFUSED") {
          // End reconnecting on a specific error and flush all commands with
          // a individual error
          return new Error("The server refused the connection");
        }
        if (options.total_retry_time > 1000 * 60 * 60) {
          // End reconnecting after a specific timeout and flush all commands
          // with a individual error
          return new Error("Retry time exhausted");
        }
        if (options.attempt > 10) {
          // End reconnecting with built in error
          return undefined;
        }
        // reconnect after
        return Math.min(options.attempt * 100, 3000);
      },
}

const client = redis.createClient(options)

client.on('error', (err) => {
    console.log('error occurred' + err)
})

const getValue = (key) => {
    return client.getAsync(key)
}

const getHValue = (key) => {
    return client.hgetallAsync(key, redis.print)
}

const setValue = (key, value, time) => {
    if(typeof value === 'object' || value === undefined || value === "") return
    client.set(key, value, redis.print)
    if (time) {
        client.expire(key, time)
    }
}

const setHValue = (key, value) => {
    //若要保存的值非对象直接返回
    if (Object.prototype.toString.call(value) !== '[object Object]') return 
    Object.keys(value).forEach( (item, index) => {
        client.hsetAsync(key, item, value[item]);
    })
}

const delValue = async (key) => {
    try {
       const res = await client.delAsync(key)
       if (res === 1) {
           console.log('delete success')
       }
    } catch (error) {
        console.log(error)   
    }
}


export {
    getValue,
    getHValue,
    setValue,
    setHValue,
    delValue
}