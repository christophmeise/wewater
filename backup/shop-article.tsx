import { graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import { Trans } from "gatsby-plugin-react-i18next";
import React from "react";
import { Container, Grid, GridColumn, Header, Select } from "semantic-ui-react";
import AddToCartButton from "../components/Cart/AddToCartButton/AddToCartButton";
import Layout from "../components/Layout/Layout";
import Lightbox from "../components/Lightbox/lightbox";
import SEO from "../components/seo";
import { ShopItem } from "../components/ShopCard/shop-card";
import "./shop-article.less";

class ShopArticleTemplate extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      variationId: null,
      selectedImage: null,
      showLightbox: false,
    };
  }

  handleChange = (e, { value }) => this.setState({ variationId: value });

  handleOpen = (i) => {
    this.setState({ showLightbox: true, selectedImage: i });
  };

  handleClose = () => {
    this.setState({ showLightbox: false, selectedImage: null });
  };
  handlePrevRequest = (i, length) => (e) => {
    this.setState({ selectedImage: (i - 1 + length) % length });
  };
  handleNextRequest = (i, length) => (e) => {
    this.setState({ selectedImage: (i + 1) % length });
  };

  render() {
    const shopArticle: ShopItem =
      this.props.data.allWpVariableProduct.edges[0].node;
    const sources = shopArticle.image.localFile.childImageSharp.gatsbyImageData;
    const variations: any[] = [];

    /*     shopArticle.variations?.nodes.forEach((variation) => {
      variation.attributes.nodes.forEach((attribute) => {
        variations.push({ text: attribute.value, value: variation.databaseId });
      });
    }); */
    console.error("variations", variations);
    shopArticle.attributes.nodes.forEach((attribute) => {
      attribute.terms.nodes.forEach((option) => {
        variations.push({ text: option.name, value: option.databaseId });
      });
    });
    const gallery: any = [shopArticle.image].concat(
      shopArticle.galleryImages.nodes
    );
    const outOfStock: boolean =
      shopArticle.stockStatus === "OUT_OF_STOCK" ? true : false;
    return (
      <Layout>
        <SEO description={shopArticle.name} title={shopArticle.name} />
        <Container className="global-header-padding">
          <section className="shop-item-section">
            <article>
              {this.state.showLightbox && this.state.selectedImage !== null && (
                <Lightbox
                  images={gallery}
                  handleClose={this.handleClose}
                  handleNextRequest={this.handleNextRequest}
                  handlePrevRequest={this.handlePrevRequest}
                  selectedImage={this.state.selectedImage}
                />
              )}
              <Grid stackable columns="2">
                <GridColumn width="6">
                  <div
                    className="shop-item-picture rounded shadow"
                    onClick={() =>
                      this.setState({ showLightbox: true, selectedImage: 0 })
                    }
                  >
                    <GatsbyImage
                      image={sources}
                      className="img-fluid"
                      alt="shopitem"
                    />
                  </div>
                  <div className="shop-item-picture-gallery">
                    {shopArticle.galleryImages.nodes.map((galleryImg, i) => {
                      return (
                        <div
                          className="shop-item-picture-gallery-item rounded shadow"
                          key={i}
                          onClick={() =>
                            this.setState({
                              showLightbox: true,
                              selectedImage: i,
                            })
                          }
                        >
                          <GatsbyImage
                            alt="shopitem"
                            image={
                              galleryImg.localFile.childImageSharp
                                .gatsbyImageData
                            }
                            className="shop-item-picture-gallery-img"
                          />
                        </div>
                      );
                    })}
                  </div>
                </GridColumn>
                <GridColumn width="10">
                  <Header
                    data-sal="slide-up"
                    data-sal-delay="0"
                    data-sal-duration="300"
                    data-sal-easing="ease"
                    textAlign="left"
                    className="global-flex-column global-no-margin"
                  >
                    <h3 className={`global-subtitle text-primary`}>
                      {shopArticle.productCategories.nodes.map(
                        (node) => node.name
                      )}
                    </h3>
                    <h2 className="global-headline">{shopArticle.name}</h2>
                  </Header>
                  <h4 className="shop-article-price">
                    {shopArticle.onSale && (
                      <p className="shop-regular-price">
                        {shopArticle.regularPrice}
                      </p>
                    )}
                    <p>{shopArticle.price}</p>
                  </h4>
                  {variations != null && variations.length > 0 && (
                    <>
                      <h4 className="shop-article-variation-label">
                        <Trans>Auswahl</Trans>
                      </h4>
                      <div className="shop-article-variations">
                        <Select
                          placeholder="Select your variation"
                          options={variations}
                          onChange={this.handleChange.bind(this)}
                        />
                      </div>
                    </>
                  )}
                  {!outOfStock ? (
                    <AddToCartButton
                      product={shopArticle}
                      variationId={this.state.variationId}
                    />
                  ) : (
                    <strong className="sold-out-text">
                      <Trans>Aktuell leider ausverkauft!</Trans>
                    </strong>
                  )}
                  {shopArticle && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: shopArticle.description,
                      }}
                    ></div>
                  )}
                </GridColumn>
              </Grid>
            </article>
          </section>
        </Container>
      </Layout>
    );
  }
}

// WP GraphQL 1.6.7
// WPGraphQL WooCommerce (WooGraphQL)  0.10.6

export default ShopArticleTemplate;

export const pageQuery = graphql`
  query ShopArticleByPath($slug: String!, $language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      ...GetTranslations
    }
    allWpVariableProduct(filter: { slug: { eq: $slug } }) {
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
                  gatsbyImageData(width: 800, layout: CONSTRAINED)
                }
              }
            }
          }
          ... on WpVariableProduct {
            id
            name
            price
            stockStatus
            salePrice
            price
            regularPrice
            stockStatus
            attributes {
              nodes {
                id
                variation
                options
                ... on WpGlobalProductAttribute {
                  id
                  name
                  terms {
                    nodes {
                      name
                      id
                      databaseId
                    }
                  }
                }
              }
            }
          }
          image {
            localFile {
              childImageSharp {
                gatsbyImageData(width: 800, layout: CONSTRAINED)
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
