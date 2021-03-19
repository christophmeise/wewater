import Image from 'gatsby-image';
import React from 'react';
import { Container, Grid, GridColumn } from 'semantic-ui-react';
import './header-overlay.less';

const HeaderOverlay = ({ sources, inverted, content, darken = false, width = 8, floatRight = false }) => {
    let vh = 100;
    const isSSR = typeof window === 'undefined';
    if (!isSSR) {
        vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    return (
        <React.Fragment>
            <div
                className="header-overlay"
            >
                <div className={`header-overlay-image-wrapper`}>
                    <Image
                        fluid={sources}
                        className={`header-overlay-center-cropped ${darken && 'dark-overlay-blog'}`}
                        alt="Gatsby Docs are awesome"
                        critical={true}
                    >
                        {/*                     <BackgroundImage
                        Tag="section"
                        className={`header-overlay-center-cropped ${darken && 'dark-overlay-blog'}`}
                        fluid={sources}

                    > */}
                        {/*  </BackgroundImage> */}
                    </Image>
                    <Container className="header-overlay-container header-overlay-container-absolute">
                        <Grid className={`header-overlay-container-desktop responsive-desktop-container ${floatRight ? 'justifyContentEnd' : ''}`}>
                            <GridColumn width={width}>
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
                        <div className="header-overlay-container-mobile responsive-mobile-container">
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
                <svg className="header-overlay-svg" viewBox="0 0 1440 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#ffffff" fillOpacity="1" fillRule="evenodd" clipRule="evenodd" d="M1440 90.8571L1380 98.4286C1320 106 1200 121.143 1080 113.571C960 106 840 75.7143 720 71.9286C600 68.1429 480 90.8571 360 83.2857C240 75.7143 120 37.8571 60 18.9286L0 0V159H60C120 159 240 159 360 159C480 159 600 159 720 159C840 159 960 159 1080 159C1200 159 1320 159 1380 159H1440V90.8571Z" />
                </svg>
            </div>
        </React.Fragment >
    );
};

export default HeaderOverlay;
