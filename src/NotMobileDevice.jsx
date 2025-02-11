import React from 'react';
import Image from './notFound.png'
import './App.css';

const NotMobileDevice = () => {
    return (
        <div className='not-mobile'>
            <img src={Image} alt="" style={{ width: '100%', height: '200px', objectFit: 'contain' }} />
            <h2>To Play Games Please use a Mobile device</h2>
        </div>
    );
};

export default NotMobileDevice;

