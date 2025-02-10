import React from 'react';
import Image from './notFound.jpg'

const NotMobileDevice = () => {
    return (
        <div style={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img src={Image} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </div>
    );
};

export default NotMobileDevice;

