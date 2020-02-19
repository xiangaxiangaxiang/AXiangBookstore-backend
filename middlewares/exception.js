const {HttpException} = require('../core/http-exception')

const catchError = async (ctx, next) => {
    try{
        await next()
    } catch(error) {

        if (global.config.environment === 'dev') {
            throw error
        }

        requestUrl = `${ctx.method} ${ctx.path}`
        if (error instanceof HttpException) {
            ctx.body = {
                msg: error.msg,
                error_code: error.errorCode,
                request: requestUrl
            }
            ctx.status = error.code
        } else {
            ctx.body = {
                msg: 'we make a mistake',
                error_code: 999,
                request: requestUrl
            }
            ctx.status = 500
        }
    }
}

module.exports = catchError