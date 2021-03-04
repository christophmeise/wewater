// i18next-extract-mark-ns-start page_spenden
import { faPaypal } from '@fortawesome/free-brands-svg-icons';
import { faCreditCard, faReply, faTint } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { graphql } from 'gatsby';
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
        const { t, data, navigate } = this.props;

        const headerImage = [
            data.mobileImage.childImageSharp.fluid,
            {
                ...data.desktopImage.childImageSharp.fluid,
                media: `(min-width: 768px)`,
            },
        ];
        const backgroundColor = '#FFFFFF';

        return (
            <Layout>
                <SEO title={t('SpendenSEOTitle')} description={t('SpendenSEODescription')} />
                <HeaderOverlayFlexend content={<OverlayContent t={t} navigate={navigate} inverted={true} />} color={backgroundColor} darken={false} inverted={false} sources={headerImage} width={16} />
                <Container className="global-header-padding">
                    <SpendenWidget fullMode={true}></SpendenWidget>
                </Container>
            </Layout>
        );
    }
}

class OverlayContent extends React.Component<any, any> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        const { inverted, t, navigate } = this.props;

        return (
            <div>
                <h1
                    className={`header-overlay-headline ${inverted ? 'header-overlay-headline-inverted' : ''}`}
                    style={{ marginBottom: '1.5rem' }}
                >
                    {t('page_spenden:headline')}
                </h1>
                {typeof window != 'undefined' && window.innerWidth > 767 &&
                    <div className="spenden-banner-container">
                        <div className="spenden-banner-box rounded shadow">
                            <h3><Trans>Du spendest monatlich einen Geldbetrag deiner Wahl</Trans></h3>
                            <Button size="large" primary inverted className="rounded" onClick={() => navigate('/spenden/monatlich')}>
                                <FontAwesomeIcon icon={faTint} style={{ opacity: '1', margin: '0em 0.42857143em 0em -0.21428571em' }} />
                                <Trans>Monatlich Spenden</Trans>
                            </Button>
                            <div className="spenden-banner-payment-logos">
                                <FontAwesomeIcon icon={faPaypal} style={{ opacity: '1' }} />
                                <FontAwesomeIcon icon={faReply} style={{ opacity: '1' }} />
                            </div>
                        </div>

                        <div className="spenden-banner-box rounded shadow">
                            <h3><Trans>Du spendest einmalig einen Geldbetrag deiner Wahl</Trans></h3>
                            <Button size="large" primary inverted className="rounded" onClick={() => navigate('/spenden/einmalig')}>
                                <FontAwesomeIcon icon={faTint} style={{ opacity: '1', margin: '0em 0.42857143em 0em -0.21428571em' }} />
                                <Trans>Einmalig Spenden</Trans>
                            </Button>
                            <div className="spenden-banner-payment-logos">
                                <FontAwesomeIcon icon={faPaypal} style={{ opacity: '1' }} />
                                <FontAwesomeIcon icon={faCreditCard} style={{ opacity: '1' }} />
                                <FontAwesomeIcon icon={faReply} style={{ opacity: '1' }} />
                            </div>
                        </div>


                        <div className="spenden-banner-box rounded shadow">
                            <h3><Trans>Du spendest projektbezogen einen Geldbetrag deiner Wahl</Trans></h3>
                            <Button size="large" primary inverted className="rounded" onClick={() => navigate('/spenden/projektbezogen')}>
                                <FontAwesomeIcon icon={faTint} style={{ opacity: '1', margin: '0em 0.42857143em 0em -0.21428571em' }} />
                                <Trans>Projektbezogen Spenden</Trans>
                            </Button>
                            <div className="spenden-banner-payment-logos">
                                <FontAwesomeIcon icon={faPaypal} style={{ opacity: '1' }} />
                                <FontAwesomeIcon icon={faReply} style={{ opacity: '1' }} />
                            </div>
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
        desktopImage: file(relativePath: { eq: "images/spenden/main-banner.jpg" }) {
            childImageSharp {
                fluid(maxWidth: 1600, quality: 100) {
                    ...GatsbyImageSharpFluid_withWebp
                }
            }
        }
        mobileImage: file(relativePath: { eq: "images/spenden/main-banner-mobile.jpg" }) {
            childImageSharp {
                fluid(maxWidth: 1200, quality: 100) {
                    ...GatsbyImageSharpFluid_withWebp
                }
            }
        }
    }
`;

export default useTranslationHOC(SpendenPage);
