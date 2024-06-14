const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema({
    members: { type: Array },
    memberNames: { type: Array }
}, {
    timestamps: true
});

const ChatModel = mongoose.model("Chat", ChatSchema); // Rename the model to "Chat"

module.exports = ChatModel;
