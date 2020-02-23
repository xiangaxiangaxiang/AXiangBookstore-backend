const Router = require('koa-router')
const router = new Router({
    prefix: '/v1/classic'
})
const {PositiveIntegerValidator} = require('../../validators/validator')
const {Auth} = require('../../../middlewares/auth')

router.get('/latest', new Auth().m, async (ctx, next) => {
    // const v = await new PositiveIntegerValidator().validate(ctx)
    // if (true) {
    //     const error = new global.errs.ParameterException()
    //     throw error
    // }
    // ctx.body = {
    //     success: 'success'
    // }
    ctx.body = {
        uid: ctx.auth.uid
    }
})

module.exports = router