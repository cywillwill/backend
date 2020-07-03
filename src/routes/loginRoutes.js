import LoginController from '../api/LoginController'
import Router from 'koa-router'
const router = new Router()


router.prefix('/login')
router.post('/forget', LoginController.forget)
router.post('/login', LoginController.login)
router.post('/test', LoginController.test)
router.post('/reg', LoginController.reg)

export default router;