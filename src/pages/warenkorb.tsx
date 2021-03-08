// i18next-extract-mark-ns-start page_warenkorb
import { graphql } from 'gatsby';
import { Trans } from 'gatsby-plugin-react-i18next';
import React from 'react';
import { Container, Header } from 'semantic-ui-react';
import CartItemsContainer from '../components/Cart/CartItemsContainer/CartItemsContainer';
import Layout from '../components/Layout/Layout';
import SEO from '../components/seo';
import { ShopItem } from '../components/ShopCard/shop-card';
import { useTranslationHOC } from '../components/useTranslationHOC/useTranslationHOC';

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
        german: {
            edges: [
                { node: ShopItem }
            ]
        }
    };
}

class WarenkorbPage extends React.Component<Props, any> {
    constructor(props) {
        super(props);
    }

    render() {
        const { t } = this.props;

        return (
            <Layout>
                <SEO title={t('WarenkorbSEOTitle')} description={t('WarenkorbSEODescription')} />
                <Container className="global-header-padding">
                    <Header
                        data-sal="slide-up"
                        data-sal-delay="0"
                        data-sal-duration="300"
                        data-sal-easing="ease"
                        textAlign='left'
                        className="global-flex-column global-no-margin"
                    >
                        <h3 className={`global-subtitle text-primary`}><Trans>Überprüfe deine Bestellung</Trans></h3>
                        <h2 className="global-headline"><Trans>Warenkorb</Trans></h2>
                    </Header>
                    <CartItemsContainer />
                </Container>
            </Layout>
        );
    }
}

export const pageQuery = graphql`
    query($language: String!) {
        locales: allLocale(filter: {language: {eq: $language}}) {
          ...GetTranslations
        }
    }
`;

export default useTranslationHOC(WarenkorbPage);
