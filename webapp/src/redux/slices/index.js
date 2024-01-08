import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import locationReducer from './locationSlice';
import languageReducer from './languageSlice';
import deviceReadingsReducer from './deviceReadingsSlice';
import compatibilityReducer from './compatibilitySlice';

const rootReducer = combineReducers({
  user: userReducer,
  location: locationReducer,
  language: languageReducer,
  deviceReadings: deviceReadingsReducer,
  compatibility: compatibilityReducer
});

export default rootReducer;
