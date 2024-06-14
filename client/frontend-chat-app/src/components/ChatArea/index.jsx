// import React, { useEffect, useState } from 'react';
// import { Box, Typography, IconButton, Paper, Avatar, AppBar, Toolbar, IconButton as MUIIconButton, Badge } from '@mui/material';
// import SendIcon from '@mui/icons-material/Send';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import { getMessagesRequest, resetState, sendMessagesRequest } from '@redux/actions/home';
// import { useDispatch, useSelector } from 'react-redux';
// import { apiConfig } from '@utils/constants/api-constants';
// import InputEmoji from "react-input-emoji";
// import io from 'socket.io-client';

// import moment from 'moment'

// const ChatArea = ({ selectedChat, setOnlineUsers, onlineUsers }) => {
//   const dispatch = useDispatch()
//   const getMessages = useSelector((state) => state.home.getMessageResponse)
//   const loginResponse = useSelector((state) => state.login.loginResponse);
//   const apiEndPoint = `${apiConfig.getMessages.apiEndpoint}/${selectedChat?.id}`
//   const [text, setText] = useState("");
//   const [message, setMessage] = useState(null)
//   console.log('message: ', message);
//   const [socket, setSocket] = useState(null);
//   // const isOnline = onlineUsers?.some(user => selectedChat?.allId.includes(user.userId));
//   const isOnline = onlineUsers?.some(user => selectedChat?.recepientId[0] === user.userId);

//   useEffect(() => {
//     const newSocket = io('http://localhost:3000');
//     setSocket(newSocket)

//     return () => {
//       newSocket.disconnect()
//     };
//   }, []);

//   //add online users
//   useEffect(() => {
//     if (socket === null) return
//     socket.emit("addNewUser", loginResponse?._id)
//     socket.on("getOnlineUsers", (res) => {
//       setOnlineUsers(res)
//     })

//     return () => {
//       socket.off("getOnlineUsers")
//     }
//   }, [socket])

//   //send message
//   useEffect(() => {
//     if (socket === null) return
//     socket.emit("sendMessage", { message: message, id: selectedChat?.recepientId[0] })
//   }, [message, selectedChat?.recepientId[0]])

//   //receive message
//   useEffect(() => {
//     if (socket === null) return
//     socket.on("getMessage", res => {
//       if (selectedChat?.id !== res.id) return
//       setMessage(res.message)
//     })
//     return () => {
//       socket.off("getMessage")
//     }
//   }, [socket, getMessages])

//   useEffect(() => {
//     fetchAllMessages()
//   }, [dispatch, selectedChat]);

//   useEffect(() => {
//     if (selectedChat && !text) {
//       dispatch(getMessagesRequest({ apiEndPoint }))
//     }
//   }, [dispatch, text])

//   function fetchAllMessages() {
//     dispatch(resetState())
//     if (selectedChat) {
//       dispatch(getMessagesRequest({ apiEndPoint }));
//     }
//     return () => dispatch(resetState());
//   }

//   const handleSend = () => {
//     if (text.trim()) {
//       dispatch(sendMessagesRequest({
//         chatId: selectedChat?.id,
//         senderId: loginResponse?._id,
//         text: text
//       }))
//       setMessage(text)
//       setText("")
//     }
//   };

//   return (

//     <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh' }}>
//       <AppBar position="static" sx={{ bgcolor: '#075E54' }}>
//         <Toolbar>
//           <MUIIconButton edge="start" color="inherit" aria-label="back">
//             <ArrowBackIcon />
//           </MUIIconButton>
//           <Avatar sx={{ bgcolor: 'grey', mr: 2 }}>A</Avatar>
//           <Box sx={{ display: 'flex', flexDirection: "column" }}>
//             <Typography variant="h5">
//               {selectedChat && selectedChat?.name}
//             </Typography>
//             <Typography variant="p">
//               <Badge variant="dot" sx={{
//                 mr: 1.5,
//                 ml: 1,
//                 '& .MuiBadge-dot': {
//                   backgroundColor: isOnline && '#05b714',
//                   border: isOnline && "1px solid white"
//                 }
//               }} />
//               {isOnline && "online"}
//             </Typography>
//           </Box>
//         </Toolbar>
//       </AppBar>
//       <Box sx={{ flex: 1, p: 2, overflowY: 'auto', bgcolor: '#ECE5DD' }}>
//         {getMessages && getMessages.chat.map((message, index) => (
//           <Box
//             key={index}
//             sx={{
//               mb: 2,
//               display: 'flex',
//               flexDirection: message.senderId === loginResponse._id ? 'row-reverse' : 'row',
//               alignItems: 'flex-end',
//             }}
//           >
//             <Avatar
//               sx={{ bgcolor: message.senderId === loginResponse._id ? 'blue' : 'grey', mr: message.senderId === loginResponse._id ? 0 : 2, ml: message.senderId === loginResponse._id ? 2 : 0 }}
//             >
//               {message.text}
//             </Avatar>
//             <Box
//               sx={{ display: 'flex', flexDirection: 'column', alignItems: message.senderId === loginResponse._id ? 'flex-end' : 'flex-start' }}
//             >
//               <Paper
//                 sx={{
//                   p: 1,
//                   maxWidth: '100%',
//                   bgcolor: message.senderId === loginResponse._id ? '#DCF8C6' : '#fff',
//                   borderRadius: 2,
//                 }}
//               >
//                 <Typography variant="body1">{message.text}</Typography>
//               </Paper>
//               <Typography variant="caption" color="textSecondary" sx={{ mt: 0.5 }}>
//                 {moment(message.createdAt).format('hh:mm A')}
//               </Typography>
//             </Box>
//           </Box>
//         ))}
//       </Box>
//       <Box sx={{ p: 2, borderTop: '1px solid #ddd', display: 'flex', alignItems: 'center', bgcolor: '#fff' }}>
//         <InputEmoji
//           value={text}
//           onChange={setText}
//           cleanOnEnter
//           onEnter={handleSend}
//           placeholder="Type a message"
//         />
//         <IconButton sx={{ backgroundColor: "#f09819" }} onClick={handleSend}>
//           <SendIcon sx={{ color: "white" }} />
//         </IconButton>
//       </Box>
//     </Box>

//   );
// };

// export default ChatArea;


import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography, IconButton, Paper, Avatar, AppBar, Toolbar, IconButton as MUIIconButton, Badge, Stack, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { getMessagesRequest, resetState, sendMessagesRequest } from '@redux/actions/home';
import { useDispatch, useSelector } from 'react-redux';
import { apiConfig } from '@utils/constants/api-constants';
import InputEmoji from "react-input-emoji";
import io from 'socket.io-client';
import moment from 'moment';
import chatIcon from '@assets/gifs/chat.gif';
import dashboardLogo from '@assets/gifs/dashboard.gif';


const ChatArea = ({ selectedChat, setOnlineUsers, onlineUsers }) => {
  const dispatch = useDispatch();
  const getMessages = useSelector((state) => state.home.getMessageResponse);
  const loginResponse = useSelector((state) => state.login.loginResponse);
  const apiEndPoint = `${apiConfig.getMessages.apiEndpoint}/${selectedChat?.id}`;
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const scroll = useRef()
  const isOnline = onlineUsers?.some(user => selectedChat?.recepientId.includes(user.userId));

  useEffect(() => {
    const newSocket = io('http://localhost:3000');
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.emit("addNewUser", loginResponse?._id);
      socket.on("getOnlineUsers", (res) => {
        setOnlineUsers(res);
      });

      return () => {
        socket.off("getOnlineUsers");
      };
    }
  }, [socket, loginResponse, setOnlineUsers]);

  useEffect(() => {
    if (socket && selectedChat) {
      socket.on("getMessage", (res) => {
        if (selectedChat?.id === res.chatId) {
          setMessages(prevMessages => [...prevMessages, res]);
        }
      });

      return () => {
        socket.off("getMessage");
      };
    }
  }, [socket, selectedChat]);

  useEffect(() => {
    if (selectedChat) {
      dispatch(resetState());
      dispatch(getMessagesRequest({ apiEndPoint }));
    }

    return () => {
      dispatch(resetState());
    };
  }, [dispatch, selectedChat, apiEndPoint]);

  useEffect(() => {
    setMessages([])
    if (getMessages && selectedChat) {
      setMessages(getMessages.chat);
    }
  }, [getMessages, selectedChat]);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behaviour: "smooth" })
  }, [messages])

  const handleEnter = (event) => {
    if (event.key === 'Enter' && text.trim()) {
      const newMessage = {
        chatId: selectedChat?.id,
        senderId: loginResponse?._id,
        text: text,
        createdAt: new Date().toISOString()
      };

      dispatch(sendMessagesRequest(newMessage));
      setMessages(prevMessages => [...prevMessages, newMessage]);
      setText("");

      if (socket) {
        socket.emit("sendMessage", { ...newMessage, id: selectedChat.recepientId[0] });
      }
    }
  };

  const handleSend = () => {
    if (text.trim()) {
      const newMessage = {
        chatId: selectedChat?.id,
        senderId: loginResponse?._id,
        text: text,
        createdAt: new Date().toISOString()
      };

      dispatch(sendMessagesRequest(newMessage));
      setMessages(prevMessages => [...prevMessages, newMessage]);
      setText("");

      if (socket) {
        socket.emit("sendMessage", { ...newMessage, id: selectedChat.recepientId[0] });
      }
    }
  };

  return (
    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
      <AppBar position="static" sx={{ bgcolor: 'black', borderBottom: "1px solid white" }}>
        <Toolbar>
          {
            selectedChat ?
              <Avatar sx={{ bgcolor: 'grey', mr: 2 }}>{selectedChat && selectedChat?.name[0]}</Avatar> :

              <Typography variant="h5">
                <img src={chatIcon} style={{ marginRight: "8px" }} />
                Explore your Chats
              </Typography>

          }
          <Box sx={{ display: 'flex', flexDirection: "column" }}>
            <Typography variant="h5">
              {selectedChat && selectedChat?.name}
            </Typography>
            <Typography variant="body2">
              <Badge variant="dot" sx={{
                mr: 1.5,
                ml: 1,
                '& .MuiBadge-dot': {
                  backgroundColor: selectedChat && (isOnline ? '#05b714' : 'red'),
                  border: selectedChat && "1px solid white"
                }
              }} />
              {selectedChat && (isOnline ? "online" : "last seen recently")}
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
      <Box sx={{ flex: 1, p: 2, overflowY: 'auto', bgcolor: 'black' }}>
        {selectedChat ?
          messages.length > 0 ? messages.map((message, index) => (
            <Box
              key={index}
              sx={{
                mb: 2,
                display: 'flex',
                flexDirection: message.senderId === loginResponse._id ? 'row-reverse' : 'row',
                alignItems: 'flex-end',
              }}
              ref={scroll}
            >
              <Avatar
                sx={{ bottom: "14px", bgcolor: message.senderId === loginResponse._id ? 'blue' : 'grey', mr: message.senderId === loginResponse._id ? 0 : 2, ml: message.senderId === loginResponse._id ? 2 : 0 }}
              >
                {message.senderId === loginResponse._id ? selectedChat && selectedChat?.name[0] : loginResponse.name[0]}
              </Avatar>
              <Box
                sx={{ display: 'flex', flexDirection: 'column', alignItems: message.senderId === loginResponse._id ? 'flex-end' : 'flex-start' }}
              >
                <Paper
                  sx={{
                    p: 1,
                    maxWidth: '100%',
                    bgcolor: message.senderId === loginResponse._id ? '#c7c7c7' : '#006dd2',
                    color: message.senderId !== loginResponse._id && "white",
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="body1">{message.text}</Typography>
                </Paper>
                <Typography variant="caption" color="white" sx={{ mt: 0.5 }}>
                  {moment(message.createdAt).format('hh:mm A')}
                </Typography>
              </Box>
            </Box>
          )) : <Box sx={{ display: "flex", justifyContent: "center", height: "100%", alignItems: "center" }}><Typography variant="h6" sx={{ color: "white" }}>No Conversations yet to be started!</Typography> </Box> : <Box sx={{ display: "flex", justifyContent: "center" }}>
            <img src={dashboardLogo} />
          </Box>
        }
      </Box>
      <Box sx={{ p: 2, borderTop: '1px solid #ddd', display: 'flex', alignItems: 'center', bgcolor: 'black' }}>
        {/* <InputEmoji
          value={text}
          onChange={setText}
          cleanOnEnter
          onClick={handleSend}
          placeholder="Type a message"
        /> */}
        <TextField
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={handleEnter}
          placeholder="Type a message"
          variant="outlined"
          sx={{ flex: 1, mr: 1, bgcolor: 'white' }}
        />
        <Box onClick={handleSend}>
          <SendIcon sx={{ color: "white" }} />
        </Box>
      </Box>
    </Box>
  );
};

export default ChatArea;

