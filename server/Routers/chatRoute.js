const express = require("express")
const chatController = require("../Controllers/chatController")
const router = express.Router()

router.post("/create", chatController.createChat)
router.get("/:userId", chatController.findUserChats)
router.get("/:firstId/:secondId", chatController.findChat)

module.exports = router