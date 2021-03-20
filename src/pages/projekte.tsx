// i18next-extract-mark-ns-start page_projekte
import { graphql } from 'gatsby';
import { Trans } from 'gatsby-plugin-react-i18next';
import React from 'react';
import { Container, Header } from 'semantic-ui-react';
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
        this.state = {
            filter: 0
        }
    }

    render() {
        const { data, t } = this.props;
        const posts = data.german.edges;

        return (
            <Layout>
                <SEO title={t('ProjekteSEOTitle')} description={t('ProjekteSEODescription')} />
                <Container className="global-header-padding">
                    <Header
                        data-sal="slide-up"
                        data-sal-delay="0"
                        data-sal-duration="300"
                        data-sal-easing="ease"
                        textAlign='left'
                        className="global-flex-column global-no-margin"
                    >
                        <h3 className={`global-subtitle text-primary`}><Trans>Projekte von WeWater</Trans></h3>
                        <h2 className="global-headline"><Trans>Projektübersicht</Trans></h2>
                    </Header>
                    <div className="projekt-filter-wrapper">
                        <h4>Projekte filtern</h4>
                        <div className="projekt-tag-wrapper">
                            <div className={`projekt-tag-label ${this.state.filter === 0 && 'projekt-tag-label-selected'}`}>
                                <span className="label-text" onClick={() => this.setState({ filter: 0 })}>Alle Projekte</span>
                            </div>
                            <div className={`projekt-tag-label ${this.state.filter === 1 && 'projekt-tag-label-selected'}`}>
                                <span className="label-text" onClick={() => this.setState({ filter: 1 })}>In Arbeit</span>
                            </div>
                            <div className={`projekt-tag-label ${this.state.filter === 2 && 'projekt-tag-label-selected'}`}>
                                <span className="label-text" onClick={() => this.setState({ filter: 2 })}>Abgeschlossen</span>
                            </div>
                        </div>

                    </div>
                    <div className="projekt-card-grid">
                        {posts
                            .filter((post) => post.node.title.length > 0)
                            .filter((post) => this.state.filter === 0 ||
                                this.state.filter === 1 && post.node.categories?.nodes.find((categoryNode) => categoryNode.name === 'In Arbeit') != null ||
                                this.state.filter === 2 && post.node.categories?.nodes.find((categoryNode) => categoryNode.name === 'In Arbeit') == null
                            )
                            .map(({ node: post }) => {
                                return (
                                    <div key={post.id} className="projekt-post-card-wrapper">
                                        <ProjektCard post={post} ></ProjektCard>
                                    </div>
                                );
                            })}
                    </div>
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
        german: allWpProjekt(
            sort: { fields: date, order: DESC }
        ) {
            edges {
                node {
                    id
                    title
                    excerpt
                    date(formatString: "MMMM DD, YYYY", locale: "de")
                    uri
                    slug
                     author {
                        node {
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
                    blocks {
                        name
                        saveContent
                            innerBlocks {
                                name
                                saveContent
                                innerBlocks {
                                    name
                                    saveContent
                                }
                        }
                    }
                }
            }
        }
    }
`;

export default useTranslationHOC(ProjektePage);
/*
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
        } */
