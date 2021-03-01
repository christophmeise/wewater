// i18next-extract-mark-ns-start page_shop
import { graphql } from 'gatsby';
import { Trans } from 'gatsby-plugin-react-i18next';
import React from 'react';
import { Container, Grid, Header } from 'semantic-ui-react';
import HeaderOverlay from '../components/HeaderOverlay/header-overlay';
import Layout from '../components/Layout/Layout';
import SEO from '../components/seo';
import ShopCard, { ShopItem } from '../components/ShopCard/shop-card';
import { useTranslationHOC } from '../components/useTranslationHOC/useTranslationHOC';

interface Props {
    pageContext: any;
    t: any;
    data: {
        mobileImage: any;
        desktopImage: any;
        german: {
            edges: [
                { node: ShopItem }
            ]
        }
    };
}

class ShopPage extends React.Component<Props, any> {
    constructor(props) {
        super(props);
    }

    render() {
        const { t, data } = this.props;

        const headerImage = [
            data.mobileImage.childImageSharp.fluid,
            {
                ...data.desktopImage.childImageSharp.fluid,
                media: `(min-width: 768px)`,
            },
        ];
        const backgroundColor = '#bc9456';
        const shopItems = data.german.edges;

        return (
            <Layout>
                <SEO title={t('ShopSEOTitle')} description={t('ShopSEODescription')} />
                <HeaderOverlay content={<OverlayContent t={t} inverted={true} />} color={backgroundColor} darken={false} inverted={false} sources={headerImage} width={12} />
                <Container className="global-header-padding">
                    <Header
                        data-sal="slide-up"
                        data-sal-delay="0"
                        data-sal-duration="300"
                        data-sal-easing="ease"
                        textAlign='center'
                        className="global-flex-column global-no-margin"
                    >
                        <h3 className={`global-subtitle text-primary`}><Trans>News von WeWater</Trans></h3>
                        <h2 className="global-headline"><Trans>Neuigkeiten</Trans></h2>
                    </Header>
                    <Grid style={{ paddingTop: '2em' }} stackable centered columns={3}>
                        <Grid.Column>
                            {shopItems
                                .filter((shopItem) => shopItem.node.name.length > 0)
                                .map(({ node: post }) => {
                                    return (
                                        shopItems.findIndex((entry) => entry.node.id === post.id) % 3 === 0 && (
                                            <div key={post.id} data-sal="slide-up" data-sal-delay="0" data-sal-duration="300" data-sal-easing="ease">
                                                <ShopCard shopItem={post} ></ShopCard>
                                            </div>
                                        )
                                    );
                                })}
                        </Grid.Column>
                        <Grid.Column>
                            {shopItems
                                .filter((shopItem) => shopItem.node.name.length > 0)
                                .map(({ node: post }) => {
                                    return (
                                        shopItems.findIndex((entry) => entry.node.id === post.id) % 3 === 1 && (
                                            <div key={post.id} data-sal="slide-up" data-sal-delay="0" data-sal-duration="300" data-sal-easing="ease">
                                                <ShopCard shopItem={post} data-sal="slide-up" data-sal-delay="0" data-sal-duration="300" data-sal-easing="ease"></ShopCard>
                                            </div>
                                        )
                                    );
                                })}
                        </Grid.Column>
                        <Grid.Column>
                            {shopItems
                                .filter((shopItem) => shopItem.node.name.length > 0)
                                .map(({ node: post }) => {
                                    return (
                                        shopItems.findIndex((entry) => entry.node.id === post.id) % 3 === 2 && (
                                            <div key={post.id} data-sal="slide-up" data-sal-delay="0" data-sal-duration="300" data-sal-easing="ease">
                                                <ShopCard shopItem={post} data-sal="slide-up" data-sal-delay="0" data-sal-duration="300" data-sal-easing="ease"></ShopCard>
                                            </div>
                                        )
                                    );
                                })}
                        </Grid.Column>
                    </Grid>
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
                    {t('page_shop:headline')}
                </h1>
                <h2 className={`header-overlay-subheadline ${inverted ? 'header-overlay-subheadline-inverted' : ''}`}
                    style={{ marginBottom: '1.5rem', marginTop: '0rem' }}>
                    {t('page_shop:subheadline')}
                </h2>
            </div>
        );
    }
}

export const pageQuery = graphql`
    query($language: String!) {
        locales: allLocale(filter: {language: {eq: $language}}) {
          ...GetTranslations
        }
        desktopImage: file(relativePath: { eq: "images/shop/banner__.jpg" }) {
            childImageSharp {
                fluid(maxWidth: 1600, quality: 100) {
                    ...GatsbyImageSharpFluid_withWebp
                }
            }
        }
        mobileImage: file(relativePath: { eq: "images/shop/banner__.jpg" }) {
            childImageSharp {
                fluid(maxWidth: 1200, quality: 100) {
                    ...GatsbyImageSharpFluid_withWebp
                }
            }
        }
        german: allWpProduct(
            sort: { fields: date, order: DESC }
        ) {
            edges {
                node {
                    id
                    name
                    description
                    shortDescription
                    date(formatString: "MMMM DD, YYYY", locale: "de")
                    slug
                    onSale
                    status
                    averageRating
                    databaseId
                    image {
                        localFile {
                            childImageSharp {
                                fluid(maxWidth: 800) {
                                    ...GatsbyImageSharpFluid
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;

export default useTranslationHOC(ShopPage);
