import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import React from 'react';
import { Container, Grid, GridColumn } from 'semantic-ui-react';
import AddToCartButton from '../components/Cart/AddToCartButton/AddToCartButton';
import Layout from '../components/Layout/Layout';
import SEO from '../components/seo';
import { ShopItem } from '../components/ShopCard/shop-card';
import withI18next from '../components/withI18next/withI18next';
import './shop-article.less';

function ShopArticleTemplate({ data, t }) {
    const shopArticle: ShopItem = data.allWpProduct.edges[0].node;
    const sources = shopArticle.image.localFile.childImageSharp.fluid;

    return (
        <Layout title={shopArticle.name} invertedHeader={false} t={t}>
            <SEO lang="en" description={shopArticle.name} title={shopArticle.name} />
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
                                <h2 className="shop-item-headline">
                                    {shopArticle.name}
                                </h2>
                                <h3>
                                    {shopArticle.price}
                                </h3>
                                <p dangerouslySetInnerHTML={{ __html: shopArticle.description }}>
                                </p>
                                <AddToCartButton product={shopArticle} />
                            </GridColumn>
                        </Grid>

                    </article>
                </section>
            </Container>
        </Layout>
    );
}

export default withI18next('common')(ShopArticleTemplate);

const OverlayContent = ({ title, inverted }) => {
    return (
        <div>
            <h1
                className={`font-playfair text-shadow header-overlay-headline ${inverted ? 'header-overlay-headline-inverted' : null
                    }`}
            >
                {title}
            </h1>
        </div>
    );
};

export const pageQuery = graphql`
    query ShopArticleByPath($slug: String!) {
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
                    ... on WpSimpleProduct {
                        id
                        name
                        salePrice
                        price
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
