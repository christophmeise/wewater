import { Trans } from 'gatsby-plugin-react-i18next';
import React from 'react';
import { Container, Grid, GridColumn, Header } from 'semantic-ui-react';
import './video.less';

const Video = ({ }) => {
    return (
        <section className="main-section" style={{ padding: '3rem 0rem' }}>
            <Container>
                <Grid columns="2" stackable centered>
                    <GridColumn width="10">
                        <div className="embed-wrap rounded shadow">
                            <iframe
                                width="100%"
                                height="100%"
                                src="https://www.youtube.com/embed/zy1MzATrJkc"
                                className="yt-iframe-embed"
                                srcDoc="<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.5em black}</style><a href=https://www.youtube.com/embed/zy1MzATrJkc?autoplay=1><img src=images/hqdefault.jpg alt='WeWater Team Video'><span>▶</span></a>"
                                frameBorder="0"
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title="WeWater Team Video"
                            ></iframe>
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
