import { Trans } from 'gatsby-plugin-react-i18next';
import React from 'react';
import { Container, Embed, Grid, GridColumn, Header } from 'semantic-ui-react';
import './video.less';

const Video = ({ }) => {
    return (
        <section className="main-section" style={{ padding: '3rem 0rem' }}>
            <Container>
                <Grid columns="2" stackable centered>
                    <GridColumn width="10">
                        <div>
                            <Embed
                                id="zy1MzATrJkc"
                                aspectRatio="16:9"
                                className="shadow rounded"
                                placeholder="images/hqdefault.jpg"
                                alt="youtube-image-placeholder"
                                source="youtube"
                                autoplay
                            />
                        </div>
                    </GridColumn>
                    <GridColumn width="6">
                        <Header
                            data-sal="slide-up"
                            data-sal-delay="0"
                            data-sal-duration="300"
                            data-sal-easing="ease"
                            textAlign='left'
                            className="global-flex-column global-no-margin"
                        >
                            <h3 className={`global-subtitle text-primary`}><Trans>Jeder kann einen Beitrag leisten</Trans></h3>
                            <h2 className="global-headline"><Trans>Trinkwasser ist ein Menschenrecht.</Trans></h2>
                        </Header>
                        <h5>
                            <Trans>
                                Dennoch leiden weltweit 844 Millionen Menschen Durst oder erkranken an verschmutztem Wasser.
                                Unsere Mission ist es, diesen Menschen durch sauberes Trinkwasser eine existentielle Lebensgrundlage zu ermöglichen.
                            </Trans>
                        </h5>
                    </GridColumn>
                </Grid>
            </Container>
        </section>
    );
};

export default Video;
