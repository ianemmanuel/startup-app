// index.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import AppRouter from './AppRouter';
import reportWebVitals from './reportWebVitals';
import './style.css'; 


const root = document.getElementById('root') as HTMLElement;

ReactDOM.render(
  <React.StrictMode>
    <Router>
      
      <AppRouter />
    </Router>
  </React.StrictMode>,
  root,
);

reportWebVitals();