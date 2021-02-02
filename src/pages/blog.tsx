import { graphql } from 'gatsby';
import React from 'react';
import { Container, Grid, Header } from 'semantic-ui-react';
import BlogPostCard from '../components/BlogPostCard/blog-post-card';
import HeaderOverlay from '../components/HeaderOverlay/header-overlay';
import Layout from '../components/Layout';
import SEO from '../components/seo';
import withI18next from '../components/withI18next/withI18next';
import './index.less';
const HeaderImage = require('../../static/images/main.inline.svg') as string;

interface Props {
  t: any;
  pageContext: any;
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

class Index extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const {
      pageContext: { locale },
      t,
    } = this.props;
    const data = this.props.data;
    const sources = [
      data.mobileImage.childImageSharp.fluid,
      {
        ...data.desktopImage.childImageSharp.fluid,
        media: `(min-width: 768px)`,
      },
    ];
    const backgroundColor = '#FFFFFF';
    let posts = data.german.edges;

    posts = posts
      .filter((post) => new Date(post.node.date) <= new Date())

    return (
      <Layout title="test" invertedHeader={false} t={t}>
        <SEO title="Home" />
        <HeaderOverlay
          sources={sources}
          color={backgroundColor}
          inverted={false}
          content={<OverlayContent inverted={true} />}
          darken={true}
        />
        <div className="global-header-padding">
          <section className="bg-secondary">
            <Container>
              <Header
                data-sal="slide-up"
                data-sal-delay="0"
                data-sal-duration="300"
                data-sal-easing="ease"
                textAlign='center'
                className="global-flex-column global-no-margin"
              >
                <h3 className={`global-subtitle text-primary}`}>News von WeWater</h3>
                <h2 className="global-headline">Neuigkeiten</h2>
              </Header>
              <Grid style={{ paddingTop: '2em' }} stackable centered columns={3}>
                <Grid.Column data-sal="slide-up" data-sal-delay="0" data-sal-duration="300" data-sal-easing="ease">
                  {posts
                    .filter((post) => post.node.title.length > 0)
                    .map(({ node: post }) => {
                      return (
                        posts.findIndex((entry) => entry.node.id === post.id) % 3 === 0 && (
                          <BlogPostCard key={post.id} post={post}></BlogPostCard>
                        )
                      );
                    })}
                </Grid.Column>
                <Grid.Column data-sal="slide-up" data-sal-delay="0" data-sal-duration="300" data-sal-easing="ease">
                  {posts
                    .filter((post) => post.node.title.length > 0)
                    .map(({ node: post }) => {
                      return (
                        posts.findIndex((entry) => entry.node.id === post.id) % 3 === 1 && (
                          <BlogPostCard key={post.id} post={post}></BlogPostCard>
                        )
                      );
                    })}
                </Grid.Column>
                <Grid.Column data-sal="slide-up" data-sal-delay="0" data-sal-duration="300" data-sal-easing="ease">
                  {posts
                    .filter((post) => post.node.title.length > 0)
                    .map(({ node: post }) => {
                      return (
                        posts.findIndex((entry) => entry.node.id === post.id) % 3 === 2 && (
                          <BlogPostCard key={post.id} post={post}></BlogPostCard>
                        )
                      );
                    })}
                </Grid.Column>
              </Grid>
            </Container>
          </section>
        </div>
      </Layout>
    )
  }
}

class OverlayContent extends React.Component<any, any> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { inverted } = this.props;

    return (
      <div>
        <h1
          className={`header-overlay-headline ${inverted ? 'header-overlay-headline-inverted' : null}`}
          style={{ marginBottom: '1.5rem' }}
        >
          WeWater. <br />
          Alle News auf einen Blick.
        </h1>
        <h2 className={`header-overlay-subheadline ${inverted ? 'header-overlay-subheadline-inverted' : null}`}
          style={{ marginBottom: '1.5rem', marginTop: '0rem' }}>
          <p>
            Trinkwasser ist ein Menschenrecht.
          </p>
          <p>
            Dennoch leiden weltweit 844 Millionen Menschen Durst oder erkranken an verschmutztem Wasser. Unsere Mission ist es, diesen Menschen durch sauberes Trinkwasser eine existentielle Lebensgrundlage zu ermöglichen.
          </p>
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
        desktopImage: file(relativePath: { eq: "images/main-banner.jpg" }) {
            childImageSharp {
                fluid(maxWidth: 1600, quality: 100) {
                    ...GatsbyImageSharpFluid_withWebp
                }
            }
        }
        mobileImage: file(relativePath: { eq: "images/main-banner-mobile.jpg" }) {
            childImageSharp {
                fluid(maxWidth: 1200, quality: 100) {
                    ...GatsbyImageSharpFluid_withWebp
                }
            }
        }
        german: allWpPost(
            sort: { fields: date, order: DESC }
        ) {
            edges {
                node {
                    id
                    excerpt
                    title
                    date(formatString: "MMMM DD, YYYY", locale: "de")
                    uri
                    slug
                    tags {
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
export default withI18next(['common', 'page_blog'])(Index);