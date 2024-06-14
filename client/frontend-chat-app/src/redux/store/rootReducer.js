import { loginReducer } from "../reducers/login";
import { combineReducers } from "@reduxjs/toolkit";
import { registerReducer } from "../reducers/register";
import { homeReducer } from "../reducers/home";


const rootReducer = combineReducers({
    login: loginReducer,
    register: registerReducer,
    home: homeReducer
});

export default rootReducer;