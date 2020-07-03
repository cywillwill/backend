import Users from './Users'
// const Users = require('./users')


//生成documment实例，调用实例的save方法将数据存入数据库，并返回一个promise实例。
const documents = new Users({
    name: 'dzz',
    age: 19
})

const add = async () => {
     const data = await documents.save()
     console.log(data);
}

add()