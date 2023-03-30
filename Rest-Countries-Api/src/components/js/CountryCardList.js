import React from 'react';
import CountryCard from './CountryCard';

const CountryCardList = ({ allcountries }) => {
    return (
        <div className='country-card-list'>
           {
              allcountries.map((country, i) => {
                 const { name, flag, population, capital, region} = country;
                  return <CountryCard key={i} countryName={name} countryFlag={flag} countryPopulation={population} countryCapital={capital} countryRegion={region} />
              })
           }
        </div>
    )
}

export default CountryCardList;