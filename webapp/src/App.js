import React from "react";
import { Provider } from "react-redux";
import AppRouter from "./routes/AppRouter";
import { store } from "./redux/store";
import { ToastContainer } from 'react-toastify';
import { setLanguage } from './services/languageService';
import 'react-toastify/dist/ReactToastify.css';

setLanguage('en');

function App() {
  return (
    <Provider store={store}>
      <AppRouter />
      <ToastContainer />
    </Provider>
  );
}

export default App;
