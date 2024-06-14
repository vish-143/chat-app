const express = require("express")
const messageController = require("../Controllers/messageController")
const router = express.Router()

router.post("/create", messageController.createMessage)
router.get("/:chatId", messageController.getMessage)

module.exports = router