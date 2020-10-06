import { Router } from 'express'
import {
  register,
  login,
  emailVerification,
  forgotMyPass,
  sendConfirmCode,
  google,
  sendFriendRequest,
  getFriendRequests,
  setFriendRequest
} from '../controllers/user'
import auth from '../middlewares/auth'

const router = Router()

router.get('/', auth)
router.post('/register', register)
router.post('/login', login)
router.post('/email-verification', emailVerification)
router.post('/forgot-my-pass', forgotMyPass)
router.post('/send-confirm-code', sendConfirmCode)
router.post('/google', google)
router.post('/send-friend-request', auth, sendFriendRequest)
router.get('/get-friend-requests', auth, getFriendRequests)
router.patch('/set-friend-request', auth, setFriendRequest)

export default router