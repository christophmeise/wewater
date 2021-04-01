import React, { useEffect, useRef } from 'react';
import { Container, Grid, GridColumn } from 'semantic-ui-react';
import './video-overlay.less';

const VideoOverlay = ({ sourceMP4, sourceWebm, sourceOGV, content, darken = false, poster }) => {
    const videoParentRef: any = useRef();
    let vh = 100;
    const isSSR = typeof window === 'undefined';
    if (!isSSR) {
        vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);

        if (window.innerWidth <= 768) {
            sourceMP4 = sourceMP4 + '-mobile';
            sourceWebm = sourceWebm + '-mobile';
            sourceOGV = sourceOGV + '-mobile';
        }
    }

    useEffect(() => {
        // check if user agent is safari and we have the ref to the container <div />
        if (videoParentRef.current) {
            // obtain reference to the video element
            videoParentRef.current.setAttribute("muted", "");
            videoParentRef.current.defaultMuted = true;
        }
    }, []);


    return (
        <div className="header-overlay header-overlay-video">
            <video autoPlay loop muted={true} playsInline poster={poster} preload="meta" ref={videoParentRef}>
                <source src={sourceWebm + '.webm'} type="video/webm; codecs=vp8,vorbis"></source>
                <source src={sourceMP4 + '.mp4'} type="video/mp4; codecs=avc1.42E01E,mp4a.40.2"></source>
                <source src={sourceOGV + '.ogv'} type="video/ogg; codecs=theora,vorbis"></source>
                Video unsupported
            </video>
            <Container className="header-overlay-container header-overlay-container-absolute">
                <Grid className={`header-overlay-container-desktop responsive-desktop-container`}>
                    <GridColumn width={16}>
                        <div
                            data-sal="slide-down"
                            data-sal-delay="0"
                            data-sal-duration="300"
                            data-sal-easing="ease"
                        >
                            {content}
                        </div>
                    </GridColumn>
                </Grid>
                <div className={`responsive-mobile-container ${true ? 'header-overlay-container-mobile-top' : 'header-overlay-container-mobile'}`}>
                    <div
                        data-sal="slide-down"
                        data-sal-delay="0"
                        data-sal-duration="300"
                        data-sal-easing="ease"
                    >
                        {content}
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default VideoOverlay;
