import { graphql, Link } from 'gatsby';
import React from 'react';
import { Container, Grid, Header } from 'semantic-ui-react';
import SwiperCore, { Autoplay, Navigation } from 'swiper';
import 'swiper/components/navigation/navigation.less';
import 'swiper/components/pagination/pagination.less';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.less';
import BlogPostCard from '../components/BlogPostCard/blog-post-card';
import HeaderOverlayBlog from '../components/HeaderOverlay/header-overlay-blog';
import Layout from '../components/Layout/Layout';
import SEO from '../components/seo';
import withI18next from '../components/withI18next/withI18next';
import './blog.less';

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

    SwiperCore.use([Autoplay, Navigation]);

    const posts = data.german.edges
      .filter((post) => new Date(post.node.date) <= new Date())


    return (
      <Layout title="test" invertedHeader={false} t={t}>
        <SEO title="Home" />
        <div>
          <Swiper
            spaceBetween={0}
            slidesPerView={1}
            autoplay={{ delay: 8000 }}
            navigation
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
            className="swiper-container-full"
          >
            {posts.slice(0, 3).map((post) => {
              return (
                <SwiperSlide key={post.node.id}>
                  <Link to={'/blog/' + post.node.slug}>
                    <HeaderOverlayBlog
                      sources={post.node.featuredImage.node.localFile.childImageSharp.fluid}
                      color="#000000"
                      inverted={true}
                      content={<OverlayContent post={post.node} inverted={true} />}
                    />
                  </Link>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
        <section>
          <Container>
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
            <Grid style={{ paddingTop: '2em' }} stackable centered columns={3}>
              <Grid.Column>
                {posts
                  .filter((post) => post.node.title.length > 0)
                  .map(({ node: post }) => {
                    return (
                      posts.findIndex((entry) => entry.node.id === post.id) % 3 === 0 && (
                        <div className="blog-post-card-wrapper" data-sal="slide-up" data-sal-delay="0" data-sal-duration="300" data-sal-easing="ease">
                          <BlogPostCard key={post.id} post={post}></BlogPostCard>
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
                      posts.findIndex((entry) => entry.node.id === post.id) % 3 === 1 && (
                        <div className="blog-post-card-wrapper" data-sal="slide-up" data-sal-delay="0" data-sal-duration="300" data-sal-easing="ease">
                          <BlogPostCard key={post.id} post={post}></BlogPostCard>
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
                      posts.findIndex((entry) => entry.node.id === post.id) % 3 === 2 && (
                        <div className="blog-post-card-wrapper" data-sal="slide-up" data-sal-delay="0" data-sal-duration="300" data-sal-easing="ease">
                          <BlogPostCard key={post.id} post={post}></BlogPostCard>
                        </div>
                      )
                    );
                  })}
              </Grid.Column>
            </Grid>
          </Container>
        </section>
      </Layout>
    )
  }
}

const OverlayContent = ({ post, inverted }) => {
  const colors = ['color-primary', 'color-secondary', 'color-tertiary'];
  return (
    <div>
      <div className="blog-post-tag-label-group">
        {post.categories.nodes.slice(0, 3).map((tag, index) => {
          return (
            <div
              key={"tag-" + index + post.uri}
              className="blog-post-tag-label blog-post-tag-label-overlay"
            >
              <span className={`label-dot ` + colors[index]}></span>
              <span className="label-text"> {tag?.name}</span>
            </div>
          );
        })}
      </div>
      <h1
        className={`font-playfair text-shadow header-overlay-headline ${inverted ? 'header-overlay-headline-inverted' : null
          }`}
      >
        {post.title}
      </h1>
      <div className="blog-post-author-box">
        <p>Von {post.author.node.name} am {post.date}</p>
      </div>
    </div>
  );
};


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
            ...GetBlogposts
        }
    }
`;
export default withI18next(['common', 'page_blog'])(Index);