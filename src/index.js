import React from 'react';
import ReactDom from 'react-dom/client';
import './index.css';
import HomePage from './containers/js/HomePage';


const root = ReactDom.createRoot(document.getElementById('root'));
root.render(
    <HomePage />
); 

