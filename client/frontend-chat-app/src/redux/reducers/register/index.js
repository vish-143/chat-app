import { produce } from "immer";
import * as actionTypes from "@actionTypes/register";
import { RESET_STATE } from "@actionTypes/login";

const initialState = {
    isFetching: false,
    error: "",
    registerResponse: null,
};

export const registerReducer = (prevState = initialState, action) => {
    switch (action.type) {
        case actionTypes.REGISTER_REQUEST:
            return produce(prevState, (nextState) => {
                nextState.isFetching = true;
            });

        case actionTypes.REGISTER_REQUEST_FAILURE:
            return produce(prevState, (nextState) => {
                nextState.isFetching = false;
                nextState.error = action.payload;
            });

        case actionTypes.REGISTER_SUCCESS_RESPONSE:
            return produce(prevState, (nextState) => {
                nextState.isFetching = false;
                nextState.error = "";
                nextState.registerResponse = action.payload;
            });

        case RESET_STATE:
            return produce(prevState, (nextState) => {
                nextState.error = "";
            });

        default:
            return prevState;
    }
};