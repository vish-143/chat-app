import { put, takeEvery } from "redux-saga/effects";
import { apiConfig } from "@utils/constants/api-constants";
import { GRANT_TYPE } from "@utils/constants/common";
import { postRequest } from "@utils/helpers/api-call";
import { setAuth, clearAuth } from "@utils/helpers/helper";
import * as actionTypes from "@actionTypes/login";
import {
    loginRequestFailure,
    loginRequestSuccess,
} from "@actions/login";

function* fetchUser(action) {
    try {
        const res = yield postRequest({
            apiEndpoint: apiConfig.login.apiEndpoint,
            data: { ...action.payload, grantType: GRANT_TYPE },
        });
        if (res.data.statusCode === 200) {
            const data = { isAuth: true, ...res.data };
            setAuth(data);
            yield put(loginRequestSuccess(data));
            action.payload.callback();
        } else {
            yield put(loginRequestFailure(res.data.message));
        }
    } catch (error) {
        yield put(loginRequestFailure(error.message || "Something Went Wrong..!"));
    }
}

function* loginSaga() {
    yield takeEvery(actionTypes.LOGIN_REQUEST, fetchUser);
}

export default loginSaga;
