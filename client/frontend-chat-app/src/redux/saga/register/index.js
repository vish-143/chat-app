import { put, takeEvery } from "redux-saga/effects";
import { apiConfig } from "@utils/constants/api-constants";
import { GRANT_TYPE } from "@utils/constants/common";
import { postRequest } from "@utils/helpers/api-call";
import { setAuth, clearAuth } from "@utils/helpers/helper";
import * as actionTypes from "@actionTypes/register";
import {
   registerRequestFailure,
   registerRequestSuccess,
} from "@actions/register";

function* fetchUser(action) {
    try {
        const res = yield postRequest({
            apiEndpoint: apiConfig.register.apiEndpoint,
            data: { ...action.payload, grantType: GRANT_TYPE },
        });
        if (res.data.statusCode === 200) {
            const data = { isAuth: true, ...res.data };
            setAuth(data);
            yield put(registerRequestSuccess(data));
            action.payload.callback();
        } else {
            yield put(registerRequestFailure(res.data.message));
        }
    } catch (error) {
        yield put(registerRequestFailure(error.message || "Something Went Wrong..!"));
    }
}

function* registerSaga() {
    yield takeEvery(actionTypes.REGISTER_REQUEST, fetchUser);
}

export default registerSaga;
