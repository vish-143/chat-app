import { produce } from "immer";
import * as actionTypes from "@actionTypes/login";

const initialState = {
    isFetching: false,
    error: "",
    loginResponse: null,
    isAuth: false,
};

export const loginReducer = (prevState = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_REQUEST:
            return produce(prevState, (nextState) => {
                nextState.isFetching = true;
            });

        case actionTypes.LOGIN_REQUEST_FAILURE:
            return produce(prevState, (nextState) => {
                nextState.isFetching = false;
                nextState.error = action.payload;
            });

        case actionTypes.LOGIN_SUCCESS_RESPONSE:
            return produce(prevState, (nextState) => {
                nextState.isFetching = false;
                nextState.error = "";
                nextState.isAuth = true;
                nextState.loginResponse = action.payload;
            });

        case actionTypes.RESET_STATE:
            return produce(prevState, (nextState) => {
                nextState.error = "";
            });
            
        default:
            return prevState;
    }
};