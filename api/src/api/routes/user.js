import { Router } from 'express'
import * as userControllers from '../controllers/user.controllers'
import auth from '../middlewares/auth'

const router = Router()

router.get('/', auth)
router.get('/get-friends', auth, userControllers.getFriends)
router.get('/get-friend-requests', auth, userControllers.getFriendRequests)
router.post('/register', userControllers.register)
router.post('/login', userControllers.login)
router.post('/email-verification', userControllers.verifyEmail)
router.post('/forgot-my-pass', userControllers.resetPassword)
router.post('/send-confirm-code', userControllers.sendConfirmCode)
router.post('/google', userControllers.provideGoogleAuth)
router.post('/send-friend-request', auth, userControllers.sendFriendRequestByUserCode)
router.patch('/set-friend-request-state', auth, userControllers.setFriendRequestState)

export default router