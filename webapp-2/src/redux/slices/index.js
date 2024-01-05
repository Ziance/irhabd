import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import locationReducer from './locationSlice';

const rootReducer = combineReducers({
  user: userReducer,
  location: locationReducer
});

export default rootReducer;
