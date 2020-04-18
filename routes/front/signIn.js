require('dotenv').config()
const Nexmo = require('nexmo')
const config = require('config')
const MongoClient = require("mongodb").MongoClient;
const url = config.get('mongodb.uri')
const mongoClient = new MongoClient(url, { useNewUrlParser: true })

const nexmo = new Nexmo({
  apiKey: process.env.API_KEY,
  apiSecret: process.env.API_SECRET
})

exports.post = async ctx => {
  const phone = ctx.request.body.phone

  const checkUser = new Promise((resolve, reject) => {
    mongoClient.connect((err, client) => {   
      const db = client.db(config.get('mongodb.name'))
      const collection = db.collection(config.get('mongodb.users'))
    
      if(err) reject(console.error(err))
      collection.find({"phone": phone}).toArray((err, results) => {
        if (err) reject(console.error(err))
        else resolve()
      })
    })
  }).then(() => {

    const checkNumber = new Promise((resolve, reject) => {
      // nexmo.verify.request({number: phone, brand: "autoparts"}, (err, result) => {
      //   if (err) {
      //     reject(console.error(err))
      //   } else {
      //     let requestId = result.request_id
      //     resolve(requestId)
      //   }
      // })
      resolve("1234")
    })
    return checkNumber
    
  })

  ctx.body = await checkUser

}