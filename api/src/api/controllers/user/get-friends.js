import { User } from '../../../models'

export default async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id)
      .select({ friends: 1 })
      .populate('friends', 'name surname about')

    res.send(user)
  }
  catch (err) {
    console.log(err)
    return next(err)
  }
}