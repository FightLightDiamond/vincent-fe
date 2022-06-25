import {createStore, applyMiddleware} from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import thunk from 'redux-thunk';
import _rootReducer from './reducers/_root.reducer';
import _rootSaga from "./sagas/_root.saga";
import createSagaMiddleware from "@redux-saga/core";
import {configureStore} from "@reduxjs/toolkit";
// import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";

const initialState = {};
/**
 * Saga Middleware
 */
const sagaMiddleware = createSagaMiddleware()

const middlewares = [thunk, sagaMiddleware];

const persistConfig = {
	key: 'root',
	storage,
	// whitelist: ['connector'],
  // stateReconciler: autoMergeLevel2
}

const persistedReducer = persistReducer(persistConfig, _rootReducer)
const store = createStore(persistedReducer, initialState, applyMiddleware(...middlewares));

// configureStore({
// 	reducer: persistedReducer,
// 	preloadedState: initialState,
// 	middleware: getDefaultMiddleware => getDefaultMiddleware.apply(middlewares)
// })

store.subscribe(() => {
	console.log('store', store.getState())
})

sagaMiddleware.run(_rootSaga)

export const persistor = persistStore(store);
export default store;

