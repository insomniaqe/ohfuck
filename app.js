const Koa = require('koa')
const app = new Koa()
const router = require('./routes/index')

require('./hundlers/template').init(app)
require('./hundlers/bodyParser').init(app)
require('./hundlers/errors').init(app)
require('./hundlers/static').init(app)

app
  .use(router.routes())
  .use(router.allowedMethods())

module.exports = app