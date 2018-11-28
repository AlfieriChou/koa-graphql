const Router = require('koa-router')
const router = new Router()
const controller = require('./controller')

router.post('/signup', controller.user.signup)
router.post('/login', controller.user.login)

module.exports = router
