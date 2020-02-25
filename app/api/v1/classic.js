const Router = require('koa-router')
const router = new Router({
    prefix: '/v1/classic'
})
const {PositiveIntegerValidator} = require('../../validators/validator')
const {Auth} = require('../../../middlewares/auth')
const {Flow} = require('../../models/flow')
const {Art} = require('../../models/art')

router.get('/latest', new Auth().m, async (ctx, next) => {
    const flow = await Flow.findOne({
        order: [
            ['index', 'DESC']
        ]
    })
    const art = await Art.getData(flow.artId, flow.type)
    art.setDataValue('index', flow.index)
    ctx.body = {
        is_valid: result
    }
})

module.exports = router