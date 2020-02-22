const Router = require('koa-router')
const {TokenValidator} = require('../../validators/validator')
const {User} = require('../../models/user')
const {LoginType} = require('../../lib/enum')
const {success} = require('../../lib/helper')

const router = new Router({
    prefix: '/v1/token'
})

router.post('/', async (ctx) => {
    const v = await new TokenValidator().validate(ctx)
    type = v.get('body.type')
    account = v.get('body.account')
    secret = v.get('body.secret')
    console.log(type, LoginType.USER_EMAIL)
    switch(type) {
        case LoginType.USER_EMAIL:
            await emailLogin(account, secret)
            break;
        case LoginType.USER_MINI_PROGRAM:
            break;
        default:
            break
    }
    // success()
})

async function emailLogin(account, secret) {
    const user = await User.verrifyEmailPassword(account, secret)
}

module.exports = router