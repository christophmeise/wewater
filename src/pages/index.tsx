// i18next-extract-mark-ns-start page_landing
import tintIcon from '@iconify/icons-fa-solid/tint';
import { Icon as IconifyIcon } from '@iconify/react';
import { graphql } from 'gatsby';
import { getImage, StaticImage, withArtDirection } from 'gatsby-plugin-image';
import { Link, Trans } from 'gatsby-plugin-react-i18next';
import React from 'react';
import { Button, Icon, Popup } from 'semantic-ui-react';
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
  liter: number;
}

// 11,395 pro minute

class Index extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const timeDiff = new Date().getTime() - new Date('2019-03-01').getTime();
    const minutes = timeDiff / 1000 / 60;
    const liter = minutes * 11.395;
    this.state = {
      slidesPerView: 5,
      liter: liter
    };
  }

  interval;

  componentDidMount() {
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', this.calculateSlidesPerView.bind(this), false);
    }
    this.calculateSlidesPerView();
    if (typeof window !== 'undefined' && window.innerWidth > 767) {
      const timeDiff = new Date().getTime() - new Date('2019-03-01').getTime();
      const minutes = timeDiff / 1000 / 60;
      const liter = minutes * 11.395;
      this.setState({ liter: liter });
      this.interval = setInterval(() => this.setState({ liter: this.state.liter + 0.1899 }), 1000);
    }
  }
  componentWillUnmount() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.calculateSlidesPerView);
    }
    if (typeof window !== 'undefined' && window.innerWidth > 767) {
      clearInterval(this.interval);
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

    const sources = withArtDirection(getImage(data.mobileImage), [
      {
        media: "(min-width: 768px)",
        image: getImage(data.desktopImage),
      },
    ]);

    const slidesPerView = this.state != null ? this.state.slidesPerView : 5;

    const shouldHideForm = ((typeof window !== 'undefined') && window.innerWidth < 768) ? true : false;

    return (
      <Layout>
        <SEO title={t('LandingpageSEOTitle')} description={t('LandingpageSEODescription')} />
        <HeaderOverlay
          sources={sources}
          inverted={false}
          content={<OverlayContent liter={this.state.liter} />}
          darken={shouldHideForm}
          width={shouldHideForm ? 12 : 10}
          floatTop={true}
          centerImage={!shouldHideForm}
        />
        <div>
          <Video></Video>
          <Innovation></Innovation>
          <SectionFiltersysteme></SectionFiltersysteme>
          <SpendenWidget fullMode={false} hideForm={shouldHideForm}></SpendenWidget>
          <SectionBlog slidesPerView={slidesPerView}></SectionBlog>
          <SectionProjekte></SectionProjekte>
        </div>
      </Layout>
    )
  }
}

const OverlayContent = ({ liter }) => {
  const format = new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2 });
  return (
    <div className="main-overlay-content">
      <h1 className="wewater-description-desktop text-shadow-lg">
        WeWater
      </h1>
      <div className="wewater-description-mobile wewater-mobile-logo shadow">
        {WeWaterLogo()}
      </div>
      <h2 className="text-shadow-lg">
        <Trans>Wasser weltweit klarmachen.</Trans>
      </h2>
      <p className="wewater-description-desktop text-shadow" style={{ marginBottom: '1.5rem', marginTop: '0rem' }}>
        <Trans>Wir haben eine innovative Wasserfiltertechnologie entwickelt, die ohne den Einsatz von elektrischer Energie und Chemie funktioniert und einen extrem hohen Reinheitsgrad gewährleistet.</Trans>
      </p>
      <p className="wewater-description-mobile" style={{ marginBottom: '1.5rem', marginTop: '0rem' }}>
        <Trans>Eine innovative Wasserfiltertechnologie ohne elektrische Energie, ohne Chemie, aber maximaler Reinheitsgrad.</Trans>
      </p>
      {typeof window != 'undefined' && window.innerWidth > 767 &&
        <div className="main-overlay-infobox rounded">
          <div className="main-overlay-infobox-text">
            <h3>{format.format(liter.toFixed(2))}</h3>
          </div>
          <div>
            <p><Trans>Liter Trinkwasser werden pro Jahr gespendet</Trans></p>
            <Popup
              style={{ zIndex: 99999999999 }}
              trigger={
                <Button secondary basic inverted className="rounded popup-infotext-trigger" size="tiny" icon='info' />
              }
            >
              <Popup.Content>
                <Trans>Basierend auf der durchschnittlichen Filterleistung unserer sich im Einsatz befindenden Wasserfilter. Die Filterleistung unserer Systeme ist am Anfang ihrer Lebenszyklen bis zu doppelt so hoch. Die Zahl ist bewusst konservativ angegeben, im Realbetrieb kann die Filterleistung noch höher ausfallen.</Trans>
              </Popup.Content>
            </Popup>
          </div>
          <div>
            <Link to="/spenden">
              <Button primary className="rounded">
                <IconifyIcon icon={tintIcon} style={{ opacity: '1', margin: '0em 0.42857143em 0em -0.21428571em' }} />
                <Trans>Ich will helfen!</Trans>
              </Button>
            </Link>
            <a href="https://wewater.us20.list-manage.com/subscribe/post?u=24746d4c48c610cc73f27cb63&id=67239df000" target="_blank">
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
            </a>
          </div>
        </div>
      }
    </div >
  );
}

export const pageQuery = graphql`query ($language: String!) {
  locales: allLocale(filter: {language: {eq: $language}}) {
    ...GetTranslations
  }
  desktopImage: file(relativePath: {eq: "images/main/new.jpg"}) {
            childImageSharp {
            gatsbyImageData(quality: 100, layout: FULL_WIDTH, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
    }
  }
  mobileImage: file(relativePath: {eq: "images/main/main-banner-mobile_.jpg"}) {
            childImageSharp {
            gatsbyImageData(quality: 85, layout: FULL_WIDTH, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
    }
  }
}
`;
export default useTranslationHOC(Index);

export const WeWaterLogo = () => {
  return (
    <StaticImage
      src="../../static/logo.png"
      alt="WeWater Logo"
      height={55}
      width={55}
      quality={100}
      loading="eager"
      placeholder="none"
    />
  )
}