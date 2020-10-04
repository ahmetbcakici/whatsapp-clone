import bcrypt from 'bcryptjs'

import { sendCodeToEmail } from '../../../utils'
import { User } from '../../../models'
import { emailSchema } from '../../validators/user.validators'

export default async (req, res, next) => {
  const { email } = req.body;
  const newPassword = '123' //generateRandomCode(6)

  try {
    await emailSchema.validateAsync(req.body)

    const hash = await bcrypt.hash(newPassword, 10)

    const user = await User.findOneAndUpdate(
      { email },
      { password: hash },
      { new: true }
    );

    if (!user) return next('NO_USER_WITH_THIS_EMAIL')

    console.log(newPassword)
    /* await sendCodeToEmail({email, newPassword}); */
    return res.status(200).send()
  }
  catch (err) {
    return next(err)
  }
}
