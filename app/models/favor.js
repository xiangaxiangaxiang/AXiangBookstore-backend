const {Sequelize, Model, Op} = require('sequelize')
const { sequelize } = require('../../core/db')
const {Art} = require('./art')

class Favor extends Model {
    static async like(artId, type , uid) {
        const favor = await Favor.findOne({
            where: {
                artId,
                type,
                uid
            }
        })
        if (favor) {
            throw new global.errs.LikeError()
        }
        return sequelize.transaction(async t => {
            await Favor.create({
                artId,
                type,
                uid
            }, {transaction: t})
            const art = await Art.getData(artId, type, false)
            await art.increment('fav_nums', {
                by: 1,
                transaction: t
            })
        })
    }

    static async dislike(artId, type , uid) {
        const favor = await Favor.findOne({
            where: {
                artId,
                type,
                uid
            }
        })
        if (!favor) {
            throw new global.errs.DislikeError()
        }
        return sequelize.transaction(async t => {
            await favor.destroy({
                force: true,
                transaction: t
            })
            const art = await Art.getData(artId, type, false)
            await art.decrement('fav_nums', {
                by: 1,
                transaction: t
            })
        })
    }

    static async userLikeIt(artId, type, uid) {
        const favor = await Favor.findOne({
            where: {
                uid,
                type,
                artId
            }
        })
        return favor ? true : false;
    }

    static async getMyClassicFavor(uid) {
        const arts = await Favor.findAll({
            where: {
                uid,
                type: {
                    [Op.not]: 400
                }
            }
        })
        if (!arts) {
            throw new global.errs.NotFound()
        }
        return await Art.getList(arts)
    }

    static async getBookFavor(uid, bookID) {
        const favorNums = await Favor.count({
            where: {
                artId: bookID,
                type: 400
            }
        })
        const myFavor = await Favor.findOne({
            where: {
                artId: bookID,
                uid,
                type:400
            }
        })
        return {
            fav_nums: favorNums,
            like_status: myFavor ? 1 : 0
        }
    }
}

Favor.init({
    uid: Sequelize.INTEGER,
    artId: Sequelize.INTEGER,
    type: Sequelize.INTEGER,
}, {
    sequelize,
    tableName: 'favor'
})

module.exports = {Favor}