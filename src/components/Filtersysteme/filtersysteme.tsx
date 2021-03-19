import { graphql, useStaticQuery } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';
import { Link, Trans } from 'gatsby-plugin-react-i18next';
import React from 'react';
import { Button, Container, Grid, GridColumn, GridRow, Header, Icon } from 'semantic-ui-react';
import './filtersysteme.less';

const SectionFiltersysteme = () => {
    const data = useStaticQuery(
        graphql` query FiltersystemeQuery {
            image1: file(relativePath: { eq: "images/filtersysteme/image1.jpg" }) {
                childImageSharp {
                    fluid(maxWidth: 600, quality: 100) {
                        ...GatsbyImageSharpFluid_withWebp
                    }
                }
            }
            image2: file(relativePath: { eq: "images/filtersysteme/image2.jpg" }) {
                childImageSharp {
                    fluid(maxWidth: 600, quality: 100) {
                        ...GatsbyImageSharpFluid_withWebp
                    }
                }
            }
            image3: file(relativePath: { eq: "images/filtersysteme/image3.jpg" }) {
                childImageSharp {
                    fluid(maxWidth: 600, quality: 100) {
                        ...GatsbyImageSharpFluid_withWebp
                    }
                }
            }
            image4: file(relativePath: { eq: "images/filtersysteme/image4.jpg" }) {
                childImageSharp {
                    fluid(maxWidth: 600, quality: 100) {
                        ...GatsbyImageSharpFluid_withWebp
                    }
                }
            }
            image5: file(relativePath: { eq: "images/filtersysteme/image5.jpg" }) {
                childImageSharp {
                    fluid(maxWidth: 600, quality: 100) {
                        ...GatsbyImageSharpFluid_withWebp
                    }
                }
            }
            image6: file(relativePath: { eq: "images/filtersysteme/image6.jpg" }) {
                childImageSharp {
                    fluid(maxWidth: 600, quality: 100) {
                        ...GatsbyImageSharpFluid_withWebp
                    }
                }
            }
            blob: file(relativePath: { eq: "images/filtersysteme/blob.png" }) {
                childImageSharp {
                    fluid(maxWidth: 800, quality: 100) {
                        ...GatsbyImageSharpFluid_withWebp
                    }
                }
            }
        }`,
    );

    return (
        <section className="main-section bg-secondary filtersysteme-section">
            <Container>
                <div className="filtersysteme-grid-desktop">
                    <Grid stackable centered>
                        <GridRow columns="2" className="filtersysteme-img-horizontal">
                            <GridColumn>
                                <BackgroundImage className="img-fluid rounded shadow filtersysteme-dark-overlay" fluid={data.image1.childImageSharp.fluid}>
                                    <p>AQQAbag</p>
                                </BackgroundImage>
                            </GridColumn>
                            <GridColumn>
                                <BackgroundImage className="img-fluid rounded shadow filtersysteme-dark-overlay" fluid={data.image2.childImageSharp.fluid} >
                                    <p>AQQAbag</p>
                                </BackgroundImage>
                            </GridColumn>
                        </GridRow>
                        <GridRow columns="3" className="filtersysteme-img-vertical">
                            <GridColumn>
                                <BackgroundImage className="img-fluid rounded shadow filtersysteme-dark-overlay" fluid={data.image3.childImageSharp.fluid} >
                                    <p>AQQAbag</p>
                                </BackgroundImage>
                            </GridColumn>
                            <GridColumn>
                                {/* empty */}
                            </GridColumn>
                            <GridColumn className="filtersysteme-align-right">
                                <BackgroundImage className="img-fluid rounded shadow filtersysteme-dark-overlay" fluid={data.image4.childImageSharp.fluid} >
                                    <p>AQQAbag</p>
                                </BackgroundImage>
                            </GridColumn>
                        </GridRow>
                        <GridRow columns="2" className="filtersysteme-img-horizontal">
                            <GridColumn>
                                <BackgroundImage className="img-fluid rounded shadow filtersysteme-dark-overlay" fluid={data.image5.childImageSharp.fluid} >
                                    <p>AQQAbag</p>
                                </BackgroundImage>
                            </GridColumn>
                            <GridColumn>
                                <BackgroundImage className="img-fluid rounded shadow filtersysteme-dark-overlay" fluid={data.image6.childImageSharp.fluid} >
                                    <p>AQQAbag</p>
                                </BackgroundImage>
                            </GridColumn>
                        </GridRow>
                    </Grid>
                    <BackgroundImage
                        className="filtersysteme-blob"
                        fluid={data.blob.childImageSharp.fluid}>
                        <TextContent />
                    </BackgroundImage>
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
                <h3 className={`global-subtitle text-primary`}><Trans>Weil's an Trinkwasser mangelt, <br /> nicht an guten Ideen.</Trans></h3>
                <h2 className="global-headline"><Trans>Filtersysteme für jeden Anwendungsfall</Trans></h2>
            </Header>
            <p><Trans>844 Millionen Menschen Durst oder erkranken an verschmutztem Wasser. Unsere Mission ist es, diesen Menschen durch sauberes Trinkwasser eine existentielle Lebensgrundlage zu ermöglichen.</Trans></p>
            <Link to='/filtersystem'>
                <Button
                    primary
                    inverted={false}
                    size="medium"
                    className="rounded shadow hover-animate"
                >
                    <Icon name="grid layout" className="left" style={{ opacity: '1' }}></Icon>
                    <Trans>Alle Filtersysteme entdecken</Trans>
                </Button>
            </Link>
        </Container>
    );
}

export default SectionFiltersysteme;
