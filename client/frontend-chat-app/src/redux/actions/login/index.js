import { ActionCreator } from "@utils/helpers/helper";
import * as actionTypes from "@actionTypes/login";

// Login Actions
export const loginRequest = (data) =>
    ActionCreator(actionTypes.LOGIN_REQUEST, data);
export const loginRequestSuccess = (data) =>
    ActionCreator(actionTypes.LOGIN_SUCCESS_RESPONSE, data);
export const loginRequestFailure = (data) =>
    ActionCreator(actionTypes.LOGIN_REQUEST_FAILURE, data);
export const resetState = (data) =>
    ActionCreator(actionTypes.RESET_STATE, data);