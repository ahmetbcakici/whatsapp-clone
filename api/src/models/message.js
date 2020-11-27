import { model, Schema } from 'mongoose'

const messageSchema = new Schema({
    //status:,sent, delivered, seen
    // chatId
    sentAt: {
        type: Date,
        default: Date.now
    },
    sentBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    starredBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    removedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    text: String,
})

const Message = model('Message', messageSchema)
export default Message