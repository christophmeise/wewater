import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import { Trans } from 'gatsby-plugin-react-i18next';
import React from 'react';
import { Container, Grid, GridColumn, Header, Select } from 'semantic-ui-react';
import AddToCartButton from '../components/Cart/AddToCartButton/AddToCartButton';
import Layout from '../components/Layout/Layout';
import Lightbox from '../components/Lightbox/lightbox';
import SEO from '../components/seo';
import { ShopItem } from '../components/ShopCard/shop-card';
import SidebarWidget from '../components/Sidebar/sidebar';
import './shop-article.less';

class ShopArticleTemplate extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            variationId: null,
            selectedImage: null,
            showLightbox: false
        };
    }

    handleChange = (e, { value }) => this.setState({ variationId: value });

    handleOpen = (i) => {
        console.log('AAAH');
        this.setState({ showLightbox: true, selectedImage: i });
    }

    handleClose = () => {
        this.setState({ showLightbox: false, selectedImage: null });
    }
    handlePrevRequest = (i, length) => e => {
        this.setState({ selectedImage: (i - 1 + length) % length });
    }
    handleNextRequest = (i, length) => e => {
        this.setState({ selectedImage: (i + 1) % length });
    }

    render() {
        const shopArticle: ShopItem = this.props.data.allWpProduct.edges[0].node;
        const sources = shopArticle.image.localFile.childImageSharp.fluid;
        const variations = [];

        shopArticle.variations?.nodes.forEach((variation) => {
            variation.attributes.nodes.forEach((attribute) => {
                variations.push({ text: attribute.value, value: variation.databaseId })
            });
        });
        const gallery: any = [shopArticle.image].concat(shopArticle.galleryImages.nodes);
        const outOfStock: boolean = shopArticle.stockStatus === 'OUT_OF_STOCK' ? true : false;
        return (
            <Layout invertedHeader={false}>
                <SEO description={shopArticle.name} title={shopArticle.name} />
                <Container className="global-header-padding">
                    <div className="shop-article-grid">
                        <section className="shop-item-section">
                            <article>
                                {this.state.showLightbox && this.state.selectedImage !== null && (
                                    <Lightbox
                                        images={gallery}
                                        handleClose={this.handleClose}
                                        handleNextRequest={this.handleNextRequest}
                                        handlePrevRequest={this.handlePrevRequest}
                                        selectedImage={this.state.selectedImage}
                                    />)}
                                <Grid stackable columns="2">
                                    <GridColumn width="6">
                                        <div className="shop-item-picture rounded shadow" onClick={() => this.setState({ showLightbox: true, selectedImage: 0 })}>
                                            <Img className="img-fluid" fluid={sources} />
                                        </div>
                                        <div className="shop-item-picture-gallery">
                                            {shopArticle.galleryImages.nodes.map((galleryImg, i) => {
                                                return (
                                                    <div className="shop-item-picture-gallery-item rounded shadow" key={i} onClick={() => this.setState({ showLightbox: true, selectedImage: i })}>
                                                        <Img className="shop-item-picture-gallery-img" fluid={galleryImg.localFile.childImageSharp.fluid} />
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </GridColumn>
                                    <GridColumn width="10">
                                        <Header
                                            data-sal="slide-up"
                                            data-sal-delay="0"
                                            data-sal-duration="300"
                                            data-sal-easing="ease"
                                            textAlign='left'
                                            className="global-flex-column global-no-margin"
                                        >
                                            <h3 className={`global-subtitle text-primary`}>{shopArticle.productCategories.nodes.map((node) => node.name)}</h3>
                                            <h2 className="global-headline">{shopArticle.name}</h2>
                                        </Header>
                                        <h4 className="shop-article-price">
                                            {shopArticle.onSale && <p className="shop-regular-price">{shopArticle.regularPrice}</p>}
                                            <p>{shopArticle.price}</p>
                                        </h4>
                                        {shopArticle.variations?.nodes != null &&
                                            <>
                                                <h4 className="shop-article-variation-label">
                                                    <Trans>Auswahl</Trans>
                                                </h4>
                                                <div className="shop-article-variations">
                                                    <Select placeholder='Select your variation' options={variations} onChange={this.handleChange.bind(this)} />
                                                </div>
                                            </>
                                        }
                                        {!outOfStock ?
                                            <AddToCartButton product={shopArticle} variationId={this.state.variationId} />
                                            : <strong className="sold-out-text"><Trans>Aktuell leider ausverkauft!</Trans></strong>
                                        }
                                        <p dangerouslySetInnerHTML={{ __html: shopArticle.description }}>
                                        </p>
                                    </GridColumn>
                                </Grid>

                            </article>
                        </section>
                        <div className="sidebar-widget-wrapper">
                            <SidebarWidget></SidebarWidget>
                        </div>
                    </div>
                </Container>
            </Layout>
        );
    }
}

export default ShopArticleTemplate;

export const pageQuery = graphql`
    query ShopArticleByPath($slug: String!, $language: String!) {
        locales: allLocale(filter: {language: {eq: $language}}) {
          ...GetTranslations
        }
         allWpProduct(
           filter: { slug: { eq: $slug } }
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
                    productCategories {
                        nodes {
                            name
                        }
                    }
                    galleryImages {
                        nodes {
                            id
                            localFile {
                                childImageSharp {
                                    fluid(maxWidth: 800) {
                                        ...GatsbyImageSharpFluid
                                    }
                                }
                            }
                        }
                    }
                    ... on WpSimpleProduct {
                        id
                        name
                        salePrice
                        price
                        regularPrice
                        stockStatus
                    }
                    ... on WpVariableProduct {
                        id
                        name
                        price
                        stockStatus
                        variations {
                            nodes {
                                name
                                id
                                databaseId
                                attributes {
                                    nodes {
                                        value
                                        id
                                    }
                                }
                            }
                        }
                    }
                    image {
                        localFile {
                            childImageSharp {
                                fluid(maxWidth: 800) {
                                    ...GatsbyImageSharpFluid
                                }
                                fixed(height: 100) {
                                    ...GatsbyImageSharpFixed
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;
