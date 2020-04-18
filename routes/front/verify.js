require('dotenv').config()
const Nexmo = require('nexmo')
const MongoClient = require('mongodb').MongoClient
const config = require('config')
const url = config.get('mongodb.uri')
const jwt = require('jsonwebtoken')

const nexmo = new Nexmo({
  apiKey: process.env.API_KEY,
  apiSecret: process.env.API_SECRET
})

exports.post = async (ctx, next) => {
  
  const pin = ctx.request.body.pin
  const requestId = ctx.request.body.requestId
  const name = ctx.request.body.name
  const phone = ctx.request.body.phone

  const jwtObj = {
    name: name,
    phone: phone
  }

  let createUser = new Promise((resolve, reject) => {

    // nexmo.verify.check({request_id: requestId, code: pin}, (err, result) => {
    //   if (err) {
    //     reject(err)
    //   } else {
    //     if (result && result.status === '0') {
    //       resolve()
    //     } else {
    //       reject(err)
    //     }
    //   }
    // })
    setTimeout(() => {
      resolve()
    }, 1000)

  }).then(() => {

    const jwtCreate = new Promise((resolve, reject) => {
      jwt.sign({jwtObj}, process.env.JWTSECRET, {expiresIn: "2 days"}, (err, token) => {
        if (err) reject(console.error(err))
        else resolve(token)
      })
    })
    return jwtCreate

  }).then(token => {

    ctx.cookies.set('authorization', token, {httpOnly: false, maxAge: 172800000})
    return token

  }).then((token) => {

    const jsonObj = [
      { name: name, phone: phone, json: token }
    ]

    MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
      if (err) return console.error(err)
      const dbo = db.db(config.get('mongodb.name'))
      dbo.collection(config.get('mongodb.users')).insertMany(jsonObj, (err, result) => {
        if (err) return console.error(err)
        console.log("db created")
        db.close()
      })
    })

  })

  ctx.body = await createUser

}