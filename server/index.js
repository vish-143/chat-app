const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const userRoutes = require("./Routers/userRoute")
const chatRoutes = require("./Routers/chatRoute")
const messageRoutes = require("./Routers/messageRoute")
dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.status(200).json({
        status: "Success",
        message: "Welcome to our chat app"
    })
})

app.use("/api/v1/users", userRoutes)
app.use("/api/v1/chats", chatRoutes)
app.use("/api/v1/messages", messageRoutes)

const uri = process.env.CONNECTION_STRING
mongoose.connect(uri, { family: 4 }).then((conn) => {
    console.log("Mongodb connected")
}).catch((error) => {
    console.log('Error while connecting Mongodb: ', error);
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server started running on Port ${PORT}`)
})