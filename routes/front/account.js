require('dotenv').config()
const jwt = require('jsonwebtoken')
const MongoClient = require('mongodb').MongoClient
const config = require('config')
const url = config.get('mongodb.uri')
const mongoClient = new MongoClient(url, {useNewUrlParser: true})

exports.get = async ctx => {
  const infoUser = ctx.cookies.get('authorization')

  const data = new Promise((resolve, reject) => {
    mongoClient.connect((err, client) => {
      const db = client.db(config.get('mongodb.name'))
      const collection = db.collection(config.get('mongodb.users'))
      if(err) reject(err)
  
      collection.find({"json": infoUser}).toArray((err, results) => {
        resolve(results)
      })
    })
  })
  
  const jwtUser = new Promise((resolve, reject) => {
    jwt.verify(ctx.cookies.get('authorization'), process.env.JWTSECRET, err => {
      if(err) user = false
      else user = true
      resolve(user)
    })
  })

  const getUser = await jwtUser
  const info = await data

  ctx.body = ctx.render('./front/account.pug', {
    title: 'Каталог',
    info: info[0],
    user: getUser
  })

}