import React from 'react';
import './video-overlay.less';

const VideoOverlay = ({ sourceMP4, sourceWebm, sourceOGV, content, darken = false, poster }) => {
    let vh = 100;
    const isSSR = typeof window === 'undefined';
    if (!isSSR) {
        vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    return (
        <div className="header-overlay header-overlay-video">
            <video autoPlay loop muted playsInline poster={poster} preload="auto">
                <source src={sourceWebm} type="video/webm; codecs=vp8,vorbis"></source>
                <source src={sourceMP4} type="video/mp4; codecs=avc1.42E01E,mp4a.40.2"></source>
                <source src={sourceOGV} type="video/ogg; codecs=theora,vorbis"></source>
                Video unsupported
            </video>
        </div>
    );
};

export default VideoOverlay;
