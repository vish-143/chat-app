import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./rootSaga";
import logger from "redux-logger";
import storage from 'redux-persist/lib/storage';
import { persistReducer } from "redux-persist";
import { persistStore } from 'redux-persist';

const persistConfig = {
  key: 'chit-chat',
  storage,
  whitelist: ['login']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];
middleware.push(logger);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(middleware),
  devTools: false,
});

let persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { persistor, store } 