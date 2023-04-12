import React from 'react';
import CountryCard from './CountryCard';
import '../css/CountryCardList.css';

const CountryCardList = ({ allcountries }) => {
  if (!allcountries || allcountries.length === 0) {
    return <div>No countries to display</div>;
  }

  return (
    <div className='country-card-list'>
      {allcountries.map((country, i) => {
        const { name, flag, population, capital, region } = country;
        const nameString = name.toString(); // Convert name to string
        const matches = nameString.match(/searchPattern/); // Call match on string

        return (
          <CountryCard
            key={i}
            countryName={name}
            countryFlag={flag}
            countryPopulation={population}
            countryCapital={capital}
            countryRegion={region}
            matches={matches}
          />
        );
      })}
    </div>
  );
};

export default CountryCardList;
