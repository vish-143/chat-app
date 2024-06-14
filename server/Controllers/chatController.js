const ChatSchema = require("../Models/chatModel")
const UserSchema=require("../Models/userModel")

const createChat = async (req, res) => {
    const { firstId, secondId } = req.body;
    try {
        const [firstUser, secondUser] = await Promise.all([
            UserSchema.findById(firstId).select("name"),
            UserSchema.findById(secondId).select("name")
        ]);

        const memberNames = [firstUser?.name, secondUser?.name];

        const chat = await ChatSchema.findOne({ members: { $all: [firstId, secondId] } });
        if (chat) {
            return res.status(200).json({
                status: "Success",
                data: {
                    statusCode: 200,
                    chat
                }
            });
        } else {
            const newChat = new ChatSchema({
                members: [firstId, secondId],
                memberNames 
            });
            const response = await newChat.save();
            return res.status(200).json({
                status: "Success",
                data: {
                    statusCode: 200,
                    response
                }
            });
        }
    } catch (error) {
        res.status(500).json({
            status: "Fail",
            message: error
        });
    }
};

const findUserChats = async (req, res) => {
    const userId = req.params.userId
    try {
        const chat = await ChatSchema.find({ members: { $in: [userId] } })
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
                message: "No user chat found"
            });
        }
    } catch (error) {
        res.status(500).json({
            status: "Fail",
            message: error
        })
    }
}

const findChat = async (req, res) => {
    const { firstId, secondId } = req.params
    try {
        const chat = await ChatSchema.findOne({ members: { $all: [firstId, secondId] } })
        if (chat) {
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

module.exports = {
    createChat,
    findUserChats,
    findChat
}