import { User } from '../../../models'

export default async (req, res, next) => {
  const { code } = req.body

  try {
    const user = await User.findOneAndUpdate(
      { code },
      { $push: { friendRequests: { userId: req.user._id, type: 'Incoming' } } }
    )
    if (!user) return next('USER_NOT_FOUND')
    // @TODO: handle -> already requested situation
    console.log(user)
    await User.updateOne(
      { _id: req.user._id },
      { $push: { friendRequests: { userId: user._id, type: 'Outgoing' } } }
    );

    res.io.emit('x')
    res.send()
  }
  catch (err) {
    console.log(err)
    return next(err)
  }
}