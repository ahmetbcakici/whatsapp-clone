import jwt from 'jsonwebtoken'

import { User } from '../../../models'
import { emailSchema } from '../../validators/user.validators'
import { api } from '../../../config'

export default async (req, res, next) => {
  const { code } = req.body

  try {
    const user = await User.findOne({ code })
    if (!user) {
      return next(1)
      /* const err = new Error('User not found')
      err['status'] = 404
      return next(err) */
    }
  }
  catch (err) {
    return next(err)
  }
}