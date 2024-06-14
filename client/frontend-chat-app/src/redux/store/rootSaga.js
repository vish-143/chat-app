import { all, fork } from "redux-saga/effects";
import loginSaga from "../saga/login";
import registerSaga from "../saga/register";
import homeSaga from "../saga/home";

export default function* rootSaga() {
  yield all([fork(loginSaga)]);
  yield all([fork(registerSaga)])
  yield all([fork(homeSaga)])
}