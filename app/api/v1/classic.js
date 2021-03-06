const Router = require('koa-router')
const router = new Router({
    prefix: '/v1/classic'
})
const {
    PositiveIntegerValidator,
    ClassicValidator
} = require('@validator')
const {Auth} = require('@middlewares/auth')
const {Flow} = require('@models/flow')
const {Art} = require('@models/art')
const {Favor} = require('@models/favor')

router.get('/latest', new Auth().m, async (ctx, next) => {
    const flow = await Flow.findOne({
        order: [
            ['index', 'DESC']
        ]
    })
    const art = await Art.getData(flow.artId, flow.type)
    const likeLatest = await Favor.userLikeIt(flow.artId, flow.type, ctx.auth.uid)
    art.setDataValue('index', flow.index)
    art.setDataValue('like_status', likeLatest)
    ctx.body = art
})

router.get('/:index/next', new Auth().m, async (ctx) => {
    const v = await new PositiveIntegerValidator().validate(ctx, {
        id: 'index'
    })
    const index = v.get('path.index') + 1
    await getData(ctx, index)
})

router.get('/:index/previous', new Auth().m, async (ctx) => {
    const v = await new PositiveIntegerValidator().validate(ctx, {
        id: 'index'
    })
    const index = v.get('path.index') - 1
    await getData(ctx, index)
})

router.get('/:type/:id/favor', new Auth().m, async (ctx) => {
    const v = await new ClassicValidator().validate(ctx)
    const id = v.get('path.id')
    const type = parseInt(v.get('path.type'))
    const artDetail = await new Art(id, type).getDetail(ctx.auth.uid)
    ctx.body = {
        like_status: artDetail.like_status,
        fav_nums: artDetail.art.fav_nums
    }
})

router.get('/:type/:id', new Auth().m, async (ctx) => {
    const v = await new ClassicValidator().validate(ctx)
    const id = v.get('path.id')
    const type = parseInt(v.get('path.type'))
   
    const artDetail = await new Art(id, type).getDetail(ctx.auth.uid)

    artDetail.art.setDataValue('like_status', artDetail.like_status)
    ctx.body = artDetail.art
})

router.get('/favor', new Auth().m, async (ctx) => {
    const uid = ctx.auth.uid
    ctx.body = await Favor.getMyClassicFavor(uid)
})

async function getData(ctx, index) {
    const flow = await Flow.findOne({
        where: {
            index
        }
    })
    if (!flow) {
        throw new global.errs.NotFound()
    }
    const art = await Art.getData(flow.artId, flow.type)
    const likeLatest = await Favor.userLikeIt(flow.artId, flow.type, ctx.auth.uid)
    art.setDataValue('index', flow.index)
    art.setDataValue('like_status', likeLatest)
    ctx.body = art
}

module.exports = router