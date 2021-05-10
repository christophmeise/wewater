import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import { Link, Trans } from 'gatsby-plugin-react-i18next';
import React from 'react';
import { Button, Container, Grid, GridColumn, GridRow, Header, Icon } from 'semantic-ui-react';
import './filtersysteme.less';

const SectionFiltersysteme = () => {
    const data = useStaticQuery(
        graphql`query FiltersystemeQuery {
  image1: file(relativePath: {eq: "images/filtersysteme/image1.jpg"}) {
    childImageSharp {
      gatsbyImageData(width: 600, quality: 90, layout: CONSTRAINED, placeholder: NONE)
    }
  }
  image2: file(relativePath: {eq: "images/filtersysteme/image2.jpg"}) {
    childImageSharp {
      gatsbyImageData(width: 600, quality: 90, layout: CONSTRAINED, placeholder: NONE)
    }
  }
  image3: file(relativePath: {eq: "images/filtersysteme/image3.jpg"}) {
    childImageSharp {
      gatsbyImageData(width: 600, quality: 90, layout: CONSTRAINED, placeholder: NONE)
    }
  }
  image4: file(relativePath: {eq: "images/filtersysteme/image4.jpg"}) {
    childImageSharp {
      gatsbyImageData(width: 600, quality: 90, layout: CONSTRAINED, placeholder: NONE)
    }
  }
  image5: file(relativePath: {eq: "images/filtersysteme/image5.jpg"}) {
    childImageSharp {
      gatsbyImageData(width: 600, quality: 90, layout: CONSTRAINED, placeholder: NONE)
    }
  }
  image6: file(relativePath: {eq: "images/filtersysteme/image6.jpg"}) {
    childImageSharp {
      gatsbyImageData(width: 600, quality: 90, layout: CONSTRAINED, placeholder: NONE)
    }
  }
  blob: file(relativePath: {eq: "images/filtersysteme/blob.png"}) {
    childImageSharp {
      gatsbyImageData(width: 800, quality: 90, layout: CONSTRAINED, placeholder: NONE)
    }
  }
}
`,
    );

    return (
        <section className="main-section bg-secondary filtersysteme-section">
            <Container>
                <div className="filtersysteme-grid-desktop">
                    <Grid stackable centered>
                        <GridRow columns="2" className="filtersysteme-img-horizontal">
                            <GridColumn>
                                <Link to="/filtersysteme/aqqasystem">
                                    <div className="background-image-wrapper filtersysteme-dark-overlay">
                                        <GatsbyImage
                                            image={data.image1.childImageSharp.gatsbyImageData}
                                            className="rounded shadow"
                                            alt="image 1"
                                        >
                                        </GatsbyImage>
                                        <div className="background-text-container">
                                            <p>AQQAsystem</p>
                                        </div>
                                    </div>
                                </Link>
                            </GridColumn>
                            <GridColumn>
                                <Link to="/filtersysteme/aqqacube">
                                    <div className="background-image-wrapper filtersysteme-dark-overlay">
                                        <GatsbyImage
                                            image={data.image2.childImageSharp.gatsbyImageData}
                                            className="rounded shadow"
                                            alt="image 1"
                                        >
                                        </GatsbyImage>
                                        <div className="background-text-container">
                                            <p>AQQAcube</p>
                                        </div>
                                    </div>
                                </Link>
                            </GridColumn>
                        </GridRow>
                        <GridRow columns="3" className="filtersysteme-img-vertical">
                            <GridColumn className="filtersysteme-align-left" width="4">
                                <Link to="/filtersysteme/aqqabag">
                                    <div className="background-image-wrapper filtersysteme-dark-overlay">
                                        <GatsbyImage
                                            image={data.image3.childImageSharp.gatsbyImageData}
                                            className="rounded shadow"
                                            alt="image 1"
                                        >
                                        </GatsbyImage>
                                        <div className="background-text-container">
                                            <p>AQQAbag</p>
                                        </div>
                                    </div>
                                </Link>
                            </GridColumn>
                            <GridColumn width="8">
                                {/* empty */}
                            </GridColumn>
                            <GridColumn className="filtersysteme-align-right" width="4">
                                <Link to="/filtersysteme/aqqacube">
                                    <div className="background-image-wrapper filtersysteme-dark-overlay">
                                        <GatsbyImage
                                            image={data.image4.childImageSharp.gatsbyImageData}
                                            className="rounded shadow"
                                            alt="image 1"
                                        >
                                        </GatsbyImage>
                                        <div className="background-text-container">
                                            <p>AQQAcube</p>
                                        </div>
                                    </div>
                                </Link>
                            </GridColumn>
                        </GridRow>
                        <GridRow columns="2" className="filtersysteme-img-horizontal">
                            <GridColumn>
                                <Link to="/filtersysteme/aqqabag">
                                    <div className="background-image-wrapper filtersysteme-dark-overlay">
                                        <GatsbyImage
                                            image={data.image5.childImageSharp.gatsbyImageData}
                                            className="rounded shadow"
                                            alt="image 1"
                                        >
                                        </GatsbyImage>
                                        <div className="background-text-container">
                                            <p>AQQAbag</p>
                                        </div>
                                    </div>
                                </Link>
                            </GridColumn>
                            <GridColumn>
                                <Link to="/filtersysteme/aqqasystem">
                                    <div className="background-image-wrapper filtersysteme-dark-overlay">
                                        <GatsbyImage
                                            image={data.image6.childImageSharp.gatsbyImageData}
                                            className="rounded shadow"
                                            alt="image 1"
                                        >
                                        </GatsbyImage>
                                        <div className="background-text-container">
                                            <p>AQQAsystem</p>
                                        </div>
                                    </div>
                                </Link>
                            </GridColumn>
                        </GridRow>
                    </Grid>
                    <div className="filtersysteme-blob-wrapper">
                        <div className="background-image-wrapper">
                            <GatsbyImage
                                image={data.blob.childImageSharp.gatsbyImageData}
                                className="filtersysteme-blob"
                                alt="image 1"
                            >
                            </GatsbyImage>
                            <div className="background-text-container-blob">
                                <TextContent />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="filtersysteme-grid-mobile">
                    <TextContent />
                </div>
            </Container>
        </section >
    );
};

const TextContent = () => {
    return (
        <Container textAlign="center">
            <Header
                data-sal="slide-up"
                data-sal-delay="0"
                data-sal-duration="300"
                data-sal-easing="ease"
                textAlign='center'
                className="global-flex-column global-no-margin"
            >
                <h3 className={`global-subtitle text-primary`}><Trans>Innovative Technik, die sich bewährt hat</Trans></h3>
                <h2 className="global-headline"><Trans>Filtersysteme für jeden Anwendungsfall</Trans></h2>
            </Header>
            <p><Trans>Seit unserer Gründung 2018 setzen wir unsere Filtersysteme in eigenen Spendenprojekten sowie zusammen mit NGO-Partnern ein. 8300 Menschen in 8 Dörfern, Schulen und Krankenhäusern haben damit inzwischen eine Lebensgrundlage geschaffen, auf die sie aufbauen können.</Trans></p>
            <Link to='/filtersystem'>
                <Button
                    primary
                    inverted={false}
                    size="medium"
                    className="rounded shadow hover-animate"
                >
                    <Icon name="grid layout" className="left" style={{ opacity: '1' }}></Icon>
                    <Trans>Entdecke alle Filtersysteme</Trans>
                </Button>
            </Link>
        </Container>
    );
}

export default SectionFiltersysteme;
