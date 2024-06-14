const messageSchema = require("../Models/messageModel")

const createMessage = async (req, res) => {
    const { chatId, senderId, text } = req.body
    const message = new messageSchema({
        chatId,
        senderId,
        text
    })
    try {
        const response = await message.save()
        return res.status(200).json({
            status: "Success",
            data: {
                statusCode: 200,
                response
            }
        })
    } catch (error) {
        res.status(500).json({
            status: "Fail",
            message: error
        })
    }
}

const getMessage = async (req, res) => {
    const chatId = req.params.chatId
    try {
        const chat = await messageSchema.find({ chatId })
        if (chat.length > 0) {
            return res.status(200).json({
                status: "Success",
                data: {
                    statusCode: 200,
                    chat
                }
            })
        } else {
            return res.status(404).json({
                status: "Fail",
                statusCode: 404,
                message: "No chat found"
            });
        }
    } catch (error) {
        res.status(500).json({
            status: "Fail",
            message: error
        })
    }
}

module.exports = { createMessage, getMessage }