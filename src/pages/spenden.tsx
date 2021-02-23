import { faPaypal } from '@fortawesome/free-brands-svg-icons';
import { faCreditCard, faReply, faTint } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { graphql } from 'gatsby';
import React from 'react';
import { Button, Container } from 'semantic-ui-react';
import HeaderOverlayFlexend from '../components/HeaderOverlay/header-overlay-flexend';
import Layout from '../components/Layout/Layout';
import SEO from '../components/seo';
import SpendenWidget from '../components/SpendenWidget/spenden-widget';
import withI18next from '../components/withI18next/withI18next';
import './spenden.less';

interface Props {
    pageContext: any;
    t: any;
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

class SpendenPage extends React.Component<Props, any> {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            pageContext: { locale },
            t,
        } = this.props;
        const data = this.props.data;
        const siteTitle = data.site.siteMetadata.title;
        const description = data.site.siteMetadata.description;

        const headerImage = [
            data.mobileImage.childImageSharp.fluid,
            {
                ...data.desktopImage.childImageSharp.fluid,
                media: `(min-width: 768px)`,
            },
        ];
        const backgroundColor = '#FFFFFF';

        return (
            <Layout title={siteTitle} t={t}>
                <SEO title="Imprint" />
                <HeaderOverlayFlexend content={<OverlayContent t={t} inverted={true} />} color={backgroundColor} darken={false} inverted={false} sources={headerImage} width={16} />
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
        const { inverted, t } = this.props;

        return (
            <div>
                <h1
                    className={`header-overlay-headline ${inverted ? 'header-overlay-headline-inverted' : ''}`}
                    style={{ marginBottom: '1.5rem' }}
                >
                    {t('page_spenden:headline')}
                </h1>
                <div className="spenden-banner-container">
                    <div className="spenden-banner-box rounded shadow">
                        <h3>Du spendest monatlich einen Geldbetrag deiner Wahl</h3>
                        <Button size="large" primary inverted className="rounded">
                            <FontAwesomeIcon icon={faTint} style={{ opacity: '1', margin: '0em 0.42857143em 0em -0.21428571em' }} />
                            Monatlich Spenden
                    </Button>
                        <div className="spenden-banner-payment-logos">
                            <FontAwesomeIcon icon={faPaypal} style={{ opacity: '1' }} />
                            <FontAwesomeIcon icon={faReply} style={{ opacity: '1' }} />
                        </div>
                    </div>

                    <div className="spenden-banner-box rounded shadow">
                        <h3>Du spendest einmalig einen Geldbetrag deiner Wahl</h3>
                        <Button size="large" primary inverted className="rounded">
                            <FontAwesomeIcon icon={faTint} style={{ opacity: '1', margin: '0em 0.42857143em 0em -0.21428571em' }} />
                            Einmalig Spenden
                    </Button>
                        <div className="spenden-banner-payment-logos">
                            <FontAwesomeIcon icon={faPaypal} style={{ opacity: '1' }} />
                            <FontAwesomeIcon icon={faCreditCard} style={{ opacity: '1' }} />
                            <FontAwesomeIcon icon={faReply} style={{ opacity: '1' }} />
                        </div>
                    </div>


                    <div className="spenden-banner-box rounded shadow">
                        <h3>Du spendest projektbezogen einen Geldbetrag deiner Wahl</h3>
                        <Button size="large" primary inverted className="rounded">
                            <FontAwesomeIcon icon={faTint} style={{ opacity: '1', margin: '0em 0.42857143em 0em -0.21428571em' }} />
                            Projektbezogen Spenden
                        </Button>
                        <div className="spenden-banner-payment-logos">
                            <FontAwesomeIcon icon={faPaypal} style={{ opacity: '1' }} />
                            <FontAwesomeIcon icon={faReply} style={{ opacity: '1' }} />
                        </div>
                    </div>
                </div>

            </div >
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

export default withI18next(['common', 'page_spenden'])(SpendenPage);
