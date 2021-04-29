import { GatsbyImage } from 'gatsby-plugin-image';
import React from 'react';
import { Container, Grid, GridColumn } from 'semantic-ui-react';
import './header-overlay.less';

const HeaderOverlayBlogPost = ({ sources, content }) => {
    return (
        <Container className="global-header-padding">
            <div className="header-overlay-blog-post">
                <div className="header-overlay-image-wrapper">
                    <GatsbyImage
                        image={sources}
                        objectPosition="top"
                        className="header-overlay-center-cropped dark-overlay-blog"
                        alt="Blog Hero Image"
                        loading="eager"
                    >
                    </GatsbyImage>
                    <Container className="header-overlay-container header-overlay-container-blog-post">
                        <div className="header-overlay-container-desktop-blog-post responsive-desktop-container" data-sal="slide-down"
                            data-sal-delay="0"
                            data-sal-duration="300"
                            data-sal-easing="ease">
                            {content}
                        </div>
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
                </div>
            </div>
        </Container>
    );
};

export default HeaderOverlayBlogPost;
