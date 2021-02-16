import React from 'react';
import './video-overlay.less';

const VideoOverlay = ({ sources, content, darken = false }) => {
    let vh = 100;
    const isSSR = typeof window === 'undefined';
    if (!isSSR) {
        vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    return (
        <div className="header-overlay">
            <video autoPlay loop muted playsInline>
                <source src={sources} type="video/mp4"></source>
            </video>
        </div>
    );
};

export default VideoOverlay;
