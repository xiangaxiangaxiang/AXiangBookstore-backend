const requierDirectory = require('require-directory')
const Router = require('koa-router')

class InitManager {
    static initCore(app) {
        InitManager.app = app
        InitManager.ininLoadRouter()
    }

  static ininLoadRouter() {
      const apiDirectory = `${process.cwd()}/app/api`
    // 自动加载注册路由
    requierDirectory(module, apiDirectory, {
      visit: whenLoadModule
    });

    function whenLoadModule(obj) {
      if (obj instanceof Router) {
        InitManager.app.use(obj.routes());
      }
    }
  }
}

module.exports = InitManager
