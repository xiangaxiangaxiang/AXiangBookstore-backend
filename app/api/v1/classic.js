const Router = require('koa-router')
const router = new Router()

router.get('/v1/classic/latest', (ctx, next) => {
    ctx.body = {
        hello: 'world'
    }
})

module.exports = router