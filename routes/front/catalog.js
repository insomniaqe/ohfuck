require('dotenv').config()
const jwt = require('jsonwebtoken')
const MongoClient = require('mongodb').MongoClient
const config = require('config')
const url = config.get('mongodb.uri')
const mongoClient = new MongoClient(url, {useNewUrlParser: true})

exports.get = async ctx => {

  const data = new Promise((resolve) => {
    mongoClient.connect((err, client) => {
      const db = client.db(config.get('mongodb.name'))
      const collection = db.collection(config.get('mongodb.products'))
      if(err) return console.log(err)
  
      let result = collection.distinct("Марка")
      resolve(result)
    })
  })
  data.then(() => {
    jwt.verify(ctx.cookies.get('authorization'), process.env.JWTSECRET, err => {
      if(err) return user = false
      else return user = true
    })
  })

  ctx.body = ctx.render('./front/catalog.pug', {
    title: 'Каталог',
    catalog: await data,
    user: user
  })
  
}