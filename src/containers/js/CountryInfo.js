import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import '../css/CountryInfo.css';


const CountryInfo = () => {
  const [countryData, setCountryData] = useState(null);
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/name/${id}`)
      .then(res => setCountryData(res.data[0]))
      .catch(err => console.log(err));
  }, [id]);

  const handleBorderCountryClick = (border) => {
    history.push(`/CountryInfo/${border}`);
  };

  if (!countryData) {
    return <div>Loading...</div>;
  }

  const { 
    name,
    flags,
    population,
    region,
    subregion,
    capital,
    topLevelDomain,
    currencies,
    languages,
    borders,
  } = countryData;

  return (
    <div className="country-info">
      <div className="country-info-header">
        <Link to="/">
        <button className="back-button">
        <FontAwesomeIcon icon={faArrowLeft} />
        Back
          </button>
        </Link>
      </div>
      <div className="country-info-body">
        <div className="flag-container">
          <img src={flags.png} alt={`${name.common} flag` } className='flag-container__image' />
        </div>
        <div className="info-container">
          <h1>{name.common}</h1>
          <div className="country-info-details">
            <div className="country-info-column">
              <p><strong>Native Name:</strong> {name.nativeName?.common || 'N/A'}</p>
              <p><strong>Population:</strong> {population}</p>
              <p><strong>Region:</strong> {region}</p>
              <p><strong>Sub Region:</strong> {subregion}</p>
              <p><strong>Capital:</strong> {capital}</p>
            </div>
            <div className="country-info-extra">
              <p><strong>Top Level Domain:</strong> {topLevelDomain?.[0] || 'N/A'}</p>
              <p><strong>Currencies:</strong> {Object.values(currencies).map(currency => currency.name).join(', ')}</p>
              <p><strong>Languages:</strong> {Object.values(languages)?.map(language => language.name).join(', ') || 'N/A'}</p>
            </div>
          </div>
          <div className="country-border">
            <p className="country-border__header"><strong>Border Countries:</strong></p>
            <div className="country-border__countries">
              {borders && borders.length > 0 ? (
                borders.map((border, i) => (
                  <p
                    className="country-border__country"
                    key={i}
                    onClick={() => handleBorderCountryClick(border)}
                  >
                    {border}
                  </p>
                ))
              ) : (
                <p>No border countries</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryInfo;