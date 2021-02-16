import BackgroundImage from 'gatsby-background-image';
import React from 'react';
import { Container, Grid, GridColumn } from 'semantic-ui-react';
import './header-overlay.less';

const HeaderOverlay = ({ sources, color, inverted, content, darken = false, width = 8 }) => {
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
                style={{
                    backgroundColor: color,
                }}
            >
                <div className="header-overlay-image-wrapper">
                    <BackgroundImage
                        Tag="section"
                        className={`header-overlay-center-cropped ${darken ? 'dark-overlay' : null}`}
                        fluid={sources}
                    >
                        <Container className="header-overlay-container">
                            <Grid className="header-overlay-container-desktop responsive-desktop-container">
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
                    </BackgroundImage>
                </div>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" className="header-overlay-svg" viewBox="0 80 1440 200">
                <path fill="#ffffff" fillOpacity="1" d="M0,192L80,181.3C160,171,320,149,480,144C640,139,800,149,960,144C1120,139,1280,117,1360,106.7L1440,96L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z">
                </path>
            </svg>
        </React.Fragment>
    );
};

export default HeaderOverlay;
