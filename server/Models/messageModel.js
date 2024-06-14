const mongoose = require("mongoose")
const MesageSchema = new mongoose.Schema({
    chatId: String,
    senderId: String,
    text: String
}, {
    timestamps: true
})

const messageModel = new mongoose.model("messages", MesageSchema)
module.exports = messageModel