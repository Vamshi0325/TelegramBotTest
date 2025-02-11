import React, { useEffect, useState } from 'react';
import NotMobileDevice from './NotMobileDevice';
import ShareCopyButtons from './ShareCopyButtons';

const Home = () => {
    // Initialize states as null so we know the checks are pending.
    const [isMobile, setIsMobile] = useState(null);
    const [isDevToolsOpen, setIsDevToolsOpen] = useState(null);

    useEffect(() => {
        // Check for devtools presence at intervals.
        let attempts = 0;
        const detect = setInterval(() => {
            attempts++;
            const threshold = 160;
            const widthThreshold = window.outerWidth - window.innerWidth > threshold;
            const heightThreshold = window.outerHeight - window.innerHeight > threshold;

            // Use a debugger call to simulate a check; delays may indicate devtools are open.
            let opened = false;
            const start = performance.now();
            debugger; // If devtools are open, this might cause a noticeable delay.
            const duration = performance.now() - start;
            if (duration > 100) {
                opened = true;
            }

            if (widthThreshold || heightThreshold || opened) {
                setIsDevToolsOpen(true);
                clearInterval(detect);
            } else if (attempts >= 3) {
                // After a few attempts (~1.5 seconds), assume devtools are closed.
                setIsDevToolsOpen(false);
                clearInterval(detect);
            }
        }, 500);

        return () => clearInterval(detect);
    }, []);

    useEffect(() => {
        // Only check for mobile if we know devtools are closed.
        if (isDevToolsOpen === false) {
            const mobile = /Android|iPhone/i.test(navigator.userAgent);
            setIsMobile(mobile);
        }
    }, [isDevToolsOpen]);

    // Display a centered loader while checks are pending.
    if (isDevToolsOpen === null || (isDevToolsOpen === false && isMobile === null)) {
        return (
            <div className="loader-container">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden" style={{ color: 'white', border: '3px solid white' }}>Loading...</span>
                </div>
            </div>
        );
    }

    // If devtools are open OR it's not a mobile device, show the fallback UI.
    if (isDevToolsOpen || !isMobile) {
        return <NotMobileDevice />;
    }

    // Only when devtools are closed AND the device is mobile, render the homepage.
    return (
        <div className="homepage container text-center mt-4">
            <h2>Welcome to the Homepage</h2>
            <p>You are viewing this app on a mobile device.</p>
            <ShareCopyButtons />
        </div>
    );
};

export default Home;
