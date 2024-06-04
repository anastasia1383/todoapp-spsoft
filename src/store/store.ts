import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  PersistConfig,
} from 'redux-persist';

import authSlice, { AuthState } from './auth.slice';
import todosSlice, { TodosState } from './todos.slice';
import permissionsSlice, {PermissionState} from './permissions.slice';

const sessionPersistConfig: PersistConfig<AuthState> = {
  key: 'sessionData',
  storage,
  stateReconciler: hardSet,
};

const todosPersistConfig: PersistConfig<TodosState> = {
  key: 'todos',
  storage,
  stateReconciler: hardSet,
};

const permissionsConfig: PersistConfig<PermissionState> = {
  key: 'permissions',
  storage,
  stateReconciler: hardSet,
};


const reducer = combineReducers({
  sessionData: persistReducer(sessionPersistConfig, authSlice),
  todos: persistReducer(todosPersistConfig, todosSlice),
  permissions: persistReducer(permissionsConfig, permissionsSlice),
});

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),

});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
