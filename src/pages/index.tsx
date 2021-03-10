// i18next-extract-mark-ns-start page_landing
import { faTint } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { graphql } from 'gatsby';
import { Trans } from 'gatsby-plugin-react-i18next';
import React from 'react';
import CountUp from 'react-countup';
import { Button, Icon } from 'semantic-ui-react';
import SectionBlog from '../components/Blog/blog';
import SectionFiltersysteme from '../components/Filtersysteme/filtersysteme';
import HeaderOverlay from '../components/HeaderOverlay/header-overlay';
import Innovation from '../components/Innovation/innovation';
import Layout from '../components/Layout/Layout';
import SectionProjekte from '../components/Projekte/projekte';
import SEO from '../components/seo';
import SpendenWidget from '../components/SpendenWidget/spenden-widget';
import { useTranslationHOC } from '../components/useTranslationHOC/useTranslationHOC';
import Video from '../components/Video/video';
import './index.less';

interface Props {
  t: any;
  data: {
    mobileImage: any;
    desktopImage: any;
  };
}

interface State {
  slidesPerView: number;
}

class Index extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      slidesPerView: 5
    };
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', this.calculateSlidesPerView.bind(this), false);
    }
    this.calculateSlidesPerView();
  }
  componentWillUnmount() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.calculateSlidesPerView);
    }
  }

  calculateSlidesPerView() {
    const isSSR = typeof window === 'undefined';
    let slidesPerView = 5;
    if (!isSSR) {
      if (window.innerWidth < 768) {
        slidesPerView = 1;
      } else if (window.innerWidth < 1200) {
        slidesPerView = 3;
      } else {
        slidesPerView = 5;
      }
    }
    this.setState({ slidesPerView: slidesPerView });
  }


  render() {
    const { t, data } = this.props;

    const sources = [
      data.mobileImage.childImageSharp.fluid,
      {
        ...data.desktopImage.childImageSharp.fluid,
        media: `(min-width: 768px)`,
      },
    ];

    const slidesPerView = this.state != null ? this.state.slidesPerView : 5;
    const darken = typeof window !== 'undefined' && (window.innerWidth <= 768);

    return (
      <Layout invertedHeader={false}>
        <SEO title={t('LandingpageSEOTitle')} description={t('LandingpageSEODescription')} />
        <HeaderOverlay
          sources={sources}
          color={'#FFFFFF'}
          inverted={false}
          content={<OverlayContent inverted={false} />}
          darken={darken}
          width={10}
        />
        <div>
          <Video></Video>
          <Innovation></Innovation>
          <SectionFiltersysteme></SectionFiltersysteme>
          <SpendenWidget fullMode={false}></SpendenWidget>
          <SectionBlog slidesPerView={slidesPerView}></SectionBlog>
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
    const { inverted, t } = this.props;

    return (
      <div className="main-overlay-content">
        <h1>
          WeWater.
        </h1>
        <h2>
          <Trans>Wasser weltweit klarmachen.</Trans>
        </h2>
        <p style={{ marginBottom: '1.5rem', marginTop: '0rem' }}>
          <Trans>Dafür haben wir eine innovative Wasserfiltertechnologie entwickelt, die ohne den Einsatz von elektrischer Energie und Chemie funktioniert und einen extrem hohen Reinheitsgrad gewährleistet.</Trans>
        </p>
        {typeof window != 'undefined' && window.innerWidth > 767 &&
          <div className="main-overlay-infobox rounded">
            <div className="main-overlay-infobox-text">
              <h3><CountUp delay={0.5} end={8100} start={0} separator="." duration={4}></CountUp></h3>
            </div>
            <p><Trans>Menschen mit Trinkwasser versorgt</Trans></p>
            <div>
              <Button primary className="rounded">
                <FontAwesomeIcon icon={faTint} style={{ opacity: '1', margin: '0em 0.42857143em 0em -0.21428571em' }} />
                <Trans>Ich will helfen!</Trans>
              </Button>
              <Button
                secondary={true}
                basic
                inverted={true}
                size="medium"
                className="rounded"
              >
                <Icon name="newspaper outline" className="left" style={{ opacity: '1' }}></Icon>
                <Trans>Alle News in mein Postfach</Trans>
              </Button>
            </div>
          </div>
        }
      </div >
    );
  }
}

export const pageQuery = graphql`
    query($language: String!) {
        locales: allLocale(filter: {language: {eq: $language}}) {
          ...GetTranslations
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
export default useTranslationHOC(Index);