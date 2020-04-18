const fs = require('fs')

exports.get = async ctx => {

  let content
  let readStream
  
  const promise = new Promise((resolve, reject) => {
    fs.access('./public/uploads/uploadutf.csv', function(error){
      if (error) {
        readStream = fs.createReadStream("./public/uploads/upload.csv", {start: 0, end: 5000})
        readStream
          .on('error', error => console.error(error))
          .on('data', chunk => {
            content += chunk
          })
          .on('end', () => {
            console.info('Read file end')
            resolve(content)
          })
      } else {
        readStream = fs.createReadStream("./public/uploads/uploadutf.csv", {start: 0, end: 5000})
        readStream
          .on('error', error => console.error(error))
          .on('data', chunk => {
            content += chunk
          })
          .on('end', () => {
            console.info('Read file end')
            resolve(content)
          })
      }
    })
  })
  

  const mapArray = [
    'Гарантия',
    'Доставка',
    '0',
    'Артикул',
    'Наименование детали',
    'Марка',
    'Модель',
    'Тип кузова',
    'Дверей',
    'Год',
    'рест',
    'Двигатель',
    'Объем',
    'КПП',
    'Цена',
    'Скидка %',
    'Цена со скидкой',
    'Год начала выпуска',
    'Год окончания выпуска',
    'URL фото детали',
    'URL фото автомобиля',
    'Видео',
    'Описание',
    'Примечание',
    'Склад',
    'Маркировка',
    'Тип топлива',
    'Мощность',
    'Валюта',
    'Цвет кузова',
    'Особености двигателя',
    'Напрвление',
    'Сторона',
    'Телефон склада',
    'Телефон заказа с доставкой',
    'Торговый объект',
    'Адрес объекта',
    'Географическая широта',
    'Географическая долгота',
    'Конструкционный номер',
    'Номер автомобиля',
    'VIN',
  ]
  
  content = await promise
  content = content.split(['\n'])
  let str = content.toString()

  if( str.indexOf(';')+1 ) {
    rowOne = content["1"].split([';'])
    rowTwo = content["2"].split([';'])
  } else {
    rowOne = content["1"].split(['","'])
    rowTwo = content["2"].split(['","'])
  }

  ctx.body = ctx.render('./admin/edit.pug', {
    header: mapArray,
    rowOne: rowOne,
    rowTwo: rowTwo
  })

  // fs.unlinkSync('./public/uploads/upload.csv')
  // fs.unlinkSync('./public/uploads/uploadutf.csv')

}