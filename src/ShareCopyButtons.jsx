import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';

const ShareCopyButtons = () => {
    const url = "https://telegram-bot-rosy-six.vercel.app";

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: 'Check this out!',
                text: 'Hey, check out this awesome link:',
                url,
            })
                .then(() => console.log('Shared successfully'))
                .catch((error) => console.error('Error sharing', error));
        } else {
            alert('Share API is not supported in your browser.');
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(url)
            .then(() => alert('Copied to clipboard!'))
            .catch((error) => console.error('Error copying text: ', error));
    };

    return (
        <ButtonGroup className="mt-3">
            <Button variant="primary" onClick={handleShare}>Share</Button>
            <Button variant="secondary" onClick={handleCopy}>Copy Link</Button>
        </ButtonGroup>
    );
};

export default ShareCopyButtons;
