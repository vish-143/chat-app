import { ActionCreator } from "@utils/helpers/helper";
import * as actionTypes from "@actionTypes/home";
import { RESET_STATE } from "@actionTypes/login";

// Get all users chat Actions
export const getAllUsersChatRequest = (data) =>
    ActionCreator(actionTypes.GET_ALL_USERS_CHAT_REQUEST, data);
export const getAllUsersChatRequestSuccess = (data) =>
    ActionCreator(actionTypes.GET_ALL_USERS_CHAT_SUCCESS_RESPONSE, data);
export const getAllUsersChatRequestFailure = (data) =>
    ActionCreator(actionTypes.GET_ALL_USERS_CHAT_REQUEST_FAILURE, data);
export const resetState = (data) =>
    ActionCreator(RESET_STATE, data);

// Get all users Actions
export const getAllUsersRequest = (data) =>
    ActionCreator(actionTypes.GET_ALL_USERS_REQUEST, data);
export const getAllUsersRequestSuccess = (data) =>
    ActionCreator(actionTypes.GET_ALL_USERS_SUCCESS_RESPONSE, data);
export const getAllUsersRequestFailure = (data) =>
    ActionCreator(actionTypes.GET_ALL_USERS_REQUEST_FAILURE, data);

// Add new chat Actions
export const addNewChatRequest = (data) =>
    ActionCreator(actionTypes.ADD_NEW_CHAT_REQUEST, data);
export const addNewChatRequestSuccess = (data) =>
    ActionCreator(actionTypes.ADD_NEW_CHAT_SUCCESS_RESPONSE, data);
export const addNewChatRequestFailure = (data) =>
    ActionCreator(actionTypes.ADD_NEW_CHAT_REQUEST_FAILURE, data);

// Get all message Actions
export const getMessagesRequest = (data) =>
    ActionCreator(actionTypes.GET_MESSAGES_REQUEST, data);
export const getMessagesRequestSuccess = (data) =>
    ActionCreator(actionTypes.GET_MESSAGES_SUCCESS_RESPONSE, data);
export const getMessagesRequestFailure = (data) =>
    ActionCreator(actionTypes.GET_MESSAGES_REQUEST_FAILURE, data);

// Send message Actions
export const sendMessagesRequest = (data) =>
    ActionCreator(actionTypes.SEND_MESSAGES_REQUEST, data);
export const sendMessagesRequestSuccess = (data) =>
    ActionCreator(actionTypes.SEND_MESSAGES_SUCCESS_RESPONSE, data);
export const sendMessagesRequestFailure = (data) =>
    ActionCreator(actionTypes.SEND_MESSAGES_REQUEST_FAILURE, data);