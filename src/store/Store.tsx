import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { sellerApi } from '../services/apis/sellerApi'; // Import the seller API service
import { ApiSlice } from '../services/apis/userApi'; // Import the user API service
import userReducer from './slices/userSlice'; // Example user slice
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Combine reducers
const rootReducer = combineReducers({
  User: userReducer, // Example user reducer
  [sellerApi.reducerPath]: sellerApi.reducer, // Add the seller API reducer
  [ApiSlice.reducerPath]: ApiSlice.reducer, // Add the user API reducer
});

// Persist configuration
const persistConfig = {
  key: 'root',
  storage,
  blacklist: [sellerApi.reducerPath, ApiSlice.reducerPath], // Don't persist API data
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
    .concat(sellerApi.middleware)
    .concat(ApiSlice.middleware),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export default store;
