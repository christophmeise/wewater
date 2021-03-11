// i18next-extract-mark-ns-start page_shop
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { graphql } from 'gatsby';
import { Link, Trans } from 'gatsby-plugin-react-i18next';
import React from 'react';
import { Button, Container, Grid, Header } from 'semantic-ui-react';
import HeaderOverlayBackground from '../components/HeaderOverlay/header-overlay-background';
import Layout from '../components/Layout/Layout';
import SEO from '../components/seo';
import ShopCard, { ShopItem } from '../components/ShopCard/shop-card';
import { useTranslationHOC } from '../components/useTranslationHOC/useTranslationHOC';
import './shop.less';

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
        const backgroundColor = '#7897B5';
        const shopItems = data.german.edges
            .filter((item) => item.node.name.indexOf('Wasserspende über') < 0);


        return (
            <Layout>
                <SEO title={t('ShopSEOTitle')} description={t('ShopSEODescription')} />
                <HeaderOverlayBackground content={<OverlayContent t={t} inverted={true} />} color={backgroundColor} darken={false} inverted={false} sources={headerImage} width={8} floatRight={true} />
                <Container className="global-header-padding">
                    <Header
                        data-sal="slide-up"
                        data-sal-delay="0"
                        data-sal-duration="300"
                        data-sal-easing="ease"
                        textAlign='left'
                        className="global-flex-column global-no-margin"
                    >
                        <h3 className={`global-subtitle text-primary`}><Trans>Der Shop von WeWater</Trans></h3>
                        <h2 className="global-headline"><Trans>Entdecke Einzigartiges</Trans></h2>
                    </Header>
                    <Grid style={{ paddingTop: '2em' }} stackable centered columns={3}>
                        <Grid.Column>
                            {shopItems
                                .filter((shopItem) => shopItem.node.name.length > 0)
                                .map(({ node: post }) => {
                                    return (
                                        shopItems.findIndex((entry) => entry.node.id === post.id) % 3 === 0 && (
                                            <div className="shop-item-card-wrapper" key={post.id} data-sal="slide-up" data-sal-delay="0" data-sal-duration="300" data-sal-easing="ease">
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
                                            <div className="shop-item-card-wrapper" key={post.id} data-sal="slide-up" data-sal-delay="0" data-sal-duration="300" data-sal-easing="ease">
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
                                            <div className="shop-item-card-wrapper" key={post.id} data-sal="slide-up" data-sal-delay="0" data-sal-duration="300" data-sal-easing="ease">
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
        this.state = {
            selected: 25
        }
    }

    render() {
        const { inverted, t } = this.props;

        const state = this.state;

        return (
            <div>
                <h3 className="shop-h3 text-shadow">
                    <Trans>Geschenkidee</Trans>
                </h3>
                <h1
                    className={`header-overlay-headline ${inverted ? 'header-overlay-headline-inverted' : ''}`}
                    style={{ marginBottom: '1.5rem' }}
                >
                    <Trans>Individuelle Wasserspende</Trans>
                </h1>
                {typeof window != 'undefined' && window.innerWidth > 767 &&
                    <h2 className={`header-overlay-subheadline ${inverted ? 'header-overlay-subheadline-inverted' : ''}`}
                        style={{ marginBottom: '1.5rem', marginTop: '0rem' }}>
                        <Trans>Mit unserer Wasserspende hast du immer ein ideales Geschenk parat. Denn damit spendest du lebensnotwendiges Trinkwasser und widmest diese Wasserspende zeitgleich einem lieben Menschen.</Trans>
                    </h2>
                }
                <h4 className="shop-h4 text-shadow">
                    <Trans>Spendenhöhe</Trans>
                </h4>
                <div className="shop-spenden-select">
                    <div className={`shop-spenden-amount-selector ${state.selected === 10 ? 'shop-spenden-amount-selector-selected' : ''}`} onClick={() => this.setState({ selected: 10 })}>10€</div>
                    <div className={`shop-spenden-amount-selector ${state.selected === 25 ? 'shop-spenden-amount-selector-selected' : ''}`} onClick={() => this.setState({ selected: 25 })}>25€</div>
                    <div className={`shop-spenden-amount-selector ${state.selected === 50 ? 'shop-spenden-amount-selector-selected' : ''}`} onClick={() => this.setState({ selected: 50 })}>50€</div>
                    <div className={`shop-spenden-amount-selector ${state.selected === 100 ? 'shop-spenden-amount-selector-selected' : ''}`} onClick={() => this.setState({ selected: 100 })}>100€</div>
                    <div className={`shop-spenden-amount-selector ${state.selected === 200 ? 'shop-spenden-amount-selector-selected' : ''}`} onClick={() => this.setState({ selected: 200 })}>200€</div>
                </div>
                <Link to={getWasserspendeLinkByAmount(state.selected)}>
                    <Button primary basic inverted className="rounded">
                        <Trans>Wasserspende für {state.selected.toString()}€ schenken</Trans>
                        <FontAwesomeIcon icon={faArrowRight} style={{ opacity: '1', margin: '0em -0.21428571em 0em 0.42857143em' }} />
                    </Button>
                </Link>
            </div>
        );
    }
}

const getWasserspendeLinkByAmount = (amount: number) => {
    if (amount === 10) {
        return 'wasserspende-10-euro';
    } else {
        return 'wasserspende-ueber-' + amount + '-euro'
    }
}

export const pageQuery = graphql`
    query($language: String!) {
        locales: allLocale(filter: {language: {eq: $language}}) {
          ...GetTranslations
        }
        desktopImage: file(relativePath: { eq: "images/shop/banner1.png" }) {
            childImageSharp {
                fluid(maxWidth: 1600, quality: 100) {
                    ...GatsbyImageSharpFluid_withWebp
                }
            }
        }
        mobileImage: file(relativePath: { eq: "images/shop/banner1.png" }) {
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
                    ... on WpSimpleProduct {
                        id
                        name
                        salePrice
                        price
                        regularPrice
                    }
                    ... on WpVariableProduct {
                        id
                        name
                        price
                    }
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
