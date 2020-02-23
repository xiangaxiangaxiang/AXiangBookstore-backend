const Router = require('koa-router')
const {TokenValidator} = require('../../validators/validator')
const {User} = require('../../models/user')
const {LoginType} = require('../../lib/enum')
const {success} = require('../../lib/helper')
const {generateToken} = require('../../../core/util')
const {Auth} = require('../../../middlewares/auth')
const {WXManager} = require('../../services/wx')

const router = new Router({
    prefix: '/v1/token'
})

router.post('/', async (ctx) => {
    const v = await new TokenValidator().validate(ctx)
    type = v.get('body.type')
    account = v.get('body.account')
    secret = v.get('body.secret')
    let token
    switch(type) {
        case LoginType.USER_EMAIL:
            token = await emailLogin(account, secret)
            break;
        case LoginType.USER_MINI_PROGRAM:
            token = await WXManager.codeToToken(v.get('body.account'))
            break;
        default:
            break
    }
    ctx.body = {
        token
    }
})

async function emailLogin(account, secret) {
    const user = await User.verrifyEmailPassword(account, secret)
    return generateToken(user.id, Auth.USER)
}

module.exports = router