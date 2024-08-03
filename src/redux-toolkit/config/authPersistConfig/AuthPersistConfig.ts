import EncryptedStorage from 'react-native-encrypted-storage';

export const authPersistConfig = {
  key: 'auth',
  storage: EncryptedStorage,
  whitelist: ['isLoggedIn', 'isAuthenticated', 'accessToken'],
};

export const userPersistConfig = {
  key: 'user',
  storage: EncryptedStorage,
  whitelist: ['userInfo', 'userId', 'userType'],
};
