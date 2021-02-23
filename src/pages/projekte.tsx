import { graphql } from 'gatsby';
import React from 'react';
import { Container, Grid, Header } from 'semantic-ui-react';
import HeaderOverlay from '../components/HeaderOverlay/header-overlay';
import Layout from '../components/Layout/Layout';
import ProjektCard from '../components/ProjektCard/projekt-card';
import SEO from '../components/seo';
import withI18next from '../components/withI18next/withI18next';
import './projekte.less';

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
        german: any;
    };
}

class ProjektePage extends React.Component<Props, any> {
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

        const headerImage = [
            data.mobileImage.childImageSharp.fluid,
            {
                ...data.desktopImage.childImageSharp.fluid,
                media: `(min-width: 768px)`,
            },
        ];
        const backgroundColor = '#FFFFFF';
        const posts = data.german.edges;

        return (
            <Layout title={siteTitle} t={t}>
                <SEO title="Projekte" />
                <HeaderOverlay content={<OverlayContent t={t} inverted={true} />} color={backgroundColor} darken={false} inverted={false} sources={headerImage} width={12} />
                <Container className="global-header-padding">
                    <Header
                        data-sal="slide-up"
                        data-sal-delay="0"
                        data-sal-duration="300"
                        data-sal-easing="ease"
                        textAlign='center'
                        className="global-flex-column global-no-margin"
                    >
                        <h3 className={`global-subtitle text-primary`}>Projekte von WeWater</h3>
                        <h2 className="global-headline">Projektübersicht</h2>
                    </Header>
                    <Grid style={{ paddingTop: '2em' }} stackable centered columns={2}>
                        <Grid.Column>
                            {posts
                                .filter((post) => post.node.title.length > 0)
                                .map(({ node: post }) => {
                                    return (
                                        posts.findIndex((entry) => entry.node.id === post.id) % 2 === 0 && (
                                            <div className="projekt-post-card-wrapper" data-sal="slide-up" data-sal-delay="0" data-sal-duration="300" data-sal-easing="ease">
                                                <ProjektCard key={post.id} post={post} ></ProjektCard>
                                            </div>
                                        )
                                    );
                                })}
                        </Grid.Column>
                        <Grid.Column>
                            {posts
                                .filter((post) => post.node.title.length > 0)
                                .map(({ node: post }) => {
                                    return (
                                        posts.findIndex((entry) => entry.node.id === post.id) % 2 === 1 && (
                                            <div className="projekt-post-card-wrapper" data-sal="slide-up" data-sal-delay="0" data-sal-duration="300" data-sal-easing="ease">
                                                <ProjektCard key={post.id} post={post} data-sal="slide-up" data-sal-delay="0" data-sal-duration="300" data-sal-easing="ease"></ProjektCard>
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
                    {t('page_projekte:headline')}
                </h1>
                <h2 className={`header-overlay-subheadline ${inverted ? 'header-overlay-subheadline-inverted' : ''}`}
                    style={{ marginBottom: '1.5rem', marginTop: '0rem' }}>
                    {t('page_projekte:subheadline')}
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
        desktopImage: file(relativePath: { eq: "images/projekte/banner.jpeg" }) {
            childImageSharp {
                fluid(maxWidth: 1600, quality: 100) {
                    ...GatsbyImageSharpFluid_withWebp
                }
            }
        }
        mobileImage: file(relativePath: { eq: "images/projekte/banner-mobile.jpeg" }) {
            childImageSharp {
                fluid(maxWidth: 1200, quality: 100) {
                    ...GatsbyImageSharpFluid_withWebp
                }
            }
        }
        german: allWpDtPortfolio(
            sort: { fields: date, order: DESC }
        ) {
            edges {
                node {
                    id
                    author {
                        node {
                            firstName
                            lastName
                        }
                    }
                    excerpt
                    title
                    date(formatString: "MMMM DD, YYYY", locale: "de")
                    uri
                    slug
                    dt_portfolio_categories{
                        nodes {
                            name
                        }
                    }
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

export default withI18next(['common', 'page_projekte'])(ProjektePage);
