import bcrypt from 'bcryptjs'
import { model, Schema } from 'mongoose'

import { generateUserCode } from '../utils'

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
  },
  registerDate: {
    type: Date,
    default: Date.now,
  },
  code: {
    type: Number,
    unique: true
  },
  friendRequests: [{
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    type: {
      type: String,
      enum: ['Incoming', 'Outgoing']
    }
  }],
  friends: [{ type: Schema.Types.ObjectId, ref: 'User' }]
})

userSchema.pre('save', async function (next) {
  const user = this

  // @TODO: remove if statement here
  if (!user.code) {
    let code, count

    do {
      code = generateUserCode()
      count = await User.countDocuments({ code })
    } while (count)

    user.code = code
  }


  if (user.password) { // to prevent crash for google records
    user.password = await bcrypt.hash(user.password, 10)
    next()
  }
})

const User = model('User', userSchema)
export default User