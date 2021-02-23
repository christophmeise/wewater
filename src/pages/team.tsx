import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import React from 'react';
import { Container, Grid, GridColumn, GridRow, Header, Icon } from 'semantic-ui-react';
import HeaderOverlay from '../components/HeaderOverlay/header-overlay';
import Layout from '../components/Layout/Layout';
import SEO from '../components/seo';
import withI18next from '../components/withI18next/withI18next';
import './team.less';

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
        allWpDtTeam: any;
    };
}

class TeamPage extends React.Component<Props, any> {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            pageContext: { locale },
            t,
        } = this.props;
        const data = this.props.data;
        const siteTitle = data.site.siteMetadata.title;
        const description = data.site.siteMetadata.description;
        const teamData = data.allWpDtTeam.edges.reverse();
        const headerImage = [
            data.mobileImage.childImageSharp.fluid,
            {
                ...data.desktopImage.childImageSharp.fluid,
                media: `(min-width: 768px)`,
            },
        ];
        const sources = teamData[0].node.featuredImage.node.localFile.childImageSharp.fluid;

        return (
            <Layout title={siteTitle} t={t}>
                <SEO title="Team" />
                <HeaderOverlay content={<OverlayContent t={t} inverted={true} />} color="#ffffff" darken={true} inverted={false} sources={headerImage} width={16} />
                <Container>
                    <Container>
                        <div className="main-content-sections">
                            <section id="team-grid">
                                <Grid>
                                    {teamData
                                        .filter((post) => post.node.title.length > 0)
                                        .map(({ node: post }) => {
                                            return (
                                                <GridRow className="team-grid-member" columns="2">
                                                    <GridColumn>
                                                        <Header
                                                            data-sal="slide-up"
                                                            data-sal-delay="0"
                                                            data-sal-duration="300"
                                                            data-sal-easing="ease"
                                                            textAlign='left'
                                                            className="global-flex-column global-no-margin"
                                                        >
                                                            <h3 className={`global-subtitle text-primary`}>FOUNDER</h3>
                                                            <h2 className="global-headline">{post.title}</h2>
                                                        </Header>
                                                        <p dangerouslySetInnerHTML={{ __html: post.excerpt }}></p>
                                                        <div>
                                                            <a
                                                                href="https://www.facebook.com/wewater.org/"
                                                                target="_blank"
                                                                rel="noopener"
                                                                aria-label="Facebook"
                                                            >
                                                                <Icon className="hover-animate" size="large" name="facebook"></Icon>
                                                            </a>
                                                            <a
                                                                href="https://www.instagram.com/wewater_org/"
                                                                target="_blank"
                                                                rel="noopener"
                                                                aria-label="Instagram"
                                                            >
                                                                <Icon className="hover-animate" size="large" name="instagram"></Icon>
                                                            </a>
                                                            <a
                                                                href="https://www.youtube.com/channel/UC3zOjWWL5drSnoxzcj3-jqw"
                                                                target="_blank"
                                                                rel="noopener"
                                                                aria-label="Youtube"
                                                            >
                                                                <Icon className="hover-animate" size="large" name="youtube"></Icon>
                                                            </a>
                                                        </div>
                                                    </GridColumn>
                                                    <GridColumn>
                                                        <Img className="img-fluid rounded shadow" fluid={post.featuredImage.node.localFile.childImageSharp.fluid} />

                                                    </GridColumn>
                                                </GridRow>

                                            );
                                        })}
                                </Grid>

                                {/*   <Grid style={{ paddingTop: '2em' }} stackable centered columns={3}>
                                    <Grid.Column data-sal="slide-up" data-sal-delay="0" data-sal-duration="300" data-sal-easing="ease">
                                        {teamData
                                            .filter((post) => post.node.title.length > 0)
                                            .map(({ node: post }) => {
                                                return (
                                                    <div>{post.title}</div>
                                                );
                                            })}
                                    </Grid.Column>
                                </Grid> */}
                            </section>
                        </div>
                    </Container>
                </Container>
            </Layout>
        );
    }
}

class OverlayContent extends React.Component<any, any> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        const { inverted, t } = this.props;

        return (
            <div className="header-overlay-headline-container">
                <h1
                    className={`header-overlay-headline ${inverted ? 'header-overlay-headline-inverted' : ''}`}
                    style={{ marginBottom: '1.5rem' }}
                >
                    {t('page_team:headline')}
                </h1>
            </div>
        );
    }
}

export const pageQuery = graphql`
    query {
        site {
            siteMetadata {
                title
                description
            }
        }
        desktopImage: file(relativePath: { eq: "images/team/banner.jpeg" }) {
            childImageSharp {
                fluid(maxWidth: 1600, quality: 100) {
                    ...GatsbyImageSharpFluid_withWebp
                }
            }
        }
        mobileImage: file(relativePath: { eq: "images/team/banner-mobile.jpeg" }) {
            childImageSharp {
                fluid(maxWidth: 1200, quality: 100) {
                    ...GatsbyImageSharpFluid_withWebp
                }
            }
        }
        allWpDtTeam {
            edges {
                node {
                    title
                    excerpt
                    featuredImage {
                        node {
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
    }
`;

export default withI18next(['common', 'page_team'])(TeamPage);
