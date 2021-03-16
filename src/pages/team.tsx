// i18next-extract-mark-ns-start page_team
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import React from 'react';
import { Container, Header, Icon } from 'semantic-ui-react';
import HeaderOverlay from '../components/HeaderOverlay/header-overlay';
import Layout from '../components/Layout/Layout';
import SEO from '../components/seo';
import { useTranslationHOC } from '../components/useTranslationHOC/useTranslationHOC';
import './team.less';

interface Props {
    t: any;
    data: {
        mobileImage: any;
        desktopImage: any;
        allWpDtTeam: any;
    };
}

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

class TeamPage extends React.Component<Props, any> {
    constructor(props) {
        super(props);
    }

    render() {
        const { t, data } = this.props;

        const teamData = data.allWpDtTeam.edges.slice(3, data.allWpDtTeam.edges.length).reverse().concat(shuffle(data.allWpDtTeam.edges.slice(0, 3)));
        const headerImage = [
            data.mobileImage.childImageSharp.fluid,
            {
                ...data.desktopImage.childImageSharp.fluid,
                media: `(min-width: 768px)`,
            },
        ];

        return (
            <Layout>
                <SEO title={t('TeamSEOTitle')} description={t('TeamSEODescription')} />
                <HeaderOverlay content={<OverlayContent t={t} inverted={true} />} darken={true} inverted={false} sources={headerImage} width={16} />
                <Container>
                    <Container>
                        <div className="main-content-sections">
                            {/*                             <svg height="0" width="0" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <clipPath id="my-svg-mask">
                                        <path fill="#FFFFFF" d="M52.6,-49.9C68.4,-36.7,81.8,-18.4,82.5,0.7C83.2,19.9,71.4,39.7,55.6,55.7C39.7,71.8,19.9,84,0.8,83.2C-18.3,82.5,-36.7,68.8,-50.4,52.7C-64.1,36.7,-73.2,18.3,-74.3,-1.2C-75.5,-20.7,-68.8,-41.4,-55.1,-54.5C-41.4,-67.7,-20.7,-73.3,-1.2,-72.1C18.4,-70.9,36.7,-63,52.6,-49.9Z" transform="translate(100 100)" />
                                    </clipPath>
                                </defs>
                            </svg> */}
                            <section id="team-grid">
                                {teamData
                                    .filter((post) => post.node.title.length > 0)
                                    .map(({ node: post }) => {
                                        return (
                                            <div key={post.title} className="team-grid-member">
                                                <Img className="img-fluid rounded shadow mask5" fluid={post.featuredImage.node.localFile.childImageSharp.fluid} />

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
                                            </div>
                                        );
                                    })}
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
    query($language: String!) {
        locales: allLocale(filter: {language: {eq: $language}}) {
          ...GetTranslations
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

export default useTranslationHOC(TeamPage);
