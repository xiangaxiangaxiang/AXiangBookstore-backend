const Router = require('koa-router')
const router = new Router({
    prefix: '/v1/user'
})

const {RegisterValidator} = require('../../validators/validator')

router.post('/register', async (ctx) => {
    const v = new RegisterValidator().validate(ctx)
    const c = await v
})

module.exports = router