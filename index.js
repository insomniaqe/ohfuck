const app = require('./app')
const config = require('config')

app.listen(config.get('port'), () => console.info('App is running'))