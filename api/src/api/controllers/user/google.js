import { OAuth2Client } from 'google-auth-library'
import { User } from '../../../models'

import { api } from '../../../config'
const client = new OAuth2Client(api.googleClientId);

export default async (req, res) => {
  const { token, type } = req.body;

  const data = await client.verifyIdToken({
    idToken: token,
    audience: api.googleClientId
  })

  const obj = {
    email: data.payload.email,
    name: `${data.payload.given_name} ${data.payload.family_name}`,
  }

  switch (type) {
    case 'register': {
      const user = await User.create(obj)
      return res.send(user)
    }
    case 'login': {
      const user = await User.findOne({ email: obj.email })
      return res.send(user)
    }
  }
  res.send(token);
}
// @TODO: error handling