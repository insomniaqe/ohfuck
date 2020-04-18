require('dotenv').config()
const jwt = require('jsonwebtoken')
const MongoClient = require('mongodb').MongoClient
const config = require('config')
const url = config.get('mongodb.uri')
const mongoClient = new MongoClient(url, {useNewUrlParser: true})

exports.get = async ctx => {

  jwt.verify(ctx.cookies.get('authorization'), process.env.JWTSECRET, err => {
    if (err) {
      ctx.body = ctx.render('./front/cart.pug', {title: 'Корзина', user: false});
    } else {
      ctx.body = ctx.render('./front/cart.pug', {title: 'Корзина', user: true});
    }
  })

}

exports.post = async ctx => {

  const cart = ctx.request.body.cart

  const getProduct = new Promise((resolve, reject) => {
    if(cart) resolve(cart)
    else reject(false)
  }).then(cart => {
    const reqBd = new Promise((resolve, reject) => {
      mongoClient.connect((err, client) => {
        const db = client.db(config.get('mongodb.name'))
        const collection = db.collection(config.get('mongodb.products'))
    
        if(err) return reject(err)
        
        collection.find({"Артикул": {$in: cart}}).toArray((err, results) => {
          resolve(results)
        })
      })
    })
    return reqBd
  })

  const jwtCheck = new Promise(resolve => {
    jwt.verify(ctx.cookies.get('authorization'), process.env.JWTSECRET, err => {
      if(err) user = false
      else user = true
      resolve(user)
    })
  })

  item = await getProduct
  user = await jwtCheck


  let price = []
  for(i=0;i<item.length;i++) {
    price.unshift(parseFloat(item[i]['Цена']))
  }

  priceOut = price.reduce(function(sum, current) {
    return sum + current
  }, 0)

  let arr = {
    product: item,
    price: priceOut
  }

  ctx.body = arr

}