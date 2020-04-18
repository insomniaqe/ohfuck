const fs = require('fs')
const iconv = require('iconv-lite')
const chardet = require('chardet')

exports.get = async ctx => {

  let decod

  const promise = new Promise((resolve, reject) => {
    let readStream = fs.createReadStream("./public/uploads/upload.csv", {start: 0, end: 2000})
    readStream
      .on('error', error => console.error(error))
      .on('data', chunk => {
        decod = chardet.detect(chunk);
        console.info(decod)
      })
      .on('end', () => {
        console.info("Upload")
        resolve(decod)
      })
  })

  decod = await promise


  if(decod === 'UTF-8') {
    console.log("this utf-8")
    ctx.body = ctx.render('./admin/decode.pug')
  } else {
    fs.createReadStream('./public/uploads/upload.csv')
      .pipe(iconv.decodeStream('win1251'))
      .pipe(iconv.encodeStream('utf8'))
      .pipe(fs.createWriteStream('./public/uploads/uploadutf.csv'))
      .on('close', () => console.log("decode"))

    ctx.body = ctx.render('./admin/decode.pug')
  }

}