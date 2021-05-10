// i18next-extract-mark-ns-start page_team
import { graphql } from 'gatsby';
import { GatsbyImage, getImage, withArtDirection } from "gatsby-plugin-image";
import { Trans } from 'gatsby-plugin-react-i18next';
import React from 'react';
import { Container, Header, Icon } from 'semantic-ui-react';
import HeaderOverlay from '../components/HeaderOverlay/header-overlay';
import Layout from '../components/Layout/Layout';
import SEO from '../components/seo';
import { useTranslationHOC } from '../components/useTranslationHOC/useTranslationHOC';
import './team.less';


interface Props {
    t: any;
    language: any;
    data: {
        mobileImage: any;
        desktopImage: any;
        allWpTeamMember: any;
        teamImage: any;
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
        const { t, data, language } = this.props;

        const teamData = data.allWpTeamMember.edges;

        const headerImage = withArtDirection(getImage(data.mobileImage), [
            {
                media: "(min-width: 768px)",
                image: getImage(data.desktopImage),
            },
        ]);

        return (
            <Layout>
                <SEO title={t('TeamSEOTitle')} description={t('TeamSEODescription')} />
                <HeaderOverlay content={<OverlayContent t={t} inverted={true} />} darken={true} inverted={false} sources={headerImage} width={16} />
                <Container>
                    <div className="main-content-sections">
                        <section id="team-grid">
                            {teamData
                                .filter((post) => post.node.title.length > 0)
                                .map(({ node: post }) => {
                                    return (
                                        <div key={post.title} className="team-grid-member">
                                            <GatsbyImage
                                                alt="Team overview picture"
                                                image={post.featuredImage.node.localFile.childImageSharp.gatsbyImageData}
                                                className="img-fluid rounded shadow" />
                                            <Header
                                                data-sal="slide-up"
                                                data-sal-delay="0"
                                                data-sal-duration="300"
                                                data-sal-easing="ease"
                                                textAlign='left'
                                                className="global-flex-column global-no-margin"
                                            >
                                                {
                                                    language === 'de' &&
                                                    <h3 className={`global-subtitle text-primary`}>{post?.acf_team?.kurzbeschreibung}</h3>
                                                }
                                                {
                                                    language === 'en' &&
                                                    <h3 className={`global-subtitle text-primary`}>{post?.acf_team?.kurzbeschreibungEnglisch}</h3>
                                                }
                                                {
                                                    language === 'fr' &&
                                                    <h3 className={`global-subtitle text-primary`}>{post?.acf_team?.kurzbeschreibungFr}</h3>
                                                }

                                                <h2 className="global-headline">{post.title}</h2>
                                            </Header>
                                            {
                                                language === 'de' &&
                                                <p dangerouslySetInnerHTML={{ __html: post.acf_team?.description }}></p>
                                            }
                                            {
                                                language === 'en' &&
                                                <p dangerouslySetInnerHTML={{ __html: post.acf_team?.descriptionEnglisch }}></p>
                                            }
                                            {
                                                language === 'fr' &&
                                                <p dangerouslySetInnerHTML={{ __html: post.acf_team?.descriptionFr }}></p>
                                            }
                                            <div>
                                                {post.acf_team?.facebook != null &&
                                                    <a
                                                        href={post.acf_team?.facebook}
                                                        target="_blank"
                                                        rel="noopener"
                                                        aria-label="Facebook"
                                                    >
                                                        <Icon className="hover-animate" size="large" name="facebook"></Icon>
                                                    </a>
                                                }
                                                {post.acf_team?.instagram != null &&
                                                    <a
                                                        href={post.acf_team?.instagram}
                                                        target="_blank"
                                                        rel="noopener"
                                                        aria-label="Instagram"
                                                    >
                                                        <Icon className="hover-animate" size="large" name="instagram"></Icon>
                                                    </a>
                                                }
                                                {post.acf_team?.linkedin != null &&
                                                    <a
                                                        href={post.acf_team?.linkedin}
                                                        target="_blank"
                                                        rel="noopener"
                                                        aria-label="LinkedIn"
                                                    >
                                                        <Icon className="hover-animate" size="large" name="linkedin"></Icon>
                                                    </a>
                                                }
                                                {post.acf_team?.email != null &&
                                                    <a
                                                        href={'mailto:' + post.acf_team?.email}
                                                        target="_blank"
                                                        rel="noopener"
                                                        aria-label="Email"
                                                    >
                                                        <Icon className="hover-animate" size="large" name="mail outline"></Icon>
                                                    </a>
                                                }
                                                {post.acf_team?.website != null &&
                                                    <a
                                                        href={post.acf_team?.website}
                                                        target="_blank"
                                                        rel="noopener"
                                                        aria-label="Website"
                                                    >
                                                        <Icon className="hover-animate" size="large" name="globe"></Icon>
                                                    </a>
                                                }
                                                {post.acf_team?.twitter != null &&
                                                    <a
                                                        href={post.acf_team?.twitter}
                                                        target="_blank"
                                                        rel="noopener"
                                                        aria-label="Twitter"
                                                    >
                                                        <Icon className="hover-animate" size="large" name="twitter"></Icon>
                                                    </a>
                                                }
                                            </div>
                                        </div>
                                    );
                                })}
                        </section>
                        <section className="global-header-padding">
                            <GatsbyImage
                                alt="Team overview picture"
                                image={data.teamImage.childImageSharp.gatsbyImageData}
                                className="img-fluid rounded shadow" />
                            <p style={{ marginTop: '1rem', width: '80%', textAlign: 'center', marginLeft: 'auto', marginRight: 'auto' }}><Trans>Das WeWater-Team bei einem Meeting prä-Corona. Von links nach rechts: Thilo Kunz, Hannes Schwessinger, Josi Lins und Mina Schmidt. Foto: Steven Hille</Trans></p>
                        </section>
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

export const pageQuery = graphql`query ($language: String!) {
  locales: allLocale(filter: {language: {eq: $language}}) {
    ...GetTranslations
  }
  desktopImage: file(relativePath: {eq: "images/team/banner.jpg"}) {
    childImageSharp {
      gatsbyImageData(quality: 100, layout: FULL_WIDTH)
    }
  }
  mobileImage: file(relativePath: {eq: "images/team/banner-mobile.jpg"}) {
    childImageSharp {
      gatsbyImageData(quality: 100, layout: FULL_WIDTH)
    }
  }
  teamImage: file(relativePath: {eq: "images/team/team.JPG"}) {
    childImageSharp {
      gatsbyImageData(quality: 100, layout: FULL_WIDTH)
    }
  }
  allWpTeamMember( sort: { fields: [date] order: ASC }) {
    edges {
      node {
        title
        acf_team {
          email
          fieldGroupName
          kurzbeschreibung
          kurzbeschreibungEnglisch
          kurzbeschreibungFr
          facebook
          description
          descriptionEnglisch
          descriptionFr
          instagram
          linkedin
          twitter
          website
        }
        content
        featuredImage {
          node {
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
}
`;

export default useTranslationHOC(TeamPage);
