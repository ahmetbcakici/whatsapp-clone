import jwt from 'jsonwebtoken'

import { sendCodeToEmail } from '../../../utils'
import { User } from '../../../models'
import { emailSchema } from '../../validators/user.validators'
import { api } from '../../../config'

export default async (req, res, next) => {
  const { email } = req.body
  const confirmCode = '123' //generateRandomCode(6)

  try {
    await emailSchema.validateAsync(req.body)

    /* @TODO: invalid e-mail check */

    const existingEmailCount = await User.countDocuments({ email })
    if (existingEmailCount) return next('EMAIL_ALREADY_REGISTERED')

    console.log(confirmCode)
    /* await sendCodeToEmail({email, confirmCode}); */
    const token = await jwt.sign({ confirmCode }, api.jwtSecretKey)
    return res.status(200).json({ token })
  }
  catch (err) {
    return next(err)
  }
}