import React, { useEffect, useState } from 'react';
import NotMobileDevice from './NotMobileDevice';

const Home = () => {

    const [isMobile, setIsMobile] = useState(null);
    const [isDevToolsOpen, setIsDevToolsOpen] = useState(false); // Detect devtools

    useEffect(() => {
        // Detect if devtools is open
        const detectDevTools = () => {
            const detect = setInterval(() => {
                const threshold = 160;
                const widthThreshold = window.outerWidth - window.innerWidth > threshold;
                const heightThreshold = window.outerHeight - window.innerHeight > threshold;

                // Check for devtools using debugger
                let opened = false;
                const devtoolsCheck = () => {
                    const start = performance.now();
                    debugger; // This will trigger extra execution time if devtools is open
                    const duration = performance.now() - start;
                    if (duration > 100) {
                        opened = true;
                    }
                };
                devtoolsCheck();

                if (widthThreshold || heightThreshold || opened) {
                    setIsDevToolsOpen(true);
                    clearInterval(detect);
                }
            }, 450);

            return () => clearInterval(detect);
        };

        detectDevTools();
    }, []);

    useEffect(() => {
        // Perform mobile check only after devtools check is complete
        if (isDevToolsOpen === false) {
            const mobile = /Android|iPhone/i.test(navigator.userAgent);
            setIsMobile(mobile);
        }
    }, [isDevToolsOpen]);

    if (isDevToolsOpen === null || (isDevToolsOpen === false && isMobile === null)) {
        return null; // Wait until devtools and mobile checks are complete
    }

    if (isDevToolsOpen || !isMobile) {
        return <NotMobileDevice />; // Render fallback UI if devtools are open or not mobile
    }

    return (
        <div>
            {isMobile ? (
                <>
                    <h1>Welcome to the Homepage</h1>
                    <p>You are viewing this app on a mobile device.</p>
                </>
            ) : null}
        </div>
    );
};

export default Home;
