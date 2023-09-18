// i18next-extract-mark-ns-start page_shop
import { graphql } from "gatsby";
import { getImage } from "gatsby-plugin-image";
import { Trans } from "gatsby-plugin-react-i18next";
import React from "react";
import { Container, Grid, Header } from "semantic-ui-react";
import HeaderOverlayBackground from "../components/HeaderOverlay/header-overlay-background";
import Layout from "../components/Layout/Layout";
import SEO from "../components/seo";
import ShopWaterDonation from "../components/Shop/shop-water-donation";
import ShopCard, { ShopItem } from "../components/ShopCard/shop-card";
import { useTranslationHOC } from "../components/useTranslationHOC/useTranslationHOC";
import "./shop.less";

interface Props {
  pageContext: any;
  t: any;
  language: any;
  data: {
    mobileImage: any;
    desktopImage: any;
    products: {
      edges: [{ node: ShopItem }];
    };
  };
}

class ShopPage extends React.Component<Props, any> {
  constructor(props) {
    super(props);
  }

  render() {
    const { t, data, language } = this.props;

    const headerImage = getImage(data.desktopImage);
    const backgroundColor = "#7897B5";
    const shopItems = data.products.edges;
    console.error(shopItems);
    /*             .filter((item) => item.node.name.indexOf('Wasserspende über') < 0
                && item.node.name.indexOf('Don d\'eau') < 0
                && item.node.name.indexOf('Water donation of') < 0);
 */

    return (
      <Layout>
        <SEO title={t("ShopSEOTitle")} description={t("ShopSEODescription")} />
        <HeaderOverlayBackground
          content={
            <ShopWaterDonation t={t} inverted={true} language={language} />
          }
          color={backgroundColor}
          darken={false}
          inverted={false}
          sources={headerImage}
          width={8}
          floatRight={true}
        />
        <Container className="global-header-padding">
          <Header
            data-sal="slide-up"
            data-sal-delay="0"
            data-sal-duration="300"
            data-sal-easing="ease"
            textAlign="left"
            className="global-flex-column global-no-margin"
          >
            <h3 className={`global-subtitle text-primary`}>
              <Trans>Der Shop von WeWater</Trans>
            </h3>
            <h2 className="global-headline">
              <Trans>Entdecke Einzigartiges</Trans>
            </h2>
          </Header>
          <Grid style={{ paddingTop: "2em" }} stackable centered columns={3}>
            <Grid.Column>
              {shopItems
                .filter((shopItem) => shopItem.node.name.length > 0)
                .map(({ node: post }) => {
                  return (
                    shopItems.findIndex((entry) => entry.node.id === post.id) %
                      3 ===
                      0 && (
                      <div
                        className="shop-item-card-wrapper"
                        key={post.id}
                        data-sal="slide-up"
                        data-sal-delay="0"
                        data-sal-duration="300"
                        data-sal-easing="ease"
                      >
                        <ShopCard shopItem={post}></ShopCard>
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
                    shopItems.findIndex((entry) => entry.node.id === post.id) %
                      3 ===
                      1 && (
                      <div
                        className="shop-item-card-wrapper"
                        key={post.id}
                        data-sal="slide-up"
                        data-sal-delay="0"
                        data-sal-duration="300"
                        data-sal-easing="ease"
                      >
                        <ShopCard
                          shopItem={post}
                          data-sal="slide-up"
                          data-sal-delay="0"
                          data-sal-duration="300"
                          data-sal-easing="ease"
                        ></ShopCard>
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
                    shopItems.findIndex((entry) => entry.node.id === post.id) %
                      3 ===
                      2 && (
                      <div
                        className="shop-item-card-wrapper"
                        key={post.id}
                        data-sal="slide-up"
                        data-sal-delay="0"
                        data-sal-duration="300"
                        data-sal-easing="ease"
                      >
                        <ShopCard
                          shopItem={post}
                          data-sal="slide-up"
                          data-sal-delay="0"
                          data-sal-duration="300"
                          data-sal-easing="ease"
                        ></ShopCard>
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
export const pageQuery = graphql`
  query ($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      ...GetTranslations
    }
    desktopImage: file(relativePath: { eq: "images/shop/banner1.png" }) {
      childImageSharp {
        gatsbyImageData(quality: 100, layout: FULL_WIDTH)
      }
    }
    mobileImage: file(relativePath: { eq: "images/shop/banner1.png" }) {
      childImageSharp {
        gatsbyImageData(quality: 100, layout: FULL_WIDTH)
      }
    }
    products: allWpVariableProduct(
      sort: { fields: date, order: DESC }
      filter: { acf_product_lang: { language: { eq: "de" } } }
    ) {
      edges {
        node {
          id
          name
          description
          shortDescription
          date(formatString: "MMMM DD, YYYY", locale: $language)
          slug
          onSale
          status
          averageRating
          databaseId
          ... on WpVariableProduct {
            id
            name
            price
            salePrice
            regularPrice
          }
          image {
            localFile {
              childImageSharp {
                gatsbyImageData(width: 800, layout: CONSTRAINED)
              }
            }
          }
        }
      }
    }
  }
`;

export default useTranslationHOC(ShopPage);
