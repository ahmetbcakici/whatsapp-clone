import jwt from 'jsonwebtoken'

import { User } from '../../../models'
import { emailSchema } from '../../validators/user.validators'
import { api } from '../../../config'

export default async (req, res, next) => {
  const { code } = req.body

  try {
    const user = await User.findOne({ code })
    if (!user) return next('USER_NOT_FOUND')
  }
  catch (err) {
    return next(err)
  }
}