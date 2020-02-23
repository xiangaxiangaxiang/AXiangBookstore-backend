const util = require('util')
const axios = require('axios')
const {User} = require('../models/user')
const {generateToken} = require('../../core/util')
const {Auth} = require('../../middlewares/auth')

class WXManager {
    static async codeToToken(code) {
        let wx = global.config.wx
        const url = util.format(wx.loginUrl, wx.appId, wx.appSecret, code)

        const result = await axios.get(url)
        if (result.status !== 200) {
            throw new global.errs.AuthFailed('openid获取失败')
        }
        const errcode = result.data.errcode
        if (errcode !== 0) {
            throw new global.errs.AuthFailed('openid获取失败' + errcode)
        }

        let user = await User.getUserByOpenid(result.data.openid)
        if (!user) {
            user = await User.registerByOpenid(result.data.openid)
        }
        return generateToken(user.id, Auth.USER_MINI_PROGRAM)
    }
}

module.exports = {
    WXManager
}