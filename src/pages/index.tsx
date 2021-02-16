import { faTint } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { graphql, Link } from 'gatsby';
import React from 'react';
import { Button, Container, Icon } from 'semantic-ui-react';
import SectionBlog from '../components/Blog/blog';
import HeaderOverlay2Col from '../components/HeaderOverlay/header-overlay-2-col';
import Layout from '../components/Layout/Layout';
import { getPathWithLocale } from '../components/navigateWithLocale';
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
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 160 1440 160" style={{ marginBottom: "-0.5rem" }}>
            <path fill="#eff9fd" fill-opacity="1" d="M0,288L40,277.3C80,267,160,245,240,245.3C320,245,400,267,480,282.7C560,299,640,309,720,298.7C800,288,880,256,960,245.3C1040,235,1120,245,1200,234.7C1280,224,1360,192,1400,176L1440,160L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path>
          </svg>

          <Video></Video>
          <div className="background-primary donate-c2a-section">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#eff9fd" fill-opacity="1" d="M0,192L80,181.3C160,171,320,149,480,128C640,107,800,85,960,85.3C1120,85,1280,107,1360,117.3L1440,128L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path>
            </svg>
            <Container textAlign="center">
              <h3>Hilf jetzt mit deiner Spende.</h3>
              <h4>WeWater arbeitet ehrenamtlich sowie auf Spendenbasis. Daher sind wir auf finanzielle Hilfe angewiesen sind, um Wasserprojekte zu realisieren.</h4>
              <Link to={getPathWithLocale('/spenden')}>
                <Button primary inverted className="shadow rounded hover-animate">
                  <FontAwesomeIcon icon={faTint} style={{ opacity: '1', margin: '0em 0.42857143em 0em -0.21428571em' }} />
                Ich will helfen!
              </Button>
              </Link>

            </Container>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" style={{ marginBottom: "-0.5rem" }}>
              <path fill="#ffffff" fill-opacity="1" d="M0,192L80,181.3C160,171,320,149,480,144C640,139,800,149,960,144C1120,139,1280,117,1360,106.7L1440,96L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z">
              </path>
            </svg>
          </div>
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