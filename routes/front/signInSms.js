require('dotenv').config()
const Nexmo = require('nexmo')
const config = require('config')
const MongoClient = require("mongodb").MongoClient;
const url = config.get('mongodb.uri')
const mongoClient = new MongoClient(url, { useNewUrlParser: true })
const jwt = require('jsonwebtoken')

const nexmo = new Nexmo({
  apiKey: process.env.API_KEY,
  apiSecret: process.env.API_SECRET
})

exports.post = async ctx => {
  let pin = ctx.request.body.pin
  let requestId = ctx.request.body.requestId
  let phone = ctx.request.body.phone

  const signUser = new Promise((resolve, reject) => {

    // nexmo.verify.check({request_id: requestId, code: pin}, (err, result) => {
    //   if(err) {
    //     reject(err)
    //   } else {
    //     if(result && result.status === '0') {
    //       resolve()
    //     } else {
    //       reject(err)
    //     }
    //   }
    // })
    resolve()

  }).then(() => {

    const mongo = new Promise((resolve, reject) => {
      mongoClient.connect((err, client) => {   
        const db = client.db(config.get('mongodb.name'))
        const collection = db.collection(config.get('mongodb.users'))
      
        if(err) return console.log(err)
        collection.find({"phone": phone}).toArray((err, results) => {
          resolve(results)
        })
      })
    })

    return mongo
    
  }).then(mongo => {

    const jwtObj = {
      name: mongo.name,
      phone: mongo.phone
    }
    const jwtCreate = new Promise((resolve, reject) => {
      jwt.sign({jwtObj}, process.env.JWTSECRET, {expiresIn: '2 days'}, (err, token) => {
        if(err) reject(err)
        else resolve(token)
      })
    })
    return jwtCreate

  }).then(token => {

    ctx.cookies.set('authorization', token, {httpOnly: false, maxAge: 172800000})
    return token

  }).then(token => {

    mongoClient.connect((err, client) => {   
      const db = client.db(config.get('mongodb.name'))
      const collection = db.collection(config.get('mongodb.users'))
      if(err) return console.error(err)
      collection.updateOne({phone : phone}, { $set: {"json": token} }, { upsert: true })
    })

  })

  ctx.body = await signUser

}