import React from 'react';
import { Container, Grid, GridColumn } from 'semantic-ui-react';
import './header-overlay.less';

const HeaderOverlay2Col = ({ color, contentLeft, contentRight, darken = false }) => {
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
            <Container className="header-overlay-container">
                <Grid className="header-overlay-container-desktop responsive-desktop-container">
                    <GridColumn width={9}>
                        <div
                            data-sal="slide-down"
                            data-sal-delay="0"
                            data-sal-duration="300"
                            data-sal-easing="ease"
                        >
                            {contentLeft}
                        </div>
                    </GridColumn>
                    <GridColumn width={7} verticalAlign="middle">
                        <div
                            data-sal="slide-down"
                            data-sal-delay="0"
                            data-sal-duration="300"
                            data-sal-easing="ease"
                        >
                            {contentRight}
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
                        {contentLeft}
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default HeaderOverlay2Col;
