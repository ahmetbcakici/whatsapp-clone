import { model, Schema } from 'mongoose'

const messageSchema = new Schema({
    //status:,sent, delivered, seen
    chatId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat' },
    sentAt: {
        type: Date,
        default: Date.now
    },
    sentBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    starredBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    removedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    text:{
        type: String,
        maxlength: 50000
    },
})

const Message = model('Message', messageSchema)
export default Message