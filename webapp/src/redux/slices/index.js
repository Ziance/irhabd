import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import locationReducer from './locationSlice';
import languageReducer from './languageSlice';

const rootReducer = combineReducers({
  user: userReducer,
  location: locationReducer,
  language: languageReducer
});

export default rootReducer;
