require('dotenv').config()
const jwt = require('jsonwebtoken')

exports.get = async function(ctx, next) {
  jwt.verify(ctx.cookies.get('authorization'), process.env.JWTSECRET, err => {
    if (err) {
      ctx.body = ctx.render('./front/about.pug', {title: 'О нас', user: false});
    } else {
      ctx.body = ctx.render('./front/about.pug', {title: 'О нас', user: true});
    }
  })
};