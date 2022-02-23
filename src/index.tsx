import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom';

import { ModalContextProvider } from './store/modal-context';
import { TimerContextProvider } from './store/timer-context';
import { ToastContextProvider } from './store/toast-context';

import App from './App';

import './index.css';
// import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ToastContextProvider>
        <TimerContextProvider>
          <ModalContextProvider>
            <App />
          </ModalContextProvider>
        </TimerContextProvider>
      </ToastContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
