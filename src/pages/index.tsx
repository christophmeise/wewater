import { faTint } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { graphql } from 'gatsby';
import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import SectionBlog from '../components/Blog/blog';
import SectionFiltersysteme from '../components/Filtersysteme/filtersysteme';
import HeaderOverlay from '../components/HeaderOverlay/header-overlay';
import Innovation from '../components/Innovation/innovation';
import Layout from '../components/Layout/Layout';
import SectionProjekte from '../components/Projekte/projekte';
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

    const sources = [
      data.mobileImage.childImageSharp.fluid,
      {
        ...data.desktopImage.childImageSharp.fluid,
        media: `(min-width: 768px)`,
      },
    ];

    return (
      <Layout title="WeWater. Wasser weltweit klarmachen. - WeWater.org" invertedHeader={false} t={t}>
        <SEO title="WeWater. Wasser weltweit klarmachen. - WeWater.org" />
        <HeaderOverlay
          sources={sources}
          color={'#FFFFFF'}
          inverted={false}
          content={<OverlayContent inverted={false} />}
          darken={false}
          width={10}
        />
        <div>
          <Video></Video>
          <Innovation></Innovation>
          <SectionFiltersysteme></SectionFiltersysteme>
          <SpendenWidget></SpendenWidget>
          <SectionBlog></SectionBlog>
          <SectionProjekte></SectionProjekte>
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
      <div className="main-overlay-content">
        <h1>
          WeWater.
        </h1>
        <h2>
          Wasser weltweit klarmachen.
        </h2>
        <p style={{ marginBottom: '1.5rem', marginTop: '0rem' }}>
          Dafür haben wir eine innovative Wasserfiltertechnologie entwickelt, die ohne den Einsatz von elektrischer Energie und Chemie funktioniert und einen extrem hohen Reinheitsgrad gewährleistet.
        </p>
        <div className="main-overlay-infobox rounded shadow">
          <div className="main-overlay-infobox-text">
            <h3>8.100</h3>
            <p>Menschen mit Trinkwasser versorgt</p>
          </div>
          <div>
            <Button primary className="shadow rounded">
              <FontAwesomeIcon icon={faTint} style={{ opacity: '1', margin: '0em 0.42857143em 0em -0.21428571em' }} />
            Ich will helfen!
          </Button>
            <Button
              secondary={true}
              basic
              inverted={true}
              size="medium"
              className="rounded shadow"
            >
              <Icon name="newspaper outline" className="left" style={{ opacity: '1' }}></Icon>
                            Alle News in mein Postfach
          </Button>
          </div>
        </div>
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
        desktopImage: file(relativePath: { eq: "images/main/main-banner.jpg" }) {
            childImageSharp {
                fluid(maxWidth: 1600, quality: 100) {
                    ...GatsbyImageSharpFluid_withWebp
                }
            }
        }
        mobileImage: file(relativePath: { eq: "images/main/main-banner-mobile.jpg" }) {
            childImageSharp {
                fluid(maxWidth: 1200, quality: 100) {
                    ...GatsbyImageSharpFluid_withWebp
                }
            }
        }
    }
`;
export default withI18next(['common'])(Index);