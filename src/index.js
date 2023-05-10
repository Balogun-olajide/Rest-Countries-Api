import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './containers/js/HomePage';
import CountryInfo from './containers/js/CountryInfo';
import Header from './components/js/Header';
import './index.css';

const root = createRoot(document.getElementById('root'));

root.render(
  <Router>
    <Header />
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/CountryInfo/:id" component={CountryInfo} />
    </Switch>
  </Router>
);
