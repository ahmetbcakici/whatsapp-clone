import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { OAuth2Client } from 'google-auth-library'


import { emailVerificationSchema, emailSchema ,loginSchema,registerSchema} from '../validators/user.validators'
import { api } from '../../config'
import { User } from '../../models'
import { sendCodeToEmail } from '../../utils'

const client = new OAuth2Client(api.googleClientId);

export const emailVerification = async (req, res, next) => {
    const { code, token } = req.body

    try {
        await emailVerificationSchema.validateAsync(req.body)

        const { confirmCode } = await jwt.verify(token, api.jwtSecretKey)

        if (code !== confirmCode) return next('INCORRECT_CONFIRM_CODE')

        return res.status(200).send()
    } catch (err) {
        return next(err)
    }
}

export const forgotMyPass = async (req, res, next) => {
    const { email } = req.body;
    const newPassword = '123' //generateRandomCode(6)

    try {
        await emailSchema.validateAsync(req.body)

        const hash = await bcrypt.hash(newPassword, 10)

        const user = await User.findOneAndUpdate(
            { email },
            { password: hash },
            { new: true }
        );

        if (!user) return next('NO_USER_WITH_THIS_EMAIL')

        console.log(newPassword)
        /* await sendCodeToEmail({email, newPassword}); */
        return res.status(200).send()
    }
    catch (err) {
        return next(err)
    }
}

export const getFriendRequests = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id)
            .select({ friendRequests: 1 })
            .populate('friendRequests.userId', 'name')

        res.send(user)
    }
    catch (err) {
        console.log(err)
        return next(err)
    }
}

export const getFriends = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id)
            .select({ friends: 1 })
            .populate('friends', 'name about')

        res.send(user)
    }
    catch (err) {
        console.log(err)
        return next(err)
    }
}

export const google = async (req, res) => {
    const { token, type } = req.body;

    const data = await client.verifyIdToken({
        idToken: token,
        audience: api.googleClientId
    })

    const obj = {
        email: data.payload.email,
        name: `${data.payload.given_name} ${data.payload.family_name}`,
    }

    switch (type) {
        case 'register': {
            const user = await User.create(obj)
            return res.send(user)
        }
        case 'login': {
            const user = await User.findOne({ email: obj.email })
            return res.send(user)
        }
    }
    res.send(token);
    // @TODO: error handling
}

export const login = async (req, res, next) => {
    const { email, password } = req.body
  
    try {
      // @TODO: uncomment validation
      // await loginSchema.validateAsync(req.body)
  
      const user = await User.findOne({ email })
      if (!user) return next('USER_NOT_FOUND')
  
      const match = await bcrypt.compare(password, user.password)
      if (!match) return next('INCORRECT_PASSWORD')
  
      user.password = null
      const token = await jwt.sign({ user }, api.jwtSecretKey)
      res.status(200).json({ user, token })
    }
    catch (err) {
      console.log(err)
      return next(err)
    }
  }

  export const register = async (req, res, next) => {
    try {
      // @TODO: uncomment validation
      /* await registerSchema.validateAsync(req.body) */
  
      const user = await User.create(req.body)
      user.password = null // prevent send pw to client
      req.body.password = null // prevent log pw
  
      logger.info("registerUser:" + JSON.stringify(req.body))
      const token = await jwt.sign({ user }, api.jwtSecretKey)
  
      return res.status(201).json({ user, token })
    }
    catch (err) {
      return next(err)
    }
  }

  export const sendConfirmCode = async (req, res, next) => {
    const { email } = req.body
    const confirmCode = '123' //generateRandomCode(6)
  
    try {
      await emailSchema.validateAsync(req.body)
  
      /* @TODO: invalid e-mail check */
  
      const existingEmailCount = await User.countDocuments({ email })
      if (existingEmailCount) return next('EMAIL_ALREADY_REGISTERED')
  
      console.log(confirmCode)
      /* await sendCodeToEmail({email, confirmCode}); */
      const token = await jwt.sign({ confirmCode }, api.jwtSecretKey)
      return res.status(200).json({ token })
    }
    catch (err) {
      return next(err)
    }
  }

  export const sendFriendRequest = async (req, res, next) => {
    const { code } = req.body
  
    try {
      const user = await User.findOne({ code })
      if (!user) return next('USER_NOT_FOUND')
  
      const existingCheck = user.friendRequests.find(
        (friendRequest) => friendRequest.userId.toString() === req.user._id
      )
      if (existingCheck) return next('REQUEST_ALREADY_EXISTING')
  
      user.friendRequests.push({ userId: req.user._id, type: 'Incoming' })
      user.save()
  
      await User.updateOne(
        { _id: req.user._id },
        { $push: { friendRequests: { userId: user._id, type: 'Outgoing' } } }
      );
  
      res.io.to(user._id).emit('set-friend-request')
      res.send()
    }
    catch (err) {
      console.log(err)
      return next(err)
    }
  }

  export const setFriendRequestState = async (req, res, next) => {
    const { requestId, requestedUserId, type } = req.body
    try {
      const currentUser = await User.findById(req.user._id)
      if (!currentUser) return next('USER_NOT_FOUND')
  
      const requestedUser = await User.findById(requestedUserId)
      if (!requestedUser) return next('USER_NOT_FOUND')
  
      const requestToRemove = requestedUser.friendRequests.find(
        (friendRequest) => friendRequest.userId.toString() == req.user._id
      )
  
      if (type) {
        requestedUser.friends.push(currentUser._id)
        currentUser.friends.push(requestedUserId)
      }
  
      requestedUser.friendRequests.remove(requestToRemove._id)
      currentUser.friendRequests.remove(requestId)
      requestedUser.save()
      currentUser.save()
  
      res.io.to(requestedUserId).emit('set-friend-request')
      res.send()
    }
    catch (err) {
      console.log(err)
      return next(err)
    }
  }