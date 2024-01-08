// languageService.js
import {store} from '../redux/store';
import { changeLanguage } from '../redux/slices/languageSlice';

const setLanguage = (language) => {
  store.dispatch(changeLanguage(language));
};

const getCurrentLanguage = () => {
  const state = store.getState();
  return state.language;
};

export { setLanguage, getCurrentLanguage };
