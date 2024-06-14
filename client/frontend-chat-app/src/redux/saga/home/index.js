import { call, put, takeEvery } from "redux-saga/effects";
import { apiConfig } from "@utils/constants/api-constants";
import { GRANT_TYPE } from "@utils/constants/common";
import { getRequest, postRequest } from "@utils/helpers/api-call";
import * as actionTypes from "@actionTypes/home";
import {
    getAllUsersChatRequestFailure,
    getAllUsersChatRequestSuccess,
    getAllUsersRequestFailure,
    getAllUsersRequestSuccess,
    addNewChatRequestSuccess,
    addNewChatRequestFailure,
    getMessagesRequestSuccess,
    getMessagesRequestFailure,
    sendMessagesRequestSuccess,
    sendMessagesRequestFailure
} from "@actions/home";

function* getAllUsersChat(action) {
    try {
        const { apiEndPoint, ...rest } = action.payload;
        const res = yield call(getRequest, {
            apiEndpoint: apiEndPoint,
            data: { ...rest, grantType: GRANT_TYPE },
        });
        if (res.data.statusCode === 200) {
            const data = res.data;
            yield put(getAllUsersChatRequestSuccess(data));
        } else {
            yield put(getAllUsersChatRequestFailure(res.data.message));
        }
    } catch (error) {
        yield put(getAllUsersChatRequestFailure(error.message || "Something Went Wrong..!"));
    }
}

function* getAllUsers(action) {
    try {
        const res = yield call(getRequest, {
            apiEndpoint: apiConfig.getAllUsers.apiEndpoint,
            data: { ...action.payload, grantType: GRANT_TYPE },
        });
        if (res.statusCode === 200) {
            const data = res.data;
            yield put(getAllUsersRequestSuccess(data));
        } else {
            yield put(getAllUsersRequestFailure(res.data.message));
        }
    } catch (error) {
        yield put(getAllUsersRequestFailure(error.message || "Something Went Wrong..!"));
    }
}

function* addNewChat(action) {
    try {
        const res = yield postRequest({
            apiEndpoint: apiConfig.addNewChat.apiEndpoint,
            data: { ...action.payload, grantType: GRANT_TYPE },
        });
        if (res.data.statusCode === 200) {
            const data = { ...res.data };
            yield put(addNewChatRequestSuccess(data));
        } else {
            yield put(addNewChatRequestFailure(res.data.message));
        }
    } catch (error) {
        yield put(addNewChatRequestFailure(error.message || "Something Went Wrong..!"));
    }
}

function* fetchAllMessage(action) {
    try {
        const { apiEndPoint, ...rest } = action.payload;
        const res = yield call(getRequest,{
            apiEndpoint: apiEndPoint,
            data: { ...rest, grantType: GRANT_TYPE },
        });
        if (res.data.statusCode === 200) {
            const data = res.data;
            yield put(getMessagesRequestSuccess(data));
        } else {
            yield put(getMessagesRequestFailure(res.data.message));
        }
    } catch (error) {
        yield put(getMessagesRequestFailure(error.message || "Something Went Wrong..!"));
    }
}

function* sendMessage(action) {
    try {
        const res = yield postRequest({
            apiEndpoint: apiConfig.sendMessages.apiEndpoint,
            data: { ...action.payload, grantType: GRANT_TYPE },
        });
        if (res.data.statusCode === 200) {
            const data = res.data;
            yield put(sendMessagesRequestSuccess(data));
        } else {
            yield put(sendMessagesRequestFailure(res.data.message));
        }
    } catch (error) {
        yield put(sendMessagesRequestFailure(error.message || "Something Went Wrong..!"));
    }
}

function* homeSaga() {
    yield takeEvery(actionTypes.GET_ALL_USERS_CHAT_REQUEST, getAllUsersChat);
    yield takeEvery(actionTypes.GET_ALL_USERS_REQUEST, getAllUsers);
    yield takeEvery(actionTypes.ADD_NEW_CHAT_REQUEST, addNewChat);
    yield takeEvery(actionTypes.GET_MESSAGES_REQUEST, fetchAllMessage);
    yield takeEvery(actionTypes.SEND_MESSAGES_REQUEST, sendMessage);
}

export default homeSaga;