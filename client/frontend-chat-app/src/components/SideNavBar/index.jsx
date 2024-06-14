import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetState } from '@redux/actions/login';
import { getAllUsersRequest, getAllUsersChatRequest, addNewChatRequest } from '@redux/actions/home';
import { apiConfig } from '@utils/constants/api-constants';
import { Box, List, ListItem, ListItemText, Typography, TextField, Badge, Avatar, Button, Stack, Grid, Divider } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ChatIcon from '@mui/icons-material/Chat';
import AddCommentIcon from '@mui/icons-material/AddComment';
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';
import ChatArea from '../ChatArea';

const SideNavBar = () => {
  const loginResponse = useSelector((state) => state.login.loginResponse);
  const getChatsResponse = useSelector((state) => state.home.getAllUsersChatResponse);
  const getUsers = useSelector((state) => state.home.getAllUsersResponse);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [isNewChat, setNewChat] = useState(false);
  const [currentChat, setCurrentChat] = useState(null)
  const [newChatCreated, setNewChatCreated] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([])

  const apiEndPoint = `${apiConfig.getAllUsersChat.apiEndpoint}/${loginResponse._id}`;

  function fetchAllChats() {
    if (loginResponse && loginResponse._id) {
      dispatch(getAllUsersChatRequest({ apiEndPoint }));
      dispatch(getAllUsersRequest());
    }
    return () => dispatch(resetState());
  }

  useEffect(() => {
    if (newChatCreated) {
      dispatch(getAllUsersChatRequest({ apiEndPoint }));
      setNewChatCreated(false)
    }
    return () => dispatch(resetState());
  }, [dispatch, newChatCreated])

  useEffect(() => {
    fetchAllChats()
  }, [dispatch, loginResponse]);

  const getAllUsers = () => {
    setNewChat((prevState) => !prevState);
    // if (!getUsers) {
    //   dispatch(getAllUsersRequest());
    // }
  };

  const addNewChat = (secondId) => {
    dispatch(addNewChatRequest({
      firstId: loginResponse._id,
      secondId: secondId
    }))
    setNewChatCreated(true)
  }

  const filteredContacts = getUsers?.filter(contact => {
    return (
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) && contact.name !== loginResponse.name
    )
  }).sort((a, b) => a.name.localeCompare(b.name));

  const filteredChats = getChatsResponse?.chat?.filter(contact =>
    contact.memberNames.some(name => name.toLowerCase().includes(searchTerm.toLowerCase()) && name !== loginResponse.name)
  );


  return (
    <>
      <Box
        sx={{
          width: '30%',
          bgcolor: '#f0f0f0',
          borderRight: '1px solid #ddd',
          overflowY: 'auto'
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-around", gap: "36%", mt: 2 }}>
          <Typography variant="h6" sx={{ p: 2, color: "white" }}>
            Chit Chat
          </Typography>
          <Box>
            <Button variant="contained" onClick={getAllUsers} endIcon={isNewChat ? <ChatIcon /> : <AddCommentIcon />} sx={{ backgroundColor: "#f09819", p: 1, mt: 1.5, fontWeight: "bold" }}>
              {isNewChat ? "Chats" : "New Chat"}
            </Button>
          </Box>
        </Box>
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
          <SearchIcon />
          <TextField
            fullWidth
            placeholder="Search chats"
            variant="standard"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ ml: 1 }}
          />
        </Box>
        <List>
          {isNewChat ? (
            filteredContacts && filteredContacts.length > 0 ? (
              filteredContacts.map((user) => (
                <ListItem key={user._id} onClick={() => addNewChat(user._id)} button>
                  <Avatar sx={{ bgcolor: 'grey', mr: 2 }}>
                    {user.name[0]}
                  </Avatar>
                  <ListItemText primary={user.name} />
                </ListItem>
              )
              )
            ) : (
              <Typography sx={{ p: 2, color: "white" }}>No Users found</Typography>
            )
          ) : (
            filteredChats && filteredChats.length > 0 ? (
              filteredChats.map((chat) => {
                const filteredNames = chat.memberNames.filter(name => name !== loginResponse.name).join(', ');
                const chatMemberIds = chat.members.filter(id => id !== loginResponse._id);
                const isOnline = onlineUsers.some(user => chatMemberIds.includes(user.userId));
                return (
                  <ListItem key={chat._id} onClick={() => setCurrentChat({ recepientId: chatMemberIds, allId: chatMemberIds, id: chat._id, name: filteredNames })} button>
                    <Grid container direction="column" spacing={1}>
                      <Grid item container alignItems="center" justifyContent="space-between">
                        <Grid item>
                          <Avatar sx={{ bgcolor: chat.online ? 'green' : 'grey', mr: 2 }}>
                            {filteredNames[0]}
                          </Avatar>
                        </Grid>
                        <Grid item xs>
                          <ListItemText primary={
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              {filteredNames}
                              <Badge variant="dot" sx={{
                                ml: 2,
                                '& .MuiBadge-dot': {
                                  backgroundColor: isOnline ? '#05b714' : "",
                                  border: isOnline ? "1px solid white" : ""
                                }
                              }} />
                            </Box>
                          } />
                        </Grid>
                        <Grid item>
                          <Typography sx={{ color: "grey" }}>21/5/2024</Typography>
                        </Grid>
                      </Grid>

                      <Grid item container justifyContent="space-between" alignItems="center">
                        <Grid item>
                          <Typography sx={{ color: "grey" }}>Hai Hello</Typography>
                        </Grid>
                        <Grid item>
                          <Badge badgeContent={4} sx={{ transform: "translateX(6px)" }}>
                            <MarkUnreadChatAltIcon />
                          </Badge>
                        </Grid>
                      </Grid>
                      <Divider sx={{ backgroundColor: "white", mt: 1 }} />
                    </Grid>
                  </ListItem>
                );
              })
            ) : (
              <Typography sx={{ p: 2, color: "white" }}>No Chats found</Typography>
            )
          )}
        </List>
      </Box>
      <ChatArea selectedChat={currentChat} setOnlineUsers={setOnlineUsers} onlineUsers={onlineUsers} />
    </>
  );
};

export default SideNavBar;
