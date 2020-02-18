const {HttpException} = require('../core/http-exception')

const catchError = async (ctx, next) => {
    try{
        await next()
    } catch(error) {
        console.log(error instanceof HttpException)
        if (error instanceof HttpException) {
            requestUrl = `${ctx.method} ${ctx.path}`
            ctx.body = {
                msg: error.msg,
                error_code: error.errorCode,
                request: requestUrl
            }
            ctx.status = error.code
        }
    }
}

module.exports = catchError