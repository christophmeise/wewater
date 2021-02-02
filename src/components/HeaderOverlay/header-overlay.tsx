import BackgroundImage from 'gatsby-background-image';
import React from 'react';
import { Container, Grid, GridColumn } from 'semantic-ui-react';
import './header-overlay.less';

const HeaderOverlay = ({ sources, color, inverted, content, darken = false }) => {
    let vh = 100;
    const isSSR = typeof window === 'undefined';
    if (!isSSR) {
        vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    return (
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
                            <GridColumn width={8}>
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
    );
};

export default HeaderOverlay;
