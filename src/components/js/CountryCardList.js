import React from 'react';
import CountryCard from './CountryCard';
import '../css/CountryCardList.css';
import { useState, useEffect } from 'react';

const CountryCardList= () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())
    .then(data => setCountries(data))
    .catch(error => console.log(error));
  }, []);
  console.log(countries);
  return (
    <div className='country-card-list'> 
      {countries.map((country, i) => {
        const { name, flags, population, capital, region } = country;
      return (
        <CountryCard 
         key={i}
         countryName={name.common}
         flagUrl= {flags.svg}
         population={population}
         capital={capital && capital[0]}
         region={region}
        />
      );
      })}
    </div>
  );
};

export default CountryCardList;