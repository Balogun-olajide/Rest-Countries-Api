import React, { useState, useEffect, useRef } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import CountryCard from '../../components/js/CountryCard';
import '../css/HomePage.css';



const HomePage = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const filterMenuRef = useRef(null);


  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(data => setCountries(data))
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    const handleDocumentClick =(e) => {
      if (filterMenuOpen && !filterMenuRef.current.contains(e.target)) {
       setFilterMenuOpen(false); 
    }
  };
 
  document.addEventListener('click', handleDocumentClick);

  return ()  => {
    document.removeEventListener('click', handleDocumentClick);
  };
  }, [filterMenuOpen]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (region) => {
    setSelectedRegion(region);
    setFilterMenuOpen(false);
  };

  const handleFilterMenuClick = () => {
    setFilterMenuOpen(!filterMenuOpen);
  };

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
        <div className='filter-menu' ref={filterMenuRef}>
          <div
            className='filter-menu__header'
            onClick={handleFilterMenuClick}
          >
            <span>Filter by Region</span>
            <FontAwesomeIcon
              className={`filter-menu__dropdown-icon ${
                 filterMenuOpen ? 'filter-menu__dropdown-icon--open' :'' 
              }`}
              icon={faAngleDown}
            />
          </div>
          { filterMenuOpen && (
            <div className='filter-menu__options'>
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
          )}
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

