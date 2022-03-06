import { configureStore } from '@reduxjs/toolkit';
import { createStore, combineReducers } from 'redux';

import clusterReducer from './reducers/cluster-reducer';

const rootReducer = combineReducers({
  cluster: clusterReducer
});

const store = configureStore({ reducer: rootReducer });

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
export default store;
