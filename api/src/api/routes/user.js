import { Router } from 'express'
import * as userController from '../controllers/user.controllers'
import auth from '../middlewares/auth'

const router = Router()

router.get('/', auth)
router.get('/get-friends', auth, userController.getFriends)
router.get('/get-friend-requests', auth, userController.getFriendRequests)
router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/email-verification', userController.emailVerification)
router.post('/forgot-my-pass', userController.forgotMyPass)
router.post('/send-confirm-code', userController.sendConfirmCode)
router.post('/google', userController.google)
router.post('/send-friend-request', auth, userController.sendFriendRequest)
router.patch('/set-friend-request', auth, userController.setFriendRequest)

export default router