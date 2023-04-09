import React, { Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon as solidMoon } from '@fortawesome/free-solid-svg-icons';
import { faMoon as regularMoon }  from '@fortawesome/free-regular-svg-icons';
import '../css/Header.css';

export default class Header extends Component {
    render() {
        const { theme, switchTheme } = this.props;
        return (
            <header className='header'>
                <p className='header__title'>where in the world?</p>
                <div className='theme-switch'  onClick={switchTheme}>
                    {
                        theme !== 'light' ?
                        <FontAwesomeIcon className='theme-switch__icon'  icon={solidMoon} />:
                        <FontAwesomeIcon ClassName='theme-switch__icon'  icon={regularMoon} />
                    }
                    <p className='theme-switch__text'>Dark Mode</p>
                </div>         
            </header>
        )
    }
}