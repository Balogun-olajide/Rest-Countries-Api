import React, { Component } from 'react';
import {Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import CountryInfo from './CountryInfo';
import HomePage from './HomePage';
import '../css/App.css';

class App extends  React.Component {
    constructor() {
        super();
        this.state = {
          theme: 'light'
        }
    }


  componentDidMount() {
    let theme = localStorage['theme'];
    if (theme) {
  this.setState({ theme });
                document.documentElement.setAttribute('data-theme', theme);
    };
  }

  switchTheme = () => {
    let { theme } = this.state;
    if (theme === 'light') {
        theme = 'dark';
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage['theme'] = 'dark';
    } else {
        theme = 'light';
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage['theme'] = 'light';
    }
    this.setState({ theme });
  }

  render() {
    return (
        <div className='App'>
          <Router>
           <Switch>
            <Route exact path='/'>
              <HomePage switchTheme={this.switchTheme} theme={this.state.theme} />
            </Route>
            <Route path='/:country'>
                <CountryInfo switchTheme={this.switchTheme} theme={this.state.theme} />
            </Route>
            </Switch>
           </Router>
        </div>
    )
  }
}

export default App;