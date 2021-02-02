import { faTint } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { graphql } from 'gatsby';
import React from 'react';
import { Button, Container, Icon } from 'semantic-ui-react';
import SectionBlog from '../components/Blog/blog';
import HeaderOverlay2Col from '../components/HeaderOverlay/header-overlay-2-col';
import Layout from '../components/Layout';
import SEO from '../components/seo';
import SpendenWidget from '../components/SpendenWidget/spenden-widget';
import Video from '../components/Video/video';
import withI18next from '../components/withI18next/withI18next';
import './index.less';
const HeaderImage = require('../../static/images/main.inline.svg') as string;

interface Props {
  t: any;
  pageContext: any;
  data: {
    site: {
      siteMetadata: {
        title: string;
        description: string;
      };
    };
    mobileImage: any;
    desktopImage: any;
  };
}

class Index extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const {
      pageContext: { locale },
      t,
    } = this.props;
    const data = this.props.data;

    return (
      <Layout title="WeWater. Wasser weltweit klarmachen. - WeWater.org" invertedHeader={false} t={t}>
        <SEO title="WeWater. Wasser weltweit klarmachen. - WeWater.org" />
        <HeaderOverlay2Col
          color="#ffffff"
          contentLeft={<OverlayContent />}
          contentRight={<Container text className="checkout-success-container">
            <HeaderImage></HeaderImage>
          </Container>}
        />
        <div className="global-header-padding">
          <Video></Video>
          <SectionBlog></SectionBlog>
          <SpendenWidget></SpendenWidget>
        </div>
      </Layout>
    )
  }
}


class OverlayContent extends React.Component<any, any> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { inverted } = this.props;

    return (
      <div>
        <h1
          className={`header-overlay-headline ${inverted ? 'header-overlay-headline-inverted' : null}`}
          style={{ marginBottom: '1.5rem' }}
        >
          WeWater. <br />
          Wasser weltweit klarmachen.
        </h1>
        <h2 className={`header-overlay-subheadline ${inverted ? 'header-overlay-subheadline-inverted' : null}`}
          style={{ marginBottom: '1.5rem', marginTop: '0rem' }}>
          <p>
            Trinkwasser ist ein Menschenrecht.
          </p>
          <p>
            Dennoch leiden weltweit 844 Millionen Menschen Durst oder erkranken an verschmutztem Wasser. Unsere Mission ist es, diesen Menschen durch sauberes Trinkwasser eine existentielle Lebensgrundlage zu ermöglichen.
          </p>
          <p>
            Dafür haben wir eine innovative Wasserfiltertechnologie entwickelt, die ohne den Einsatz von elektrischer Energie und Chemie funktioniert und einen extrem hohen Reinheitsgrad gewährleistet.
          </p>
          <p>
            Doch wir kämpfen nicht alleine – Jeder kann einen Beitrag leisten.
          </p>
          <p>
            Spende jetzt.
          </p>
        </h2>
        <a href="https://open.spotify.com/user/h6f9bbmz6bizjpie8iaecmmpy?si=FmJNBjQVQ_-OiLvraoI1jA" target="_blank">
          <Button primary className="shadow rounded hover-animate">
            <FontAwesomeIcon icon={faTint} style={{ opacity: '1', margin: '0em 0.42857143em 0em -0.21428571em' }} />
            Ich will helfen!
          </Button>
          <Button
            secondary={true}
            basic
            inverted={false}
            size="medium"
            className="rounded shadow hover-animate"
          >
            <Icon name="newspaper outline" className="left" style={{ opacity: '1' }}></Icon>
                            Alle News in mein Postfach
          </Button>
        </a>
      </div>
    );
  }
}

export const pageQuery = graphql`
    query {
        site {
            siteMetadata {
                title
                description
            }
        }
    }
`;
export default withI18next(['common'])(Index);