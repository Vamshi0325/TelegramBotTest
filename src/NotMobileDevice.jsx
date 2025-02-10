import React from 'react';
import Image from './notFound.png'

const NotMobileDevice = () => {
    return (
        <div style={{ background: "linear-gradient(to bottom, #000428, #004e92", width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <img src={Image} alt="" style={{ width: '100%', height: '200px', objectFit: 'contain' }} />
            <h2 style={{ color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px 20px', textAlign: 'center', }}>Play Games On Mobile</h2>
        </div>
    );
};

export default NotMobileDevice;

