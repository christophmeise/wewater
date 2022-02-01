// i18next-extract-mark-ns-start page_spenden
import creditCard from '@iconify/icons-fa-solid/credit-card';
import tintIcon from '@iconify/icons-fa-solid/tint';
import universityIcon from '@iconify/icons-fa-solid/university';
import { Icon } from '@iconify/react';
import { graphql, navigate } from 'gatsby';
import { getImage, withArtDirection } from 'gatsby-plugin-image';
import { Trans } from 'gatsby-plugin-react-i18next';
import React from 'react';
import { Button, Container } from 'semantic-ui-react';
import HeaderOverlayFlexend from '../components/HeaderOverlay/header-overlay-flexend';
import Layout from '../components/Layout/Layout';
import SEO from '../components/seo';
import SpendenWidget from '../components/SpendenWidget/spenden-widget';
import { useTranslationHOC } from '../components/useTranslationHOC/useTranslationHOC';
import './spenden.less';


interface Props {
    t: any;
    language: any;
    navigate: any;
    data: {
        mobileImage: any;
        desktopImage: any;
    };
}

class SpendenPage extends React.Component<Props, any> {
    constructor(props) {
        super(props);
    }

    render() {
        const { t, data, navigate, language } = this.props;

        const headerImage = withArtDirection(getImage(data.mobileImage), [
            {
                media: "(min-width: 768px)",
                image: getImage(data.desktopImage),
            },
        ]);
        const backgroundColor = '#FFFFFF';

        return (
            <Layout>
                <SEO title={t('SpendenSEOTitle')} description={t('SpendenSEODescription')} />
                <div className="responsive-desktop-container">
                    <HeaderOverlayFlexend
                        content={<OverlayContent t={t} navigate={navigate} inverted={true} language={language} />}
                        color={backgroundColor}
                        darken={false}
                        inverted={false}
                        sources={headerImage}
                        width={16}
                    />
                </div>
                <div className="global-header-padding">
                    <div className="responsive-mobile-container">
                        <Container style={{ marginBottom: '16vh' }}>
                            <section>
                                <div className="plain-header">
                                    <div className="plain-header-container">
                                        <div className="responsive-desktop-container plain-header-container-desktop">
                                            <div className="plain-header-grid">
                                                <div data-sal="slide-down" data-sal-delay="0" data-sal-duration="300" data-sal-easing="ease">
                                                    {HeaderContent(t, language)}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="responsive-mobile-container plain-header-container-mobile">
                                            <div className="plain-header-grid">
                                                <div data-sal="slide-down" data-sal-delay="0" data-sal-duration="300" data-sal-easing="ease">
                                                    {HeaderContent(t, language)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </Container>
                    </div>

                    <SpendenWidget fullMode={true} hideForm={false}></SpendenWidget>
                </div>
            </Layout>
        );
    }
}

const HeaderContent = (t, language) => {
    return (
        <div>
            <h1 className="header-overlay-headline">{t('page_spenden:headline')}</h1>
            <div className="spenden-banner-container">
                <div className="spenden-banner-box rounded shadow">
                    <h3><Trans>Du spendest monatlich einen Geldbetrag deiner Wahl</Trans></h3>
                    <Button size="large" primary className="rounded" onClick={() => navigate('/spenden/monatlich')}>
                        <Icon icon={tintIcon} style={{ opacity: '1', margin: '0em 0.42857143em 0em -0.21428571em' }} />
                        <Trans>Monatlich Spenden</Trans>
                    </Button>
                    <div className="spenden-banner-payment-logos">
                        <svg xmlns="http://www.w3.org/2000/svg" focusable="false" width="0.75em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 384 512">
                            <path d="M111.4 295.9c-3.5 19.2-17.4 108.7-21.5 134c-.3 1.8-1 2.5-3 2.5H12.3c-7.6 0-13.1-6.6-12.1-13.9L58.8 46.6c1.5-9.6 10.1-16.9 20-16.9c152.3 0 165.1-3.7 204 11.4c60.1 23.3 65.6 79.5 44 140.3c-21.5 62.6-72.5 89.5-140.1 90.3c-43.4.7-69.5-7-75.3 24.2zM357.1 152c-1.8-1.3-2.5-1.8-3 1.3c-2 11.4-5.1 22.5-8.8 33.6c-39.9 113.8-150.5 103.9-204.5 103.9c-6.1 0-10.1 3.3-10.9 9.4c-22.6 140.4-27.1 169.7-27.1 169.7c-1 7.1 3.5 12.9 10.6 12.9h63.5c8.6 0 15.7-6.3 17.4-14.9c.7-5.4-1.1 6.1 14.4-91.3c4.6-22 14.3-19.7 29.3-19.7c71 0 126.4-28.8 142.9-112.3c6.5-34.8 4.6-71.4-23.8-92.6z" fill="currentColor"></path>
                        </svg>
                        <Icon icon={creditCard} style={{ opacity: '1' }} />
                        <Icon icon={universityIcon} style={{ opacity: '1' }} />
                    </div>
                </div>

                <div className="spenden-banner-box rounded shadow">
                    <h3><Trans>Du verschenkst eine individuelle Wasserspende</Trans></h3>
                    <Button size="large" primary className="rounded" onClick={() => navigate(getWasserspendeLinkByAmount(50, language))}>
                        <Icon icon={tintIcon} style={{ opacity: '1', margin: '0em 0.42857143em 0em -0.21428571em' }} />
                        <Trans>Spende verschenken</Trans>
                    </Button>
                    <div className="spenden-banner-payment-logos">
                        <svg xmlns="http://www.w3.org/2000/svg" focusable="false" width="0.75em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 384 512">
                            <path d="M111.4 295.9c-3.5 19.2-17.4 108.7-21.5 134c-.3 1.8-1 2.5-3 2.5H12.3c-7.6 0-13.1-6.6-12.1-13.9L58.8 46.6c1.5-9.6 10.1-16.9 20-16.9c152.3 0 165.1-3.7 204 11.4c60.1 23.3 65.6 79.5 44 140.3c-21.5 62.6-72.5 89.5-140.1 90.3c-43.4.7-69.5-7-75.3 24.2zM357.1 152c-1.8-1.3-2.5-1.8-3 1.3c-2 11.4-5.1 22.5-8.8 33.6c-39.9 113.8-150.5 103.9-204.5 103.9c-6.1 0-10.1 3.3-10.9 9.4c-22.6 140.4-27.1 169.7-27.1 169.7c-1 7.1 3.5 12.9 10.6 12.9h63.5c8.6 0 15.7-6.3 17.4-14.9c.7-5.4-1.1 6.1 14.4-91.3c4.6-22 14.3-19.7 29.3-19.7c71 0 126.4-28.8 142.9-112.3c6.5-34.8 4.6-71.4-23.8-92.6z" fill="currentColor"></path>
                        </svg>
                        <Icon icon={creditCard} style={{ opacity: '1' }} />
                        <Icon icon={universityIcon} style={{ opacity: '1' }} />
                    </div>
                </div>

                <div className="spenden-banner-box rounded shadow">
                    <h3><Trans>Du spendest einmalig einen Geldbetrag deiner Wahl</Trans></h3>
                    <Button size="large" primary className="rounded" onClick={() => navigate('/spenden/einmalig')}>
                        <Icon icon={tintIcon} style={{ opacity: '1', margin: '0em 0.42857143em 0em -0.21428571em' }} />
                        <Trans>Einmalig Spenden</Trans>
                    </Button>
                    <div className="spenden-banner-payment-logos">
                        <svg xmlns="http://www.w3.org/2000/svg" focusable="false" width="0.75em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 384 512">
                            <path d="M111.4 295.9c-3.5 19.2-17.4 108.7-21.5 134c-.3 1.8-1 2.5-3 2.5H12.3c-7.6 0-13.1-6.6-12.1-13.9L58.8 46.6c1.5-9.6 10.1-16.9 20-16.9c152.3 0 165.1-3.7 204 11.4c60.1 23.3 65.6 79.5 44 140.3c-21.5 62.6-72.5 89.5-140.1 90.3c-43.4.7-69.5-7-75.3 24.2zM357.1 152c-1.8-1.3-2.5-1.8-3 1.3c-2 11.4-5.1 22.5-8.8 33.6c-39.9 113.8-150.5 103.9-204.5 103.9c-6.1 0-10.1 3.3-10.9 9.4c-22.6 140.4-27.1 169.7-27.1 169.7c-1 7.1 3.5 12.9 10.6 12.9h63.5c8.6 0 15.7-6.3 17.4-14.9c.7-5.4-1.1 6.1 14.4-91.3c4.6-22 14.3-19.7 29.3-19.7c71 0 126.4-28.8 142.9-112.3c6.5-34.8 4.6-71.4-23.8-92.6z" fill="currentColor"></path>
                        </svg>
                        <Icon icon={creditCard} style={{ opacity: '1' }} />
                        <Icon icon={universityIcon} style={{ opacity: '1' }} />
                    </div>
                </div>
            </div>
        </div>
    );
};


class OverlayContent extends React.Component<any, any> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        const { inverted, t, navigate, language } = this.props;

        return (
            <div>
                <h1
                    className={`header-overlay-headline ${inverted ? 'header-overlay-headline-inverted' : ''}`}
                    style={{ marginBottom: '16vh', textAlign: 'center' }}
                >
                    {t('page_spenden:headline')}
                </h1>
                <div className="spenden-banner-container">
                    <div className="spenden-banner-box rounded shadow">
                        <h3><Trans>Du spendest monatlich einen Geldbetrag deiner Wahl</Trans></h3>
                        <Button size="large" primary inverted className="rounded" onClick={() => navigate('/spenden/monatlich')}>
                            <Icon icon={tintIcon} style={{ opacity: '1', margin: '0em 0.42857143em 0em -0.21428571em' }} />
                            <Trans>Monatlich Spenden</Trans>
                        </Button>
                        <div className="spenden-banner-payment-logos">
                            <svg xmlns="http://www.w3.org/2000/svg" focusable="false" width="0.75em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 384 512">
                                <path d="M111.4 295.9c-3.5 19.2-17.4 108.7-21.5 134c-.3 1.8-1 2.5-3 2.5H12.3c-7.6 0-13.1-6.6-12.1-13.9L58.8 46.6c1.5-9.6 10.1-16.9 20-16.9c152.3 0 165.1-3.7 204 11.4c60.1 23.3 65.6 79.5 44 140.3c-21.5 62.6-72.5 89.5-140.1 90.3c-43.4.7-69.5-7-75.3 24.2zM357.1 152c-1.8-1.3-2.5-1.8-3 1.3c-2 11.4-5.1 22.5-8.8 33.6c-39.9 113.8-150.5 103.9-204.5 103.9c-6.1 0-10.1 3.3-10.9 9.4c-22.6 140.4-27.1 169.7-27.1 169.7c-1 7.1 3.5 12.9 10.6 12.9h63.5c8.6 0 15.7-6.3 17.4-14.9c.7-5.4-1.1 6.1 14.4-91.3c4.6-22 14.3-19.7 29.3-19.7c71 0 126.4-28.8 142.9-112.3c6.5-34.8 4.6-71.4-23.8-92.6z" fill="currentColor"></path>
                            </svg>
                            <Icon icon={creditCard} style={{ opacity: '1' }} />
                            <Icon icon={universityIcon} style={{ opacity: '1' }} />
                        </div>
                    </div>

                    <div className="spenden-banner-box rounded shadow">
                        <h3><Trans>Du verschenkst eine individuelle Wasserspende</Trans></h3>
                        <Button size="large" primary inverted className="rounded" onClick={() => navigate(getWasserspendeLinkByAmount(50, language))}>
                            <Icon icon={tintIcon} style={{ opacity: '1', margin: '0em 0.42857143em 0em -0.21428571em' }} />
                            <Trans>Spende verschenken</Trans>
                        </Button>
                        <div className="spenden-banner-payment-logos">
                            <svg xmlns="http://www.w3.org/2000/svg" focusable="false" width="0.75em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 384 512">
                                <path d="M111.4 295.9c-3.5 19.2-17.4 108.7-21.5 134c-.3 1.8-1 2.5-3 2.5H12.3c-7.6 0-13.1-6.6-12.1-13.9L58.8 46.6c1.5-9.6 10.1-16.9 20-16.9c152.3 0 165.1-3.7 204 11.4c60.1 23.3 65.6 79.5 44 140.3c-21.5 62.6-72.5 89.5-140.1 90.3c-43.4.7-69.5-7-75.3 24.2zM357.1 152c-1.8-1.3-2.5-1.8-3 1.3c-2 11.4-5.1 22.5-8.8 33.6c-39.9 113.8-150.5 103.9-204.5 103.9c-6.1 0-10.1 3.3-10.9 9.4c-22.6 140.4-27.1 169.7-27.1 169.7c-1 7.1 3.5 12.9 10.6 12.9h63.5c8.6 0 15.7-6.3 17.4-14.9c.7-5.4-1.1 6.1 14.4-91.3c4.6-22 14.3-19.7 29.3-19.7c71 0 126.4-28.8 142.9-112.3c6.5-34.8 4.6-71.4-23.8-92.6z" fill="currentColor"></path>
                            </svg>
                            <Icon icon={creditCard} style={{ opacity: '1' }} />
                            <Icon icon={universityIcon} style={{ opacity: '1' }} />
                        </div>
                    </div>

                    <div className="spenden-banner-box rounded shadow">
                        <h3><Trans>Du spendest einmalig einen Geldbetrag deiner Wahl</Trans></h3>
                        <Button size="large" primary inverted className="rounded" onClick={() => navigate('/spenden/einmalig')}>
                            <Icon icon={tintIcon} style={{ opacity: '1', margin: '0em 0.42857143em 0em -0.21428571em' }} />
                            <Trans>Einmalig Spenden</Trans>
                        </Button>
                        <div className="spenden-banner-payment-logos">
                            <svg xmlns="http://www.w3.org/2000/svg" focusable="false" width="0.75em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 384 512">
                                <path d="M111.4 295.9c-3.5 19.2-17.4 108.7-21.5 134c-.3 1.8-1 2.5-3 2.5H12.3c-7.6 0-13.1-6.6-12.1-13.9L58.8 46.6c1.5-9.6 10.1-16.9 20-16.9c152.3 0 165.1-3.7 204 11.4c60.1 23.3 65.6 79.5 44 140.3c-21.5 62.6-72.5 89.5-140.1 90.3c-43.4.7-69.5-7-75.3 24.2zM357.1 152c-1.8-1.3-2.5-1.8-3 1.3c-2 11.4-5.1 22.5-8.8 33.6c-39.9 113.8-150.5 103.9-204.5 103.9c-6.1 0-10.1 3.3-10.9 9.4c-22.6 140.4-27.1 169.7-27.1 169.7c-1 7.1 3.5 12.9 10.6 12.9h63.5c8.6 0 15.7-6.3 17.4-14.9c.7-5.4-1.1 6.1 14.4-91.3c4.6-22 14.3-19.7 29.3-19.7c71 0 126.4-28.8 142.9-112.3c6.5-34.8 4.6-71.4-23.8-92.6z" fill="currentColor"></path>
                            </svg>
                            <Icon icon={creditCard} style={{ opacity: '1' }} />
                            <Icon icon={universityIcon} style={{ opacity: '1' }} />
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}

const getWasserspendeLinkByAmount = (amount: number, language: string) => {
    return '/shop/wasserspende-ueber-' + amount + '-euro-' + language
}
export const pageQuery = graphql`query ($language: String!) {
  locales: allLocale(filter: {language: {eq: $language}}) {
    ...GetTranslations
  }
  desktopImage: file(relativePath: {eq: "images/spenden/main-banner.jpg"}) {
    childImageSharp {
      gatsbyImageData(quality: 100, layout: FULL_WIDTH)
    }
  }
  mobileImage: file(relativePath: {eq: "images/spenden/main-banner-mobile.jpg"}) {
    childImageSharp {
      gatsbyImageData(quality: 100, layout: FULL_WIDTH)
    }
  }
}
`;

export default useTranslationHOC(SpendenPage);
