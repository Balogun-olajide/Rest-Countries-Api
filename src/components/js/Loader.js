import React from 'react';
import LoaderIcon from '../../assets/loader.png';
import '../css/Loader.css';

export default function Loader() {
    return (
        <div className='loader-icon'>
            <img className='loader-icon__image' src={LoaderIcon} alt='loader icon' />
        </div>
    )
}
