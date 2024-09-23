import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { sellerApi } from '../services/apis/sellerApi';
import { ApiSlice } from '../services/apis/userApi';
import userReducer from './slices/userSlice';
import sellerReducer from './slices/sellerSlice'; 
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { adminApi } from '../services/apis/adminApi';

const rootReducer = combineReducers({
  User: userReducer,
  Seller: sellerReducer,
  [sellerApi.reducerPath]: sellerApi.reducer,
  [ApiSlice.reducerPath]: ApiSlice.reducer,
  [adminApi.reducerPath]: adminApi.reducer,
});

// Persist configuration
const persistConfig = {
  key: 'root',
  storage,
  blacklist: [
    sellerApi.reducerPath,
    ApiSlice.reducerPath,
    adminApi.reducerPath,
  ],
};

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(sellerApi.middleware)
      .concat(ApiSlice.middleware)
      .concat(adminApi.middleware),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export default store;
