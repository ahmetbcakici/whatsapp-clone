import { User } from '../../../models'

export default async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id)
      .select({ friendRequests: 1 })
      .populate('friendRequests.userId', 'name surname')

    res.send(user)
  }
  catch (err) {
    console.log(err)
    return next(err)
  }
}