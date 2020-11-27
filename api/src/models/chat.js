import { model, Schema } from 'mongoose'

const chatSchema = new Schema({
    id: String, // group or user?
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
})

const Chat = model('Chat', chatSchema)
export default Chat