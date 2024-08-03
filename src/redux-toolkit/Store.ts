import {configureStore} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import {
  authPersistConfig,
  userPersistConfig,
} from './config/authPersistConfig/AuthPersistConfig';
import {userSlice} from './slices/auth/userSlice';
import {authSlice} from './slices/auth/authSlice';

export const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authSlice.reducer),
    user: persistReducer(userPersistConfig, userSlice.reducer),
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);
