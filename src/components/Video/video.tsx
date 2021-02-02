import React from 'react';
import { Button, Container, Embed } from 'semantic-ui-react';
import './video.less';

const Video = ({ }) => {
    return (
        <article className="bg-secondary" style={{ padding: '3rem 0rem' }}>
            <Container textAlign="center" style={{ paddingBottom: '3rem' }}>
                <h1>Was ist WeWater</h1>
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
                    <Button primary inverted className="shadow rounded hover-animate">
                        <Button.Content>More Videos</Button.Content>
                    </Button>
                </a>
            </Container>
        </article>
    );
};

export default Video;
