import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './assets/css/style.css'
import './assets/css/media.css'
import './assets/css/animation.css'
import './assets/css/bootstrap-custom.css'
import './Slider/slider-1/base.css';
import './Slider/slider-1/sandbox.css';
import './Slider/slider-1/embla.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);