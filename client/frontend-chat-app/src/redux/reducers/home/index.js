import { produce } from "immer";
import * as actionTypes from "@actionTypes/home";
import { RESET_STATE } from "@actionTypes/login";

const initialState = {
    error: "",
    isFetching: false,
    getAllUsersChatResponse: null,
    getAllUsersResponse: null,
    addNewChatResponse: null,
    getMessageResponse: null,
    sendMessageResponse: null
};

export const homeReducer = (prevState = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_ALL_USERS_CHAT_REQUEST:
            return produce(prevState, (nextState) => {
                nextState.isFetching = true;
            });

        case actionTypes.GET_ALL_USERS_CHAT_REQUEST_FAILURE:
            return produce(prevState, (nextState) => {
                nextState.isFetching = false;
                nextState.error = action.payload;
            });

        case actionTypes.GET_ALL_USERS_CHAT_SUCCESS_RESPONSE:
            return produce(prevState, (nextState) => {
                nextState.isFetching = false;
                nextState.error = "";
                nextState.getAllUsersChatResponse = action.payload;
            });

        case actionTypes.GET_ALL_USERS_REQUEST:
            return produce(prevState, (nextState) => {
                nextState.isFetching = true;
            });

        case actionTypes.GET_ALL_USERS_REQUEST_FAILURE:
            return produce(prevState, (nextState) => {
                nextState.isFetching = false;
                nextState.error = action.payload;
            });

        case actionTypes.GET_ALL_USERS_SUCCESS_RESPONSE:
            return produce(prevState, (nextState) => {
                nextState.isFetching = false;
                nextState.error = "";
                nextState.getAllUsersResponse = action.payload;
            });

        case actionTypes.ADD_NEW_CHAT_REQUEST:
            return produce(prevState, (nextState) => {
                nextState.isFetching = true;
            });

        case actionTypes.ADD_NEW_CHAT_REQUEST_FAILURE:
            return produce(prevState, (nextState) => {
                nextState.isFetching = false;
                nextState.error = action.payload;
            });

        case actionTypes.ADD_NEW_CHAT_SUCCESS_RESPONSE:
            return produce(prevState, (nextState) => {
                nextState.isFetching = false;
                nextState.error = "";
                nextState.addNewChatResponse = action.payload;
            });

        case actionTypes.GET_MESSAGES_REQUEST:
            return produce(prevState, (nextState) => {
                nextState.isFetching = true;
            });

        case actionTypes.GET_MESSAGES_REQUEST_FAILURE:
            return produce(prevState, (nextState) => {
                nextState.isFetching = false;
                nextState.error = action.payload;
            });

        case actionTypes.GET_MESSAGES_SUCCESS_RESPONSE:
            return produce(prevState, (nextState) => {
                nextState.isFetching = false;
                nextState.error = "";
                nextState.getMessageResponse = action.payload;
            });

        case actionTypes.SEND_MESSAGES_REQUEST:
            return produce(prevState, (nextState) => {
                nextState.isFetching = true;
            });

        case actionTypes.SEND_MESSAGES_REQUEST_FAILURE:
            return produce(prevState, (nextState) => {
                nextState.isFetching = false;
                nextState.error = action.payload;
            });

        case actionTypes.SEND_MESSAGES_SUCCESS_RESPONSE:
            return produce(prevState, (nextState) => {
                nextState.isFetching = false;
                nextState.error = "";
                nextState.sendMessageResponse = action.payload;
            });

        case RESET_STATE:
            return produce(prevState, (nextState) => {
                nextState.error = "";
                nextState.getMessageResponse = ""
            });

        default:
            return prevState;
    }
};