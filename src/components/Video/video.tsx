import React from 'react';
import { Button, Container, Embed, Header } from 'semantic-ui-react';
import './video.less';

const Video = ({ }) => {
    return (
        <article className="bg-secondary" style={{ padding: '3rem 0rem' }}>
            <Container textAlign="center">
                <Header
                    data-sal="slide-up"
                    data-sal-delay="0"
                    data-sal-duration="300"
                    data-sal-easing="ease"
                    textAlign='center'
                    className="global-flex-column global-no-margin"
                >
                    <h3 className={`global-subtitle text-primary`}>Was ist WeWater</h3>
                    <h2 className="global-headline">WeWater. Wasser weltweit klarmachen.</h2>
                </Header>
            </Container>
            <Container>
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
            </Container>
            <Container textAlign="center" style={{ paddingTop: '3rem' }}>
                <a href="https://www.youtube.com/channel/UCfpN0cGzebluj7aYa-6IhtQ" target="_blank">
                    <Button primary className="shadow rounded hover-animate">
                        <Button.Content>Mehr Videos</Button.Content>
                    </Button>
                </a>
            </Container>
        </article>
    );
};

export default Video;
