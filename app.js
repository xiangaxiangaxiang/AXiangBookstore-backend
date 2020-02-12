const Koa = require('koa')

const app = new Koa()

function test() {
    console.log('demaxiya')
}

app.use(test)

app.listen(8020)