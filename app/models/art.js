const {flatten} = require('lodash')
const {Op} = require('sequelize')

const {Movie, Music, Sentence}  = require('./classic')


class Art {

    constructor(artId, type) {
        this.artId = artId
        this.type = type
    }

    async getDetail(uid) {
        const art = await Art.getData(this.artId, this.type)
        if (!art) {
            throw new global.errs.NotFound()
        }
        const {Favor} = require('@models/favor')
        const likeLatest = await Favor.userLikeIt(this.artId, this.type, uid)
        return {
            art,
            like_status: likeLatest
        }
    }

    static async getList(artUInfoList) {
        const artInfoObj = {
            100: [],
            200: [],
            300: []
        }
        for (let artInfo of artUInfoList) {
            artInfoObj[artInfo.type].push(artInfo.artId)
        }
        const arts = []
        for(let key in artInfoObj) {
            const ids = artInfoObj[key]
            if (ids.length === 0) {
                continue
            }
            key = parseInt(key)
            const art = await Art._getListByType(ids, key)
            arts.push(art)
        }
        return flatten(arts)
    }

    static async _getListByType(ids, type) {
        let arts = []
        const finder = {
            where: {
                id: {
                    [Op.in]: ids
                }
            }
        }
        const scope = 'bh'
        switch(type) {
            case 100:
                arts = await Movie.scope(scope).findAll(finder)
                break
            case 200:
                arts = await Music.scope(scope).findAll(finder)
                break
            case 300:
                arts = await Sentence.scope(scope).findAll(finder)
                break
            case 400:
                // art = await Movie.findOne(finder)
                break
            default:
                break
        }
        return arts
    }

    static async getData(art_id, type, userScope=true) {
        const finder = {
            where: {
                id: art_id
            }
        }
        let art = null
        const scope = userScope ? 'bh': null
        switch(type) {
            case 100:
                art = await Movie.scope(scope).findOne(finder)
                break
            case 200:
                art = await Music.scope(scope).findOne(finder)
                break
            case 300:
                art = await Sentence.scope(scope).findOne(finder)
                break
            case 400:
                // art = await Movie.findOne(finder)
                break
            default:
                break
        }
        return art
    }
}

module.exports = {Art}