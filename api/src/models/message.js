import { model, Schema } from 'mongoose'

const messageSchema = new Schema({
    key: "value",
    /*
    user1Id,
    user2Id,
    chat:{
        senderId,
        text:
        seen?
        starred?
        etc...
    }
     */
})

const Message = model('Message', messageSchema)
export default Message