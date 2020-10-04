import jwt from 'jsonwebtoken';

import { emailVerificationSchema } from '../../validators/user.validators'
import { api } from '../../../config'

export default async (req, res, next) => {
  const { code, token } = req.body

  try {
    await emailVerificationSchema.validateAsync(req.body)

    const { confirmCode } = await jwt.verify(token, api.jwtSecretKey)

    if (code !== confirmCode) return next('INCORRECT_CONFIRM_CODE')

    return res.status(200).send()
  } catch (err) {
    return next(err)
  }
}