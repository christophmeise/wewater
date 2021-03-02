// i18next-extract-mark-ns-start page_warenkorb
import { graphql } from 'gatsby';
import React from 'react';
import { Container } from 'semantic-ui-react';
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
