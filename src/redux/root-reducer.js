import { combineReducers } from 'redux';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';

import anamneseReducer from './slices/anamnese';
import calendarReducer from './slices/calendar';
import finishedReducer from './slices/finished';
import homereducer from './slices/home';
import invoiceReducer from './slices/invoice';
import metricsReducer from './slices/metrics';
import notificatiosReducer from './slices/notification';
import programReducer from './slices/program';
import ratingReducer from './slices/rating';
import trainingReducer from './slices/training';
import userReducer from './slices/user';
import workoutReducer from './slices/workout';
import workoutsReducer from './slices/workouts';

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
  workout: workoutReducer,
  invoice: invoiceReducer,
  finished: finishedReducer,
  workouts: workoutsReducer,
  program: programReducer,
});
