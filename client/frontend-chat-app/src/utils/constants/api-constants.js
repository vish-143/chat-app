
import { API_METHODS } from "./common";

export const apiConfig = {
  getAllUsers: { apiEndpoint: "/users", method: API_METHODS.GET },
  register: { apiEndpoint: "/users/register", method: API_METHODS.POST },
  login: { apiEndpoint: "/users/login", method: API_METHODS.POST },

  getAllUsersChat: { apiEndpoint: "/chats", method: API_METHODS.GET },
  addNewChat: { apiEndpoint: "/chats/create", method: API_METHODS.POST },

  getMessages:{apiEndpoint: "/messages", method: API_METHODS.GET},
  sendMessages:{apiEndpoint: "/messages/create", method: API_METHODS.POST}
};
