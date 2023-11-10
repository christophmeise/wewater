// i18next-extract-mark-ns-start page_blog
import { graphql } from "gatsby";
import { Link, Trans } from "gatsby-plugin-react-i18next";
import React from "react";
import { Container, Grid, Header } from "semantic-ui-react";
import SwiperCore from "swiper";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import BlogPostCard from "../components/BlogPostCard/blog-post-card";
import HeaderOverlayBlog from "../components/HeaderOverlay/header-overlay-blog";
import Layout from "../components/Layout/Layout";
import SEO from "../components/seo";
import { useTranslationHOC } from "../components/useTranslationHOC/useTranslationHOC";
import "./blog.less";

interface Props {
  t: any;
  language: any;
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
    blogposts: any;
  };
}

class BlogPage extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { t, data } = this.props;

    SwiperCore.use([Autoplay, Navigation]);

    let posts = data.blogposts.edges;

    return (
      <Layout>
        <SEO title={t("BlogSEOTitle")} description={t("BlogSEODescription")} />
        <div>
          <Swiper
            spaceBetween={0}
            slidesPerView={1}
            autoplay={{ delay: 8000 }}
            navigation
            className="swiper-container-full"
          >
            {posts.slice(0, 3).map((post) => {
              return (
                <SwiperSlide key={post.node.id}>
                  <Link to={"/blog/" + post.node.slug}>
                    <HeaderOverlayBlog
                      sources={
                        post.node.featuredImage.node.localFile.childImageSharp
                          .gatsbyImageData
                      }
                      color="#000000"
                      inverted={true}
                      content={
                        <OverlayContent post={post.node} inverted={true} />
                      }
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
              textAlign="center"
              className="global-flex-column global-no-margin"
            >
              <h3 className={`global-subtitle text-primary`}>
                <Trans>News von WeWater</Trans>
              </h3>
              <h2 className="global-headline">
                <Trans>Neuigkeiten</Trans>
              </h2>
            </Header>
            <Grid style={{ paddingTop: "2em" }} stackable centered columns={3}>
              <Grid.Column>
                {posts
                  .filter((post) => post.node.title.length > 0)
                  .map(({ node: post }) => {
                    return (
                      posts.findIndex((entry) => entry.node.id === post.id) %
                        3 ===
                        0 && (
                        <div
                          key={post.id}
                          className="blog-post-card-wrapper"
                          data-sal="slide-up"
                          data-sal-delay="0"
                          data-sal-duration="300"
                          data-sal-easing="ease"
                        >
                          <BlogPostCard post={post}></BlogPostCard>
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
                      posts.findIndex((entry) => entry.node.id === post.id) %
                        3 ===
                        1 && (
                        <div
                          key={post.id}
                          className="blog-post-card-wrapper"
                          data-sal="slide-up"
                          data-sal-delay="0"
                          data-sal-duration="300"
                          data-sal-easing="ease"
                        >
                          <BlogPostCard post={post}></BlogPostCard>
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
                      posts.findIndex((entry) => entry.node.id === post.id) %
                        3 ===
                        2 && (
                        <div
                          key={post.id}
                          className="blog-post-card-wrapper"
                          data-sal="slide-up"
                          data-sal-delay="0"
                          data-sal-duration="300"
                          data-sal-easing="ease"
                        >
                          <BlogPostCard post={post}></BlogPostCard>
                        </div>
                      )
                    );
                  })}
              </Grid.Column>
            </Grid>
          </Container>
        </section>
      </Layout>
    );
  }
}

const OverlayContent = ({ post, inverted }) => {
  const colors = ["color-primary", "color-secondary", "color-tertiary"];
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
        className={`text-shadow header-overlay-headline ${
          inverted ? "header-overlay-headline-inverted" : null
        }`}
      >
        {post.title}
      </h1>
      <div className="blog-post-author-box">
        <p>
          <Trans>Von</Trans> {post.author.node.name} <Trans>am</Trans>{" "}
          {post.date}
        </p>
      </div>
    </div>
  );
};

export const pageQuery = graphql`
  query ($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      ...GetTranslations
    }
    desktopImage: file(relativePath: { eq: "images/main-banner.jpg" }) {
      childImageSharp {
        gatsbyImageData(quality: 100, layout: FULL_WIDTH)
      }
    }
    mobileImage: file(relativePath: { eq: "images/main-banner-mobile.jpg" }) {
      childImageSharp {
        gatsbyImageData(quality: 100, layout: FULL_WIDTH)
      }
    }
    blogposts: allWpPost(
      sort: { date: DESC }
      filter: { language: { slug: { eq: $language } } }
    ) {
      ...GetBlogposts
    }
  }
`;
export default useTranslationHOC(BlogPage);
