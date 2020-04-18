// require('dotenv').config()
// const Nexmo = require('nexmo')

// const nexmo = new Nexmo({
//   apiKey: process.env.API_KEY,
//   apiSecret: process.env.API_SECRET
// })

exports.post = async ctx => {
  const name = ctx.request.body.name
  const phone = ctx.request.body.phone

  const promise = new Promise(function(resolve, reject) {
    // nexmo.verify.request({number: phone, brand: name}, (err, result) => {
    //   if(err) {
    //     console.log(reject)
    //   } else {
    //     console.log("ok")
    //     let requestId = result.request_id
    //     resolve(requestId)
    //   }
    // })
    resolve("1234")
  })

  ctx.body = await promise

}