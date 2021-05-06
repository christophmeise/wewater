// i18next-extract-mark-ns-start page_landing
import { graphql } from 'gatsby';
import { getImage, StaticImage, withArtDirection } from 'gatsby-plugin-image';
import { Trans } from 'gatsby-plugin-react-i18next';
import React from 'react';
import SectionBlog from '../components/Blog/blog';
import SectionFiltersysteme from '../components/Filtersysteme/filtersysteme';
import HeaderOverlay from '../components/HeaderOverlay/header-overlay';
import Innovation from '../components/Innovation/innovation';
import Layout from '../components/Layout/Layout';
import LiterCounter from '../components/LiterCounter/LiterCounter';
import MobileLandingHero from '../components/MobileLandingHero/MobileLandingHero';
import SectionProjekte from '../components/Projekte/projekte';
import SEO from '../components/seo';
import SpendenWidget from '../components/SpendenWidget/spenden-widget';
import { useTranslationHOC } from '../components/useTranslationHOC/useTranslationHOC';
import Video from '../components/Video/video';
import './index.less';

interface Props {
  t: any;
  language: any;
  data: {
    mobileImage: any;
    desktopImage: any;
    blogposts: any;
    projects: any;
  };
}

interface State {
  slidesPerView: number;
}

// 11,395 pro minute

class Index extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      slidesPerView: 5,
    };
  }

  interval;

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
    const { t, data, language } = this.props;

    const sources = withArtDirection(getImage(data.desktopImage), [
      {
        media: "(min-width: 768px)",
        image: getImage(data.desktopImage),
      },
    ]);

    const slidesPerView = this.state != null ? this.state.slidesPerView : 5;
    const isMobile = ((typeof window !== 'undefined') && window.innerWidth < 768) ? true : false;
    const tabletOrMobile = ((typeof window !== 'undefined') && window.innerWidth < 1024) ? true : false;

    let posts = data.blogposts?.edges;
    let projekte = data.projects?.edges;


    return (
      <Layout>
        <SEO title={t('LandingpageSEOTitle')} description={t('LandingpageSEODescription')} />
        <div className="responsive-desktop-container">
          <HeaderOverlay
            sources={sources}
            inverted={false}
            content={<OverlayContent language={language} />}
            darken={isMobile}
            width={tabletOrMobile ? 12 : 10}
            floatTop={true}
            centerImage={!isMobile}
          />
        </div>
        <div className="responsive-mobile-container">
          <MobileLandingHero />
        </div>
        <div>
          <Video></Video>
          <Innovation></Innovation>
          <SectionFiltersysteme></SectionFiltersysteme>
          <SpendenWidget fullMode={false} hideForm={isMobile}></SpendenWidget>
          <SectionBlog slidesPerView={slidesPerView} posts={posts}></SectionBlog>
          <SectionProjekte projekte={projekte}></SectionProjekte>
        </div>
      </Layout>
    )
  }
}

const OverlayContent = ({ language }) => {
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
      {typeof window != 'undefined' && window.innerWidth > 767 &&
        <LiterCounter language={language}></LiterCounter>
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
  blogposts: allWpPost(sort: {fields: date, order: DESC}, filter: {language: {slug: {eq: $language}}}) {
      ...GetBlogposts
  }
  projects: allWpProjekt(sort: {fields: date, order: DESC}, filter: {language: {slug: {eq: $language}}}) {
    ...GetProjects
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