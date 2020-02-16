const Router = require('koa-router')
const router = new Router()

router.post('/v1/:id/classic/latest', (ctx, next) => {
    const path = ctx.params
    const query = ctx.request.query
    const headers = ctx.request.header
    const body = ctx.request.body
    console.log(path, query, headers, body)
    ctx.body = {
        hello: 'world'
    }
})

module.exports = router