const Router = require('koa-router')
const router = new Router({
    prefix: '/v1/user'
})
const {User} = require('../../models/user')


const {RegisterValidator} = require('../../validators/validator')

router.post('/register', async (ctx) => {
    const v = new RegisterValidator().validate(ctx)
    const c = await v

    const user = {
        email: c.get('email'),
        password: c.get('password2'),
        nickname: c.get('nickname')
    }
    const r = User.create({user})

    // User.create(user)
})

module.exports = router