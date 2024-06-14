import { ActionCreator } from "@utils/helpers/helper";
import * as actionTypes from "@actionTypes/register";
import { RESET_STATE } from "@actionTypes/login";

// Register Actions
export const registerRequest = (data) =>
    ActionCreator(actionTypes.REGISTER_REQUEST, data);
export const registerRequestSuccess = (data) =>
    ActionCreator(actionTypes.REGISTER_SUCCESS_RESPONSE, data);
export const registerRequestFailure = (data) =>
    ActionCreator(actionTypes.REGISTER_REQUEST_FAILURE, data);
export const resetState = (data) =>
    ActionCreator(RESET_STATE, data);
