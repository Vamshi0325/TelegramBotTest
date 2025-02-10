import React, { useEffect, useState } from 'react';
import NotMobileDevice from './NotMobileDevice';
import './App.css';

const Home = () => {
    // Start with null states to indicate "checking in progress"
    const [isMobile, setIsMobile] = useState(null);
    const [isDevToolsOpen, setIsDevToolsOpen] = useState(null);

    useEffect(() => {
        // DevTools detection logic
        const detectDevTools = () => {
            const detect = setInterval(() => {
                const threshold = 160;
                const widthThreshold = window.outerWidth - window.innerWidth > threshold;
                const heightThreshold = window.outerHeight - window.innerHeight > threshold;

                let opened = false;
                const devtoolsCheck = () => {
                    const start = performance.now();
                    debugger; // This can affect performance if devtools are open
                    const duration = performance.now() - start;
                    if (duration > 100) {
                        opened = true;
                    }
                };
                devtoolsCheck();

                // If any condition matches, devtools are open; otherwise, they're not.
                if (widthThreshold || heightThreshold || opened) {
                    setIsDevToolsOpen(true);
                    clearInterval(detect);
                } else {
                    setIsDevToolsOpen(false);
                    clearInterval(detect);
                }
            }, 450);
        };

        detectDevTools();
    }, []);

    useEffect(() => {
        // Only check for mobile if devtools are confirmed as not open
        if (isDevToolsOpen === false) {
            const mobile = /Android|iPhone/i.test(navigator.userAgent);
            setIsMobile(mobile);
        }
    }, [isDevToolsOpen]);

    // Display a loader while we're still checking for devtools/mobile status
    if (isDevToolsOpen === null || (isDevToolsOpen === false && isMobile === null)) {
        return (
            <div style={{
                width: '100%',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
            }}>
                <div className="loader"></div>
            </div>
        );
    }

    // If devtools are open or the device isn't mobile, show the fallback UI.
    if (isDevToolsOpen || !isMobile) {
        return <NotMobileDevice />;
    }

    // Otherwise, render your awesome mobile homepage.
    return (
        <div style={{
            background: "linear-gradient(to bottom, #000428, #004e92)",
            width: '100%',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <h2>Welcome to the Homepage</h2>
            <p>You are viewing this app on a mobile device.</p>
        </div>
    );
};

export default Home;
