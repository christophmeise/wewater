import BackgroundImage from 'gatsby-background-image';
import React from 'react';
import { Container, Grid, GridColumn } from 'semantic-ui-react';
import './header-overlay.less';

const HeaderOverlayBlog = ({ sources, color, inverted, content }) => {
    return (
        <div
            className="header-overlay-blog"
        >
            <div className="header-overlay-image-wrapper">
                <BackgroundImage Tag="section" className="header-overlay-center-cropped dark-overlay-blog" fluid={sources}>
                    <Container className="header-overlay-container header-overlay-container-blog">
                        <Grid className="header-overlay-container-desktop-blog responsive-desktop-container" textAlign="left">
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
                        <Grid className="header-overlay-container-mobile responsive-mobile-container">
                            <GridColumn>
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
                    </Container>
                </BackgroundImage>
            </div>
        </div>
    );
};

export default HeaderOverlayBlog;
