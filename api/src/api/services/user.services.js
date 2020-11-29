import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { OAuth2Client } from 'google-auth-library'

import { api, logger } from '../../config'
import { User } from '../../models'

const oAuth2Client = new OAuth2Client(api.googleClientId);

export const verifyEmail = async (code, token) => {
    const { confirmCode } = await jwt.verify(token, api.jwtSecretKey)

    if (code !== confirmCode) throw 'INCORRECT_CONFIRM_CODE'

    return true
}

export const resetPassword = async (email) => {
    const newPassword = '123' //generateRandomCode(6)

    const hash = await bcrypt.hash(newPassword, 10)

    const user = await User.findOneAndUpdate(
        { email },
        { password: hash },
        { new: true }
    );
    if (!user) throw 'NO_USER_WITH_THIS_EMAIL'

    /* await sendCodeToEmail({email, newPassword}); */

    return true
}

export const getFriendRequests = async (userId) => {
    const user = await User.findById(userId)
        .select({ friendRequests: 1 })
        .populate('friendRequests.userId', 'name')

    return user
}

export const getFriends = async (userId) => {
    const user = await User.findById(userId)
        .select({ friends: 1 })
        .populate('friends', 'name about')

    return user
}

export const provideGoogleAuth = async (token, operation) => {
    // @TODO: error handling
    const data = await oAuth2Client.verifyIdToken({
        idToken: token,
        audience: api.googleClientId
    })

    const obj = {
        email: data.payload.email,
        name: `${data.payload.given_name} ${data.payload.family_name}`,
    }

    switch (operation) {
        case 'register': {
            const user = await User.create(obj)
            return user
        }
        case 'login': {
            const user = await User.findOne({ email: obj.email })
            return user
        }
    }
}

export const login = async (email, password) => {
    const user = await User.findOne({ email })
    if (!user) throw 'USER_NOT_FOUND'

    const match = await bcrypt.compare(password, user.password)
    if (!match) throw 'INCORRECT_PASSWORD'

    user.password = null
    const token = await jwt.sign({ user }, api.jwtSecretKey)
    return ({ user, token })
}

export const register = async (userData) => {
    const user = await User.create(userData)

    user.password = null // prevent send pw to client

    logger.info("registerUser:" + JSON.stringify(user))

    const token = await jwt.sign({ user }, api.jwtSecretKey)

    return ({ user, token })
}

export const sendConfirmCode = async (email) => {
    const confirmCode = '123' //generateRandomCode(6)

    /* @TODO: invalid e-mail check */

    const existingEmailCount = await User.countDocuments({ email })
    if (existingEmailCount) throw 'EMAIL_ALREADY_REGISTERED'

    /* await sendCodeToEmail({email, confirmCode}); */
    const token = await jwt.sign({ confirmCode }, api.jwtSecretKey)

    return { token }
}

export const sendFriendRequestByUserCode = async (code, currentUserId) => {
    const willRequestedUser = await User.findOne({ code })
    if (!willRequestedUser) throw 'USER_NOT_FOUND'

    const existingCheck = willRequestedUser.friendRequests.find(
        (friendRequest) => friendRequest.userId.toString() === currentUserId
    )
    if (existingCheck) throw 'REQUEST_ALREADY_EXISTING'

    willRequestedUser.friendRequests.push({ userId: currentUserId, type: 'Incoming' })
    willRequestedUser.save()

    await User.updateOne(
        { _id: currentUserId },
        { $push: { friendRequests: { userId: willRequestedUser._id, type: 'Outgoing' } } }
    );

    return {
        response: true,
        requestedUserId: willRequestedUser._id
    }
}

export const setFriendRequestState = async (currentUserId, requestId, requestedUserId, isApproved) => {
    const currentUser = await User.findById(currentUserId)
    if (!currentUser) return next('USER_NOT_FOUND')

    const requestedUser = await User.findById(requestedUserId)
    if (!requestedUser) return next('USER_NOT_FOUND')

    const requestToRemove = requestedUser.friendRequests.find(
      (friendRequest) => friendRequest.userId.toString() == currentUserId
    )

    if (isApproved) {
      requestedUser.friends.push(currentUser._id)
      currentUser.friends.push(requestedUserId)
    }

    requestedUser.friendRequests.remove(requestToRemove._id)
    currentUser.friendRequests.remove(requestId)
    requestedUser.save()
    currentUser.save()

    return true
}
