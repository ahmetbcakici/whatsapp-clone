import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import { User } from '../../../models'
import { loginSchema } from '../../validators/user.validators'
import { api } from '../../../config'

export default async (req, res, next) => {
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