require('module-alias/register')

const Koa = require('koa')
const parser = require('koa-bodyparser')
const InitManager = require('./core/init')
const catchError = require('./middlewares/exception')


const app = new Koa()

require('@models/user')
require('@models/classic')
require('@models/flow')
require('@models/favor')
require('@models/hot-book')
require('@models/book')
require('@models/book-comment')

app.use(catchError)
app.use(parser())

InitManager.initCore(app)

app.listen(8020)