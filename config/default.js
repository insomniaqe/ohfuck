const path = require('path')

module.exports = {
  port: 80,
  secret: 'Olo13!gdS',
  root: process.cwd(),
  templatesRoot: path.join(process.cwd(), 'templates'),
  publicRoot: path.join(process.cwd(), 'public/uploads'),
  mongodb: {
    uri: 'mongodb://localhost:27017/',
    name: 'autotest',
    products: 'test1',
    users: 'users'
  }
}