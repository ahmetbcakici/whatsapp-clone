import { User } from '../../../models'

export default async (req, res, next) => {
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