require('dotenv').config()
const jwt = require('jsonwebtoken')
const MongoClient = require("mongodb").MongoClient;
const config = require('config')
const url = config.get('mongodb.uri')
const mongoClient = new MongoClient(url, { useNewUrlParser: true })

exports.get = async ctx => {
  
  let user
  let filter = ctx.querystring
  filter = filter.replace('mark=', '').replace('%20', ' ')
  
  const products = new Promise(resolve => {
    mongoClient.connect((err, client) => {
      const db = client.db(config.get('mongodb.name'))
      const collection = db.collection(config.get('mongodb.products'))

      if(err) return console.log(err)

      // collection.createIndex({"$**":"text"}, {default_language: "russian"}) 

      collection.find({$text: {$search: filter}}).limit(10).skip(0).toArray((err, results) => {
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
  let result = await products

  ctx.body = ctx.render('./front/products.pug', {
    title: 'Каталог',
    content: result,
    user: user
  })
}

exports.post = async ctx => {

  let user
  let content = ctx.request.body
  content = content["search"].split(' ')
  content = content.toString().replace(",", "\" \"")
  content = "'\"" + content + "\"'"
  lengthContent = content.length

  const products = new Promise((resolve, reject) => {
    mongoClient.connect((err, client) => {   
      const db = client.db(config.get('mongodb.name'))
      const collection = db.collection(config.get('mongodb.products'))
    
      if(err) return console.log(err)
      collection.find({$text: {$search: content}}).limit(10).skip(0).toArray((err, results) => {
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
  let result = await products

  console.log(result)

  ctx.body = ctx.render('./front/products.pug', {
    title: 'Каталог',
    content: result,
    length: lengthContent,
    user: user
  })
}