const { Server } = require("socket.io");

const io = new Server({ cors: "http://localhost:5173/" });

let onlineUsers = []

io.on("connection", (socket) => {
    socket.on("addNewUser", (userId) => {
        !onlineUsers.some((users) => users.userId === userId) &&
            onlineUsers.push({
                userId,
                socketId: socket.id
            })
        io.emit("getOnlineUsers", onlineUsers)
    })

    socket.on("sendMessage", (message) => {
        const user = onlineUsers.find((user) => user.userId === message.id)
        if (user) {
            io.to(user.socketId).emit("getMessage", message)
            // io.to(user.socketId).emit("getNotifications", {
            //     senderId: message.senderId,
            //     isRead: false,
            //     date: new Date()
            // })
        }
    })
    socket.on("disconnect", () => {
        onlineUsers = onlineUsers.filter((users) => users.socketId !== socket.id)
        io.emit("getOnlineUsers", onlineUsers)
    })
});

io.listen(3000);