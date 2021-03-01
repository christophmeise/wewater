import { graphql, Link, useStaticQuery } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';
import Img from 'gatsby-image';
import { Trans } from 'gatsby-plugin-react-i18next';
import React from 'react';
import { Button, Container, Grid, GridColumn, GridRow, Header, Icon } from 'semantic-ui-react';
import './filtersysteme.less';

const SectionFiltersysteme = () => {
    const data = useStaticQuery(
        graphql` query FiltersystemeQuery {
            image1: file(relativePath: { eq: "images/filtersysteme/image1.jpg" }) {
                childImageSharp {
                    fluid(maxWidth: 1600, quality: 100) {
                        ...GatsbyImageSharpFluid_withWebp
                    }
                }
            }
            image2: file(relativePath: { eq: "images/filtersysteme/image2.jpg" }) {
                childImageSharp {
                    fluid(maxWidth: 1200, quality: 100) {
                        ...GatsbyImageSharpFluid_withWebp
                    }
                }
            }
            image3: file(relativePath: { eq: "images/filtersysteme/image3.jpg" }) {
                childImageSharp {
                    fluid(maxWidth: 1600, quality: 100) {
                        ...GatsbyImageSharpFluid_withWebp
                    }
                }
            }
            image4: file(relativePath: { eq: "images/filtersysteme/image4.jpg" }) {
                childImageSharp {
                    fluid(maxWidth: 1200, quality: 100) {
                        ...GatsbyImageSharpFluid_withWebp
                    }
                }
            }
            image5: file(relativePath: { eq: "images/filtersysteme/image5.jpg" }) {
                childImageSharp {
                    fluid(maxWidth: 1600, quality: 100) {
                        ...GatsbyImageSharpFluid_withWebp
                    }
                }
            }
            image6: file(relativePath: { eq: "images/filtersysteme/image6.jpg" }) {
                childImageSharp {
                    fluid(maxWidth: 1200, quality: 100) {
                        ...GatsbyImageSharpFluid_withWebp
                    }
                }
            }
            blob: file(relativePath: { eq: "images/filtersysteme/blob.png" }) {
                childImageSharp {
                    fluid(maxWidth: 1200, quality: 100) {
                        ...GatsbyImageSharpFluid_withWebp
                    }
                }
            }
        }`,
    );

    return (
        <section className="main-section bg-secondary filtersysteme-section" style={{ padding: '3rem 0rem' }}>
            <Container>
                <Grid style={{ paddingTop: '2em' }} stackable centered>
                    <GridRow columns="2" className="filtersysteme-img-horizontal">
                        <GridColumn>
                            <Img className="img-fluid rounded shadow" fluid={data.image1.childImageSharp.fluid} />
                        </GridColumn>
                        <GridColumn>
                            <Img className="img-fluid rounded shadow" fluid={data.image2.childImageSharp.fluid} />
                        </GridColumn>
                    </GridRow>
                    <GridRow columns="3" className="filtersysteme-img-vertical">
                        <GridColumn>
                            <Img className="img-fluid rounded shadow" fluid={data.image3.childImageSharp.fluid} />
                        </GridColumn>
                        <GridColumn>
                            {/* empty */}
                        </GridColumn>
                        <GridColumn className="filtersysteme-align-right">
                            <Img className="img-fluid rounded shadow" fluid={data.image4.childImageSharp.fluid} />
                        </GridColumn>
                    </GridRow>
                    <GridRow columns="2" className="filtersysteme-img-horizontal">
                        <GridColumn>
                            <Img className="img-fluid rounded shadow" fluid={data.image5.childImageSharp.fluid} />
                        </GridColumn>
                        <GridColumn>
                            <Img className="img-fluid rounded shadow" fluid={data.image6.childImageSharp.fluid} />
                        </GridColumn>
                    </GridRow>
                </Grid>
                <BackgroundImage
                    className="filtersysteme-blob"
                    fluid={data.blob.childImageSharp.fluid}>
                    <Container textAlign="center">
                        <Header
                            data-sal="slide-up"
                            data-sal-delay="0"
                            data-sal-duration="300"
                            data-sal-easing="ease"
                            textAlign='center'
                            className="global-flex-column global-no-margin"
                        >
                            <h3 className={`global-subtitle text-primary`}><Trans>Weil's an Wasser mangelt. Nicht an guten Ideen.</Trans></h3>
                            <h2 className="global-headline"><Trans>Filtersysteme für jeden Anwendungsfall</Trans></h2>
                        </Header>
                        <p><Trans>Dennoch leiden weltweit 844 Millionen Menschen Durst oder erkranken an verschmutztem Wasser. Unsere Mission ist es, diesen Menschen durch sauberes Trinkwasser eine existentielle Lebensgrundlage zu ermöglichen.</Trans></p>
                        <Link to='/blog'>
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
                </BackgroundImage>

            </Container>
        </section >
    );
};

export default SectionFiltersysteme;
