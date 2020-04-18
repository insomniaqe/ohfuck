const Router = require('koa-router')
const router = new Router()
const koaForm = require('formidable-upload-koa')
const fs = require('fs')
const path = require('path')

const options = {
  uploadDir: 'public/uploads/',
  keepExtensions: true
}

// Front
router.get('/', verifyToken, require('./front/homepage').get)
router.post('/register', require('./front/register').post)
router.post('/verify', require('./front/verify').post)
router.post('/signin', require('./front/signIn').post)
router.post('/signInSms', require('./front/signInSms').post)
router.get('/about', verifyToken, require('./front/aboutpage').get)
router.get('/conf', verifyToken, require('./front/conf').get)
router.get('/guarantees', verifyToken, require('./front/guaranteespage').get)
router.get('/delivery', verifyToken, require('./front/deliverypage').get)
router.get('/reviews', verifyToken, require('./front/reviewspage').get)
router.get('/faq', verifyToken, require('./front/faqpage').get)
router.get('/contacts', verifyToken, require('./front/contactspage').get)
router.get('/partners', verifyToken, require('./front/partnerspage').get)
router.get('/products', verifyToken, require('./front/products').get)
router.post('/products', verifyToken, require('./front/products').post);
router.get('/product/:id', verifyToken, require('./front/product').get)
router.get('/discount', verifyToken, require('./front/discountpage').get)
router.get('/catalog', verifyToken, require('./front/catalog').get)
router.get('/cart', verifyToken, require('./front/cart').get)
router.post('/cart', verifyToken, require('./front/cart').post)
router.get('/account', verifyToken, require('./front/account').get)
// router.post('/account', verifyToken, require('./front/account').post)

// Admin
router.get('/admin/import', require('./admin/import').get)
router.post('/admin/import/upload', koaForm(options), async ctx => {

  const files = ctx.req.files
  const fileName = files["import"]["path"].split("/")[2]
  const filePath = 'public/uploads/' + fileName

  const filesF = fs.readdirSync('./public/uploads/')
  if(path.extname(filesF[0]) === ".csv") {
    fs.rename('./public/uploads/' + filesF[0], './public/uploads/upload.csv', err => {
      if (err) console.log('Файл не найден');
        console.log("Rename")
    })
  } else {
    console.log('Неверное расширение файла')
  }

  ctx.redirect('/admin/decode')

})
router.get('/admin/decode', require('./admin/decode').get)
router.get('/admin/edit', require('./admin/edit').get)
router.get('/admin/uploadbd', require('./admin/uploadbd').get)

// Verify Token
async function verifyToken(ctx, next) {
  const bearerHeader = ctx.headers['authorization'];
  if(typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ')
    const bearerToken = bearer[1]
    ctx.token = bearerToken
    await next()
  } else {
    await next()
  }
}

module.exports = router