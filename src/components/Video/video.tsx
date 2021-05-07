import { Trans } from 'gatsby-plugin-react-i18next';
import React from 'react';
import { Container, Grid, GridColumn, Header } from 'semantic-ui-react';
import './video.less';

const Video = ({ t }) => {
    return (
        <section className="main-section">
            <Container>
                <Grid columns="2" stackable centered>
                    <GridColumn width="10">
                        <div className="embed-wrap rounded shadow">
                            <iframe
                                width="100%"
                                height="100%"
                                src="https://www.youtube.com/embed/zy1MzATrJkc"
                                className="yt-iframe-embed"
                                srcDoc="<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}
                                img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto;}
                                span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.5em black;
                                 display                : flex;
                                align-items            : center;
                                justify-content        : center;
                                height                 : 115px;
                                width                  : 115px;
                                background             : rgba(255, 255, 255, 0.2);
                                -webkit-backdrop-filter: saturate(180%) blur(20px) !important;
                                backdrop-filter        : saturate(180%) blur(20px) !important;
                                border-radius          : 50%;
                                transform              : translateX(-50%);
                                left                   : 50%;
                                transition: 0.3s ease;}
                                svg {
                                    height: 55px;
                                    width: 55px;
                                }
                                @media only screen and (max-width: 500px) {
                                    span {
                                        height                 : 60px;
                                        width                  : 60px;
                                    }
                                    svg {
                                    height: 30px;
                                    width: 30px;
                                }
                                }
                                span:hover{
                                    background-color: rgb(90, 190, 230, 0.8);
                                }</style><a href=https://www.youtube.com/embed/zy1MzATrJkc?autoplay=1><img src=/images/video_placeholder.webp alt='WeWater Team Video'><span class='play-icon'>
                                <svg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px'
	 viewBox='0 0 330 330' style='margin-left: 5px; fill:  #ffffff;' xml:space='preserve'>
<path id='XMLID_308_' d='M37.728,328.12c2.266,1.256,4.77,1.88,7.272,1.88c2.763,0,5.522-0.763,7.95-2.28l240-149.999
	c4.386-2.741,7.05-7.548,7.05-12.72c0-5.172-2.664-9.979-7.05-12.72L52.95,2.28c-4.625-2.891-10.453-3.043-15.222-0.4
	C32.959,4.524,30,9.547,30,15v300C30,320.453,32.959,325.476,37.728,328.12z'/>
</svg>
                                </span></a>"
                                frameBorder="0"
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                loading="lazy"
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
                            <h3 className={`global-subtitle text-primary`}><Trans>Für einen fairen Zugang zu Wasser</Trans></h3>
                            <h2 className="global-headline">
                                {t('Trinkwasser ist ein Menschenrecht.')}
                            </h2>
                        </Header>
                        <h4>
                            <Trans>
                                Dennoch leiden weltweit 2,2 Milliarden Menschen Durst oder erkranken an verschmutztem Wasser.
                                Unsere Mission ist es, diesen Menschen durch sauberes Trinkwasser eine existentielle Lebensgrundlage zu ermöglichen.
                            </Trans>
                        </h4>
                    </GridColumn>
                </Grid>
            </Container>
        </section>
    );
};

export default Video;
