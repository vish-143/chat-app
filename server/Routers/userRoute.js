const express = require("express")
const userController = require("../Controllers/userController")
const router = express.Router()

router.post("/register", userController.registerUser)
router.post("/login", userController.loginUser)
router.get("/:id", userController.getUser)
router.get("/", userController.getUsers)

module.exports = router