require('dotenv').config()
const jwt = require('jsonwebtoken')
const MongoClient = require('mongodb').MongoClient
const config = require('config')
const url = config.get('mongodb.uri')
const mongoClient = new MongoClient(url, { useNewUrlParser: true })

exports.get = async ctx => {

  let user
  const id = ctx.params.id
  const product = new Promise(resolve => {
    mongoClient.connect((err, client) => {
      const db = client.db(config.get('mongodb.name'))
      const collection = db.collection(config.get('mongodb.products'))
  
      if(err) return console.log(err)
      collection.find({"Артикул": id}).toArray((err, results) => {
        resolve(results)
      })
    })
  })
  const jwtCheck = new Promise(resolve => {
    jwt.verify(ctx.cookies.get('authorization'), process.env.JWTSECRET, err => {
      if(err) user = false
      else user = true
      resolve(user)
    })
  })

  user = await jwtCheck
  let result = await product

  ctx.body = ctx.render('./front/product.pug', {
    title: 'Item product',
    content: result[0],
    user: user
  })
  
}