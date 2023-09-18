// i18next-extract-mark-ns-start page_checkout
import { graphql } from "gatsby";
import React from "react";
import { Container } from "semantic-ui-react";
import CheckoutForm from "../../src/components/Checkout/CheckoutForm/CheckoutForm";
import Layout from "../../src/components/Layout/Layout";
import SEO from "../../src/components/seo";
import { ShopItem } from "../../src/components/ShopCard/shop-card";
import { useTranslationHOC } from "../../src/components/useTranslationHOC/useTranslationHOC";

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
      edges: [{ node: ShopItem }];
    };
  };
}

class ShopPage extends React.Component<Props, any> {
  constructor(props) {
    super(props);
  }

  render() {
    const { t } = this.props;

    return (
      <Layout>
        <SEO
          title={t("CheckoutSEOTitle")}
          description={t("CheckoutSEODescription")}
        />
        <Container className="global-header-padding">
          <CheckoutForm />
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
    desktopImage: file(relativePath: { eq: "images/projekte/banner.jpeg" }) {
      childImageSharp {
        gatsbyImageData(quality: 100, layout: FULL_WIDTH)
      }
    }
    mobileImage: file(
      relativePath: { eq: "images/projekte/banner-mobile.jpeg" }
    ) {
      childImageSharp {
        gatsbyImageData(quality: 100, layout: FULL_WIDTH)
      }
    }
    german: allWpVariableProduct(sort: { fields: date, order: DESC }) {
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
