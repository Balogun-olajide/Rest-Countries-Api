import React, { useState, useEffect } from 'react';
import CountryCard from '../../components/js/CountryCard';
import '../css/HomePage.css';
import Header from '../../components/js/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faAngleDown } from '@fortawesome/free-solid-svg-icons';

const HomePage = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(data => setCountries(data))
      .catch(error => console.log(error));
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  }

  const handleFilterChange = (region) => {
    setSelectedRegion(region);
    setFilterMenuOpen(false);
  }

  const filteredCountries = countries.filter((country) => {
    const name = country.name.common.toLowerCase();
    const region = country.region.toLowerCase();
    const searchTermLower = searchTerm.toLowerCase();
    const selectedRegionLower = selectedRegion.toLowerCase();
    return (
      (name.includes(searchTermLower) || region.includes(searchTermLower)) &&
      (selectedRegionLower === '' || region.includes(selectedRegionLower))
    );
  });

  return (
    <div className='homepage'>
     <Header onClick={() => setFilterMenuOpen(!filterMenuOpen)}/>
      <div className='homepage__action-menu'>
        <div className='search-box'>
          <i className='fas fa-search search-box__icon'></i>
          <FontAwesomeIcon icon={faSearch} className='search-box__icon' />
          <input
            className='search-box__input'
            type='text'
            placeholder='Search for a country...'
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className='filter-menu'>
          <div className='filter-menu__header' onClick={() => setFilterMenuOpen(!filterMenuOpen)}>
            <span>Filter by Region</span>
            <FontAwesomeIcon className="filter-menu__dropdown-icon" icon={faAngleDown} />
          </div>
          <div
            className={`filter-menu__dropdown-menu ${
              selectedRegion && 'filter-menu__dropdown-menu--active'
            } ${filterMenuOpen ? 'filter-menu__dropdown-menu--open' : ''}`}
          >
            <div
              className='filter-menu__dropdown-option'
              onClick={() => handleFilterChange('africa')}
            >
              Africa
            </div>
            <div
              className='filter-menu__dropdown-option'
              onClick={() => handleFilterChange('americas')}
            >
              Americas
            </div>
            <div
              className='filter-menu__dropdown-option'
              onClick={() => handleFilterChange('asia')}
            >
              Asia
            </div>
            <div
              className='filter-menu__dropdown-option'
              onClick={() => handleFilterChange('europe')}
            >
              Europe
            </div>
            <div
              className='filter-menu__dropdown-option'
              onClick={() => handleFilterChange('oceania')}
            >
              Oceania
            </div>
          </div>
        </div>
      </div>
      <div className='country-card-list'>
        {filteredCountries.map((country, i) => {
          const { name, flags, population, capital, region } = country;
          return (
            <CountryCard 
              key={i}
              countryName= {name.common}
              flagUrl={flags.png}
              population={population}
              capital={capital && capital[0]}
              region={region}
            />
          );
        })}
      </div>
    </div>
  );
};

export default HomePage;

