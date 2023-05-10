import React from 'react';
import { useHistory } from 'react-router-dom';
import '../css/CountryCard.css';

const CountryCard = ({ flagUrl, countryName, population, region, capital }) => {
  const history = useHistory();

  const handleClick = () => {
    history.push(`/CountryInfo/${countryName}`);
  };

  return (
    <div className='country-card' onClick={handleClick}>
      <div className='country-flag' style={{backgroundImage: `url(${flagUrl})`}}>
      </div> 
      <div className='country-info'>
        <p className='country-name'>{countryName}</p>
        <div className='country-stats'>
          <p className='country-population country-stats__stat'>
            <span className='country-stats__title'>Population:</span>
            <span className='country-stats__value'>{population}</span>
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

export default CountryCard;
