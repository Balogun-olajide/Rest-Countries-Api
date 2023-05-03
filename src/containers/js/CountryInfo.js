import React, { useState, useEffect  } from 'react';
import '../css/CountryInfo.css';
import { Link } from 'react-router-dom';

function CountryInfo(props) {
    const [countryData, setCountryData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchCountryData() {

            try {
                const response = await fetch(`https://restcountries.com/v3.1/name/${props.match.params.country}`);
                const data = await response.json();
                if (data.length > 0) {
                    setCountryData(data[0]);
                }  else {
                    setError('no data found for the specified country.');
                }
            }  catch (error)  {
                setError(Error.message);
            }
        }
             fetchCountryData();
    }, [props.match.parmas.country]);

    if (error) {
        return <div>Error: {error}</div>
    }

    if (!countryData) {
        return null;
    }

    const { name, capital, population, region, subregion, languages, curriencies, borders, flags, tld, nativeName } = countryData;
   
    return( 
        <div className="country-info"> 
          <link to="/" className="back-button">
            &lt; Back
          </link>
        <h1>{name.common}</h1>
        <div className="info">
            <div className="left-column">
                <img src={flags.svg} alt={`${name.common} flag`} />
            </div>
            <div className="right-column">
              <p>
                <strong>Native Name: </strong>
                {nativeName.common}
              </p>
              <p>
                <strong>Population: </strong>
                 {population?.toLocaleString()}
              </p>
              <p> 
              <strong>Region: </strong>
               {region}
              </p>
              <p> 
              <strong>Subregion: </strong>
               {subregion}
              </p>
              <p> 
              <strong>Capital: </strong>
               {capital}
              </p>
              {tld && (
                <p> 
                  <strong>Border Countries: </strong>
                  {borders.map((border) => (
                    <Link key={border} to={`/country/${border}`}>
                        {border}
                    </Link>
              ))}
            </p>
              )}
              {languages && (
                <p>
                    <strong>Languages:</strong>
                    {object.values(languages).join('.')}
                </p>
              )}
              {curriencies && (
                <p> 
                <strong>Curriencies:</strong>
                {object.values(currencies)
                .map((currency)  => `${currency.name} (${currency.symbol})`)
                .join(',')}
                </p>
              )}
            </div>
        </div>
    </div>
    );
}
  
export default CountryInfo;
