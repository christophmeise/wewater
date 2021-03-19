import React from 'react';
import './video-overlay.less';

const VideoOverlay = ({ sources, content, darken = false, poster }) => {
    let vh = 100;
    const isSSR = typeof window === 'undefined';
    if (!isSSR) {
        vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    return (
        <div className="header-overlay header-overlay-video">
            <video autoPlay loop muted playsInline poster={poster}>
                <source src={sources} type="video/mp4"></source>
            </video>
        </div>
    );
};

export default VideoOverlay;
