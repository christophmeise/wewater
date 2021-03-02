import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import { Trans } from 'gatsby-plugin-react-i18next';
import React from 'react';
import { Container, Grid, GridColumn, Header, Select } from 'semantic-ui-react';
import AddToCartButton from '../components/Cart/AddToCartButton/AddToCartButton';
import Layout from '../components/Layout/Layout';
import SEO from '../components/seo';
import { ShopItem } from '../components/ShopCard/shop-card';
import './shop-article.less';

class ShopArticleTemplate extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = { variationId: null };
    }

    handleChange = (e, { value }) => this.setState({ variationId: value });

    render() {
        const shopArticle: ShopItem = this.props.data.allWpProduct.edges[0].node;
        const sources = shopArticle.image.localFile.childImageSharp.fluid;
        const variations = [];

        shopArticle.variations?.nodes.forEach((variation) => {
            variation.attributes.nodes.forEach((attribute) => {
                variations.push({ text: attribute.value, value: variation.databaseId })
            });
        });
        return (
            <Layout invertedHeader={false}>
                <SEO description={shopArticle.name} title={shopArticle.name} />
                <Container>
                    <section className="shop-item-section global-header-padding">
                        <article>
                            <Grid stackable columns="2">
                                <GridColumn width="6">
                                    <div className="shop-item-picture">
                                        <Img className="img-fluid rounded shadow" fluid={sources} />
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
                                        {shopArticle.price}
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
                                    <p dangerouslySetInnerHTML={{ __html: shopArticle.description }}>
                                    </p>
                                    <AddToCartButton product={shopArticle} variationId={this.state.variationId} />
                                </GridColumn>
                            </Grid>

                        </article>
                    </section>
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
                            }
                        }
                    }
                }
            }
        }
    }
`;
