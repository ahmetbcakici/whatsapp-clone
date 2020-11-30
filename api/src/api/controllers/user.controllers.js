import { emailVerificationSchema, emailSchema, loginSchema, registerSchema } from '../validators/user.validators'
import * as userServices from '../services/user.services'


export const verifyEmail = async (req, res, next) => {
  const { code, token } = req.body

  try {
    await emailVerificationSchema.validateAsync(req.body)

    const response = await userServices.verifyEmail(code, token)

    return res.status(200).send(response)
  } catch (err) {
    return next(err)
  }
}

export const resetPassword = async (req, res, next) => {
  const { email } = req.body;

  try {
    await emailSchema.validateAsync(req.body)

    const response = await userServices.resetPassword(email)

    return res.status(200).send(response)
  }
  catch (err) {
    return next(err)
  }
}

export const getFriendRequests = async (req, res, next) => {
  const userId = req.user._id

  try {
    const response = await userServices.getFriendRequests(userId)

    return res.status(200).send(response)
  }
  catch (err) {
    console.log(err)
    return next(err)
  }
}

export const getFriends = async (req, res, next) => {
  const userId = req.user._id

  try {
    const response = await userServices.getFriends(userId)

    return res.status(200).send(response)
  }
  catch (err) {
    console.log(err)
    return next(err)
  }
}

export const provideGoogleAuth = async (req, res) => {
  const { token, operation } = req.body;

  try {
    const response = await userServices.provideGoogleAuth(token, operation)

    return res.status(200).send(response)
  } catch (err) {
    console.log(err)
    return next(err)
  }
}

export const login = async (req, res, next) => {
  const { email, password } = req.body

  try {
    await loginSchema.validateAsync(req.body)

    const response = await userServices.login(email, password)

    return res.status(200).send(response)
  }
  catch (err) {
    console.log(err)
    return next(err)
  }
}

export const register = async (req, res, next) => {
  try {
    /*await registerSchema.validateAsync(req.body)*/

    const response = await userServices.register(req.body)

    return res.status(201).json(response)
  }
  catch (err) {
    return next(err)
  }
}

export const sendConfirmCode = async (req, res, next) => {
  const { email } = req.body

  try {
    await emailSchema.validateAsync(req.body)

    const response = await userServices.sendConfirmCode(email)

    return res.status(200).json(response)
  }
  catch (err) {
    return next(err)
  }
}

export const sendFriendRequestByUserCode = async (req, res, next) => {
  const { code } = req.body
  const currentUserId = req.user._id

  try {
    const { response, requestedUserId } = await userServices.sendFriendRequestByUserCode(code, currentUserId)

    res.io.to(requestedUserId).emit('set-friend-request-state')
    return res.status(200).json(response)
  }
  catch (err) {
    console.log(err)
    return next(err)
  }
}

export const setFriendRequestState = async (req, res, next) => {
  const { requestId, requestedUserId, isApproved } = req.body
  const currentUserId = req.user._id

  try {
    const response = await userServices.setFriendRequestState(currentUserId, requestId, requestedUserId, isApproved)

    res.io.to(requestedUserId).emit('set-friend-request-state')
    return res.status(200).json(response)
  }
  catch (err) {
    console.log(err)
    return next(err)
  }
}