import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';
import { withRouter } from 'react-router-dom';
import Header from '../../components/js/Header';
import '../css/CountryInfo.css';
import Loader from '../../components/js/Loader';
import { Helmet } from 'react-helmet';

class CountryInfo extends Component {
    constructor() {
        super();
        this.state = {
            countryInfo: {},
            topLevelDomain: [],
            currencies: [],
            languages: [],
            countryBorders: [],
            loading: true
        }
    }

    componentDidMount() {
        const { country } = this.props.match.parmas;
        fetch('https://restcountries.com/v3.1/name/${country}?fullText=true')
        .then(res => res.json())
        .then(data => {
            let currencies = '';
            let languages = '';
            data[0].currencies.map(currency => currencies += `${currency.name},`);
            data[0].languages.map(language => languages += `${language.name},`);

            this.setState({
                countryInfo: data[0],
                topLevelDomain: data[0].topLevelDomain,
                currencies: currencies.slice(0, -2),
                languages: languages.slice(0, -2),
                loading: false
            });
            console.log(data)

            this.findCountryBorders(data[0].borders);
        })
        .catch(console.log);
        }
    }

    findCountryBorders = (borders) => {
        borders.forEach(border => {
            let { countryBorders } = this.state;
            fetch(`https://restcountries.eu/rest/v3.1/alpha/${border}`)
                 .then(res => res.json())
                 .then(data => {
                    countryBorders.push(data.name);
                    this.setState({ countryBorders });
                 })
        })
    }

    render() {
        const { flag, name, demonym, population, region, subregion, capital } = this.state.countryInfo;
        const { topLevelDomain, currencies, languages, countryBorders, loading } = this.state;
        const { switchTheme, theme } = this.props;
        return (
          <div className='country-info-page'>
                <Helmet>
                    <title>{`${name} - World Countries`}</title>
                    <meta 
                       name="description"
                       content={`Check out information about ${name}`}
                    />
                    <meta property='og:title' content={`${name} - world countries`} />
                    <meta property='og:description' content={`Check out information about ${name}`} />
                    <meta name='instagram:title' content={`${name} - World Countries`} />
                    <meta name='instagram:description' content={`Check out information about ${name}`} />
                </Helmet>


                <Header switchTheme={switchTheme} theme={theme} />
                    <div className='country-info-page__inner'>
                      <div className='back-button' onClick={() => this.props.history.push('/')}>
                        <FontAwesomeIcon className='back-button__icon' icon={faLongArrowAltLeft} />
                        <p className='back-button__text'>Back</p>
                      </div>
                    
                    {loading ? 
                        <Loader /> :
                        <div className='country-info-page__details'>
                           <div className='country-info-flag'>
                             <img src={flag} alt={`National flag of ${name}`} className='country-info-flag__image'/>
                            </div>
                            <div className='country-info-page__details-inner'>
                              <p className='country-info-name'>{name}</p>
                               <div className='country-details'>
                                 <div className='country-info-intro'>
                                  <p className='country-details__stat'>
                                     <span className='country-details__title'>Native Name:</span>
                                     <span className='country-details__value'>{dmonym}</span>
                                  </p>
                                  <p className='country-details__stats'>
                                    <span className='country-details__value'>Population :</span>
                                    <span className='country-details__value'>{population}</span>
                                  </p>
                                  <p className='country-details__stats'>
                                    <span className='country-details__value'>Region :</span>
                                    <span className='country-details__value'>{region}</span>
                                  </p>
                                  <p className='conuntry-details__stats'>
                                    <span className='country-details__value'>Sub Region :</span>
                                    <span className='country-details__value'>{subregion}</span>
                                  </p>
                                  <p className='country-details__stats'>
                                    <span className='country-details__value'>Capital</span>
                                    <span className='country-details__value'>{capital}</span>
                                  </p>
                                 </div>
                                </div>
                            </div>
                        </div>
                    }                   
            </div>
         </div>
     )
}



export default withRouter(CountryInfo);