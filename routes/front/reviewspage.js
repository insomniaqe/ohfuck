require('dotenv').config()
const jwt = require('jsonwebtoken')

exports.get = async function(ctx, next) {

  jwt.verify(ctx.cookies.get('authorization'), process.env.JWTSECRET, err => {
    if (err) {
      ctx.body = ctx.render('./front/reviews.pug', {title: 'Отзывы', user: false})
    } else {
      ctx.body = ctx.render('./front/reviews.pug', {title: 'Отзывы', user: true})
    }
  })

}