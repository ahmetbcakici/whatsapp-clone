import { model, Schema } from 'mongoose'

const groupSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    avatarPath: {
        type: String,
    },
    about: {
        type: String,
        maxlength: 150
    },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
})

const Group = model('Group', groupSchema)
export default Group