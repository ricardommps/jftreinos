import { combineReducers } from 'redux';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';

import anamneseReducer from './slices/anamnese';
import calendarReducer from './slices/calendar';
import homereducer from './slices/home';
import metricsReducer from './slices/metrics';
import notificatiosReducer from './slices/notification';
import ratingReducer from './slices/rating';
import trainingReducer from './slices/training';
import userReducer from './slices/user';

export const createNoopStorage = () => ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getItem(_key) {
    return Promise.resolve(null);
  },
  setItem(_key, value) {
    return Promise.resolve(value);
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  removeItem(_key) {
    return Promise.resolve();
  },
});

export const storage =
  typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();

export const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

export const rootReducer = combineReducers({
  home: homereducer,
  calendar: calendarReducer,
  user: userReducer,
  metrics: metricsReducer,
  training: trainingReducer,
  rating: ratingReducer,
  anamnese: anamneseReducer,
  notifications: notificatiosReducer,
});
