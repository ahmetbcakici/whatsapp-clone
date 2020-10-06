import { User } from '../../../models'

export default async (req, res, next) => {
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