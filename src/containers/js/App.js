import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Route, Switch, useHistory } from 'react-router-dom';
import Header from './Header';
import Search from './Search';
import CountryList from './CountryList';
import CountryDetail from './CountryDetail';
import '../css/App.css';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      const response = await axios.get('https://restcountries.com/v3.1/all');
      setCountries(response.data);
    };
    fetchCountries();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setSelectedCountry(null);
  };

  const handleSelectCountry = (country) => {
    setSelectedCountry(country);
    setSearchQuery('');
  };

  const handleClearSelection = () => {
    setSelectedCountry(null);
  };

  const filteredCountries = countries.filter((country) => {
    const name = country.name.common.toLowerCase();
    const query = searchQuery.toLowerCase();
    return name.includes(query);
  });

  return (
    <div className='app'>
      <Header />
      <Switch>
        <Route exact path='/'>
          <Search onSearch={handleSearch} query={searchQuery} />
          <CountryList
            countries={filteredCountries}
            onSelectCountry={handleSelectCountry}
          />
        </Route>
        <Route path='/:name'>
          <CountryDetail
            selectedCountry={selectedCountry}
            onClearSelection={handleClearSelection}
          />
        </Route>
      </Switch>
    </div>
  );
};

const CountryCard = ({ country }) => {
  const history = useHistory();

  const { name, flags, capital, population, region } = country;

  return (
    <div
      className='country-card'
      onClick={() => history.push(`/${name.common}`)}
    >
      <div
        className='country-flag'
        style={{ backgroundImage: `url(${flags.svg})` }}
      ></div>
      <div className='country-info'>
        <p className='country-name'>{name.common}</p>
        <div className='country-stats'>
          <p className='country-population country-stats__stat'>
            <span className='country-stats__title'>Population:</span>
            <span className='country-stats__value'>
              {population.toLocaleString()}
            </span>
          </p>
          <p className='country-region country-stats__stat'>
            <span className='country-stats__title'>Region:</span>
            <span className='country-stats__value'>{region}</span>
          </p>
          <p className='contry-capital country-stats__stat'>
            <span className='country-stats__title'>Capital:</span>
            <span className='country-stats__value'>{capital}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
