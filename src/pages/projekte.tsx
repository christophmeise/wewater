// i18next-extract-mark-ns-start page_projekte
import { graphql } from 'gatsby';
import { Trans } from 'gatsby-plugin-react-i18next';
import React from 'react';
import { Container, Grid, Header } from 'semantic-ui-react';
import HeaderOverlay from '../components/HeaderOverlay/header-overlay';
import Layout from '../components/Layout/Layout';
import ProjektCard from '../components/ProjektCard/projekt-card';
import SEO from '../components/seo';
import { useTranslationHOC } from '../components/useTranslationHOC/useTranslationHOC';
import './projekte.less';


interface Props {
    t: any;
    data: {
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
        const { data, t } = this.props;

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
            <Layout>
                <SEO title={t('ProjekteSEOTitle')} description={t('ProjekteSEODescription')} />
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
                        <h3 className={`global-subtitle text-primary`}><Trans>Projekte von WeWater</Trans></h3>
                        <h2 className="global-headline"><Trans>Projektübersicht</Trans></h2>
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
    query($language: String!) {
        locales: allLocale(filter: {language: {eq: $language}}) {
          ...GetTranslations
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

export default useTranslationHOC(ProjektePage);
