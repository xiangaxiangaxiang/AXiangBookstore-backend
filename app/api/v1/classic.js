const Router = require('koa-router')
const router = new Router()
const {PositiveIntegerValidator} = require('../../validators/validator')

router.post('/v1/:id/classic/latest', async (ctx, next) => {
    const path = ctx.params
    const query = ctx.request.query
    const headers = ctx.request.header
    const body = ctx.request.body
    console.log('==================')
    const v = new PositiveIntegerValidator().validate(ctx)
    const c = await v
    // if (true) {
    //     const error = new global.errs.ParameterException()
    //     throw error
    // }
    ctx.body = {
        success: 'success'
    }
})

module.exports = router