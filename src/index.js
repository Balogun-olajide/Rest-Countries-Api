import React from 'react';
import ReactDom from 'react-dom/client';
import './index.css';
import App from './containers/js/App';

const root = ReactDom.createRoot(document.getElementById('root'));
root.render(
    <App />
);