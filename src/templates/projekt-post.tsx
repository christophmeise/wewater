import { graphql } from "gatsby";
import { Trans } from "gatsby-plugin-react-i18next";
import React from "react";
import { Container, Table } from "semantic-ui-react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

import BlogPostCard from "../components/BlogPostCard/blog-post-card";
import HeaderOverlayBlog from "../components/HeaderOverlay/header-overlay-blog";
import Layout from "../components/Layout/Layout";
import ProjectIntroTiles from "../components/ProjectIntroTiles/ProjectIntroTiles";
import SEO from "../components/seo";
import "./projekt-post.less";

function ProjektPostTemplate({ data, t }) {
  const projekt = data.allWpProjekt.edges[0].node;
  const sources =
    projekt.featuredImage.node.localFile.childImageSharp.gatsbyImageData;
  let matchingPosts = data.allWpCategory.edges.filter((item) =>
    projekt.categories.nodes.map((entry) => entry.name).includes(item.node.name)
  );
  matchingPosts = matchingPosts
    .map((entry) => entry.node.posts)
    .filter((posts) => posts.nodes.length > 0);
  // todo filter by name unique
  let jsonBlocks = [];
  if (projekt?.blocksJSON != null) {
    jsonBlocks = JSON.parse(projekt.blocksJSON);
  }

  const isSSR = typeof window === "undefined";
  let slidesPerView = 3;
  if (!isSSR) {
    if (window.innerWidth < 768) {
      slidesPerView = 1;
    } else if (window.innerWidth < 1200) {
      slidesPerView = 3;
    }
  }

  const translations = projekt?.translations;

  return (
    <Layout translations={translations}>
      <SEO description={projekt.title} title={projekt.title} />
      <HeaderOverlayBlog
        sources={sources}
        color="#000000"
        inverted={true}
        content={<OverlayContent projekt={projekt} inverted={true} />}
      />
      <Container>
        <div className="blog-content-sections projekt-post">
          <section>
            {jsonBlocks.map((block: any, index: number) => {
              if (block?.name === "core/table") {
                return (
                  <Table key={block.name + index}>
                    <Table.Header>
                      {block?.attributes?.body
                        ?.slice(0, 1)
                        .map((row, rindex) => {
                          return (
                            <Table.Row key={"row" + rindex}>
                              {row?.cells?.map((cell, cindex) => {
                                return (
                                  <Table.HeaderCell key={"cell" + cindex}>
                                    {" "}
                                    <span
                                      dangerouslySetInnerHTML={{
                                        __html: cell?.content,
                                      }}
                                    ></span>
                                  </Table.HeaderCell>
                                );
                              })}
                            </Table.Row>
                          );
                        })}
                    </Table.Header>

                    <Table.Body>
                      {block?.attributes?.body
                        ?.slice(1, block.attributes.body.length)
                        .map((row, rindex) => {
                          return (
                            <Table.Row key={"row" + rindex}>
                              {row?.cells?.map((cell, cindex) => {
                                return (
                                  <Table.Cell key={"cell" + cindex}>
                                    {" "}
                                    <span
                                      dangerouslySetInnerHTML={{
                                        __html: cell?.content,
                                      }}
                                    ></span>
                                  </Table.Cell>
                                );
                              })}
                            </Table.Row>
                          );
                        })}
                    </Table.Body>
                  </Table>
                );
              } else if (block?.name === "core/gallery") {
                return (
                  <div key={block.name + index}>
                    <ImageGallery
                      items={block?.attributes?.images?.map((image) => ({
                        original: image?.url,
                        thumbnail: image?.url,
                      }))}
                    />
                  </div>
                );
              } else if (
                block?.name === "core/group" &&
                block?.attributes.className === "block-intro"
              ) {
                return (
                  <div key={block.name + index}>
                    <ProjectIntroTiles
                      headline={block?.innerBlocks[1]?.attributes?.content}
                      subheadline={block?.innerBlocks[0]?.attributes?.content}
                      tileHeader1={
                        block?.innerBlocks[2]?.innerBlocks[0]?.innerBlocks[0]
                          ?.attributes?.content
                      }
                      tileText1={
                        block?.innerBlocks[2]?.innerBlocks[0]?.innerBlocks[1]
                          ?.attributes?.content
                      }
                      tileHeader2={
                        block?.innerBlocks[2]?.innerBlocks[1]?.innerBlocks[0]
                          ?.attributes?.content
                      }
                      tileText2={
                        block?.innerBlocks[2]?.innerBlocks[1]?.innerBlocks[1]
                          ?.attributes?.content
                      }
                      tileHeader3={
                        block?.innerBlocks[2]?.innerBlocks[2]?.innerBlocks[0]
                          ?.attributes?.content
                      }
                      tileText3={
                        block?.innerBlocks[2]?.innerBlocks[2]?.innerBlocks[1]
                          ?.attributes?.content
                      }
                      tileHeader4={
                        block?.innerBlocks[2]?.innerBlocks[3]?.innerBlocks[0]
                          ?.attributes?.content
                      }
                      tileText4={
                        block?.innerBlocks[2]?.innerBlocks[3]?.innerBlocks[1]
                          ?.attributes?.content
                      }
                    ></ProjectIntroTiles>
                  </div>
                );
              } else {
                return (
                  <div
                    className="wp-block"
                    key={block.name + index}
                    dangerouslySetInnerHTML={{ __html: block?.saveContent }}
                  ></div>
                );
              }
            })}
          </section>
          {matchingPosts?.length > 0 && (
            <section>
              <h2>
                <Trans>Projektupdates im Blog</Trans>
              </h2>
              <div className="blog-post-grid">
                {matchingPosts?.map((node) => {
                  return node?.nodes?.map((post) => {
                    return (
                      <BlogPostCard key={post.id} post={post}></BlogPostCard>
                    );
                  });
                })}
              </div>
            </section>
          )}
        </div>
      </Container>
    </Layout>
  );
}

export default ProjektPostTemplate;

const OverlayContent = ({ projekt, inverted }) => {
  const colors = ["color-primary", "color-secondary", "color-tertiary"];
  return (
    <div>
      <h1
        className={`text-shadow header-overlay-headline ${
          inverted ? "header-overlay-headline-inverted" : null
        }`}
      >
        {projekt.title}
      </h1>
    </div>
  );
};

export const pageQuery = graphql`
  query ($language: String!, $slug: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      ...GetTranslations
    }
    allWpProjekt(filter: { slug: { eq: $slug } }) {
      edges {
        node {
          id
          title
          categories {
            nodes {
              id
              name
            }
          }
          translations {
            slug
            language {
              slug
            }
          }
          featuredImage {
            node {
              localFile {
                childImageSharp {
                  gatsbyImageData(layout: FULL_WIDTH)
                }
              }
            }
          }
          blocksJSON
        }
      }
    }
    allWpCategory(filter: { language: { slug: { eq: $language } } }) {
      edges {
        node {
          posts {
            nodes {
              id
              databaseId
              excerpt
              title
              content
              author {
                node {
                  name
                }
              }
              date(formatString: "MMMM DD, YYYY", locale: $language)
              uri
              slug
              tags {
                nodes {
                  name
                }
              }
              categories {
                nodes {
                  name
                }
              }
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
          name
        }
      }
    }
  }
`;
