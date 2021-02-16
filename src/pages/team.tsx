import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import React from 'react';
import { Container, Header } from 'semantic-ui-react';
import HeaderOverlay from '../components/HeaderOverlay/header-overlay';
import Layout from '../components/Layout';
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
        const teamData = data.allWpDtTeam.edges;
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
                <HeaderOverlay content={<OverlayContent t={t} inverted={true} />} color="#ffffff" darken={true} inverted={false} sources={headerImage} width={12} />
                <Container>
                    <Container>
                        <div className="main-content-sections">
                            <section>
                                <Header
                                    data-sal="slide-up"
                                    data-sal-delay="0"
                                    data-sal-duration="300"
                                    data-sal-easing="ease"
                                    textAlign='center'
                                    className="global-flex-column global-no-margin"
                                >
                                    <h3 className={`global-subtitle text-primary`}>News von WeWater</h3>
                                    <h2 className="global-headline">Neuigkeiten</h2>
                                </Header>
                                <div id="team-grid">
                                    {teamData
                                        .filter((post) => post.node.title.length > 0)
                                        .map(({ node: post }) => {
                                            return (
                                                <div className="team-grid-member">
                                                    <Img className="img-fluid rounded shadow" fluid={post.featuredImage.node.localFile.childImageSharp.fluid} />
                                                    <h5>{post.title}</h5>
                                                </div>
                                            );
                                        })}
                                </div>
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
            <div>
                <h1
                    className={`header-overlay-headline ${inverted ? 'header-overlay-headline-inverted' : ''}`}
                    style={{ marginBottom: '1.5rem' }}
                >
                    {t('page_team:headline')}
                </h1>
                <h2 className={`header-overlay-subheadline ${inverted ? 'header-overlay-subheadline-inverted' : ''}`}
                    style={{ marginBottom: '1.5rem', marginTop: '0rem' }}>
                    {t('page_team:subheadline')}
                </h2>
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
