import React, { Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon as solidMoon } from '@fortawesome/free-solid-svg-icons';
import { faMoon as regularMoon }  from '@fortawesome/free-regular-svg-icons';
import '../css/Header.css';

class Header extends Component {
    constructor(props) {
        super(props); 
        this.state = {
            theme: 'light'
        }
    }


        toggleTheme = () => {
            const newTheme = this.state.theme === 'light' ? 'dark' : 'light';
            this.setState({ theme: newTheme });

            //update body class
            document.body.classList.remove(this.state.theme);
            document.body.classList.add(newTheme);
         }

         render() {
            return (
                <header className='header'>
                    <p className='header__title'>Where in the world?</p>
                    <div className='theme-switch'  onClick={this.toggleTheme}>
                        {
                            this.state.theme !== 'light' ?
                            <FontAwesomeIcon className='theme-switch__icon'  icon={solidMoon} />:
                            <FontAwesomeIcon className='theme-switch__icon'  icon={regularMoon} />
                        }
                        <p className='theme-switch__text'>Dark Mode</p>
                    </div>         
                </header>
            )
         }
    }

       
export default Header;