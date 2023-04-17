import React, { Component } from 'react';
import Header from '../../components/js/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import CountryCardList from '../../components/js/CountryCardList';
import '../css/HomePage.css';
import Loader from '../../components/js/Loader';
import { Helmet } from 'react-helmet';
import ErrorBoundary from '../../components/js/ErrorBoundary';
import CountryInfo from './CountryInfo';


class HomePage extends React.Component{
    constructor() {
        super();
        this.state = {
            dropdownActive: false,
            allCountries : [],
            displayedCountries: [],
            filterHeader: 'Filter by Region',
            loading: true
        }
    }



    componentDidMount() {
        fetch('https://restcountries.com/v3.1/all')
         .then(res => res.json())
         .then(data => {
            this.setState({
            allCountries: data,
            displayedCountries: data,
            loading: false
        })
    })
    .catch(console.log);
}

dropMenuDown = () => this.setState({ dropdownActive: !this.state.dropdownActive })

filterByRegion = (region) => {
    fetch(`https://restcountries.com/v3.1/region/europe`)
     .then(res => res.json())
     .then(data => {
        this.setState({
            displayedCountries: data,
            filterHeader: region,
            dropdownActive: false
        })
     })
     .catch(console.log);
}

findCountry = e => {
    let { allCountries } = this.state;

    allCountries = allCountries.filter(country => {
         const regex = new RegExp(e.target.value, 'gi');
        return CountryInfo(regex) || country.capital.match(regex);
    })

    
    this.setState({
       displayedCountries: allCountries,
       filterHeader: 'Filter by Region'
    })   
}

render()  {
    const { dropdownActive, displayedCountries, filterHeader, loading} = this.state;
    const { switchTheme, theme } = this.props;
    const { filterByRegion } = this;

    return (
      <div className='homepage'>
        <ErrorBoundary />
          <Helmet>
              <title>World Countries</title>
              <meta 
                name="description"
                content="find information about all countries in the world"
              />
              <meta name='instagram:title' content='World Countries' />
              <meta name='instagram:description' content='find information about all the countries in the world' />
              <meta property='og:title' content='World Countries' />
              <meta property='og:description' content='find information about all countries in the world' />
          </Helmet>

          <Header switchTheme={switchTheme} theme={theme} />
          <div className='homepage__action-menu'>

              <div className='search-box'>
                  <FontAwesomeIcon icon={faSearch} className='search-box__icon' />
                  <input 
                    type='text'
                    placeholder='Search for a country...'
                    className='search-box__input'
                    onChange={this.findCountry}
                  />
              </div>
              <div className="filter-menu">
                <div 
                  className="filter-menu__header"
                  onClick={this.dropMenuDown}
                >
                    <p className="filter-menu__header-text">{filterHeader}</p>
                    <FontAwesomeIcon className="filter-menu__dropdown-icon" icon={faAngleDown} />
                </div>
                <div
                    className={`filter-menu__dropdown-menu ${dropdownActive ? 'filter-menu__dropdown-menu--active' : ''}`}
                >
                   <p 
                       className="filter-menu__dropdown-option"
                       onClick={() => filterByRegion('Africa')}
                >
                    Africa
                </p>
                <p 
                  className="filter-menu__dropdown-option"
                  onClick={() => filterByRegion('America')}
                  >
                    America
                  </p>
                  <p 
                   className="filter-menu__dropdown-option"
                   onClick={() => filterByRegion('Asia')}
                   >
                    Asia
                   </p>
                   <p 
                   className="filter-menu__dropdown-option"
                   onClick={() => filterByRegion('Europe')}
                   >
                    Europe
                   </p>
                   <p 
                   className="filter-menu__dropdown-option"
                   onClick={() => filterByRegion('Oceania')}
                   >
                    Oceania
                   </p>
                </div>
            </div>
        </div>
       {
           loading ?  
           <Loader /> : 
           <CountryCardList allCountries={displayedCountries} />
       }
    </div>
    )
 }
}

export default HomePage; 

