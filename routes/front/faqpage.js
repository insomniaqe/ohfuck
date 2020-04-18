require('dotenv').config()
const jwt = require('jsonwebtoken')

exports.get = async ctx => {
  jwt.verify(ctx.cookies.get('authorization'), process.env.JWTSECRET, err => {
    if (err) {
      ctx.body = ctx.render('./front/faq.pug', {title: 'Вопрос-ответ', user: false})
    } else {
      ctx.body = ctx.render('./front/faq.pug', {title: 'Вопрос-ответ', user: true})
    }
  })
}