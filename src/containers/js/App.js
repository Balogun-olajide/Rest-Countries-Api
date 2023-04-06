import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CountryInfo from './CountryInfo';
import MainPage from './MainPage';

export default class App extends Component {
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
        document.documentElement.setAttribute('date-theme', 'light');
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
              <MainPage switchTheme={this.switchTheme} theme={this.state.theme} />
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