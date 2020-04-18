const MongoClient = require('mongodb').MongoClient
const config = require('config')
const url = config.get('mongodb.uri')

const csvFilePath='public/uploads/upload.csv'
const csv = require('csvtojson')

exports.get = async ctx => {

  console.log("await")
  
  csv({
    delimiter: [';','"'],
  })
  .fromFile(csvFilePath)
  .then((jsonObj)=>{
    console.log(typeof(jsonObj))
    
    // Insert Json-Object to MongoDB
    MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
      if (err) throw err
      var dbo = db.db(config.get('mongodb.name'))
      dbo.collection(config.get('mongodb.products')).insertMany(jsonObj, (err, res) => {
      if (err) throw err
      console.log("db created")
      db.close()
      });
    });
  })

  ctx.body = "Done"
}