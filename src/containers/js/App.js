import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from '../components/js/Header';
import  HomePage  from './HomePage';
import  CountryInfo  from './CountryInfo';

function App ()  {
  return (
    <Router>
      <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/CountryInfo/:id" component={CountryInfo} />
        </Switch>
    </Router>
  );
}

export default App;
