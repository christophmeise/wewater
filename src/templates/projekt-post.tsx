import { graphql } from 'gatsby';
import { Trans } from 'gatsby-plugin-react-i18next';
import React from 'react';
import { Container, Table } from 'semantic-ui-react';
import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper';
import 'swiper/components/pagination/pagination.less';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.less';
import BlogPostCard from '../components/BlogPostCard/blog-post-card';
import HeaderOverlayBlog from '../components/HeaderOverlay/header-overlay-blog';
import Layout from '../components/Layout/Layout';
import SEO from '../components/seo';
import './projekt-post.less';


function ProjektPostTemplate({ data, t }) {

    const projekt = data.allWpProjekt.edges[0].node;
    const sources = projekt.featuredImage.node.localFile.childImageSharp.fluid;
    let matchingPosts = data.allWpCategory.edges
        .filter(item => projekt.categories.nodes.map(entry => entry.name).includes(item.node.name));
    console.log(matchingPosts);
    matchingPosts = matchingPosts.map(entry => entry.node.posts).filter(posts => posts.nodes.length > 0);
    console.log(matchingPosts);
    let jsonBlocks = [];
    if (projekt?.blocksJSON != null) {
        jsonBlocks = JSON.parse(projekt.blocksJSON);
    }
    SwiperCore.use([Autoplay, Navigation, Pagination]);
    return (
        <Layout>
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
                        {jsonBlocks.map((block) => {
                            if (block?.name === 'core/table') {
                                return (
                                    <Table>
                                        <Table.Header>
                                            {block?.attributes?.body?.slice(0, 1).map((row, rindex) => {
                                                return (
                                                    <Table.Row key={'row' + rindex}>
                                                        {row?.cells?.map((cell, cindex) => {
                                                            return (
                                                                <Table.HeaderCell key={'cell' + cindex}> <span dangerouslySetInnerHTML={{ __html: cell?.content }}></span></Table.HeaderCell>
                                                            )
                                                        })}
                                                    </Table.Row>
                                                );
                                            })}
                                        </Table.Header>

                                        <Table.Body>
                                            {block?.attributes?.body?.slice(1, block.attributes.body.length).map((row, rindex) => {
                                                return (
                                                    <Table.Row key={'row' + rindex}>
                                                        {row?.cells?.map((cell, cindex) => {
                                                            return (
                                                                <Table.Cell key={'cell' + cindex}> <span dangerouslySetInnerHTML={{ __html: cell?.content }}></span></Table.Cell>
                                                            )
                                                        })}
                                                    </Table.Row>
                                                );
                                            })}

                                        </Table.Body>
                                    </Table>
                                )
                            } else if (block?.name === 'core/gallery') {
                                return (
                                    <div className="gatsby-resp-image-wrapper">
                                        <Swiper
                                            spaceBetween={25}
                                            slidesPerView={3}
                                            autoplay={{ delay: 4000 }}
                                            pagination={{ clickable: true, dynamicBullets: true }}
                                        >
                                            {block?.attributes?.images?.map((image) => {
                                                return (
                                                    <SwiperSlide key={image?.id}>
                                                        <img className="shadow rounded" src={image?.url} alt={image?.alt} />
                                                    </SwiperSlide>
                                                );
                                            })}
                                        </Swiper>
                                    </div>
                                );
                            } else {
                                return <div className="wp-block" dangerouslySetInnerHTML={{ __html: block?.saveContent }}></div>
                            }
                        })}
                    </section>
                    {matchingPosts?.length > 0 &&
                        <section>
                            <h2><Trans>Projektupdates im Blog</Trans></h2>
                            <div className="blog-post-grid">
                                {matchingPosts?.map((node) => {
                                    return node?.nodes?.map((post) => {
                                        console.log('post', post);
                                        return (
                                            <BlogPostCard key={post.id} post={post}></BlogPostCard>
                                        );
                                    })
                                })}
                            </div>
                        </section>
                    }
                </div>
            </Container>
        </Layout >
    );
}

export default ProjektPostTemplate;

const OverlayContent = ({ projekt, inverted }) => {
    const colors = ['color-primary', 'color-secondary', 'color-tertiary'];
    return (
        <div>
            {/*             <div className="blog-post-tag-label-group">
                {projekt.categories.nodes.slice(0, 3).map((tag, index) => {
                    return (
                        <div
                            key={"tag-" + index + projekt.uri}
                            className="blog-post-tag-label blog-post-tag-label-overlay"
                        >
                            <span className={`label-dot ` + colors[index]}></span>
                            <span className="label-text"> {tag?.name}</span>
                        </div>
                    );
                })}
            </div> */}
            <h1
                className={`text-shadow header-overlay-headline ${inverted ? 'header-overlay-headline-inverted' : null
                    }`}
            >
                {projekt.title}
            </h1>
            {/*             <div className="blog-post-author-box">
                <p>Von {projekt.author.node.name} am {projekt.date}</p>
            </div> */}
        </div>
    );
};

export const pageQuery = graphql`
  query ProjektByPath($slug: String!) {
    allWpProjekt(
        filter: { slug: { eq: $slug } }
    ) {
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
                featuredImage {
                        node {
                            localFile {
                                childImageSharp {
                                    fluid(maxWidth: 1600) {
                                        ...GatsbyImageSharpFluid
                                    }
                                }
                            }
                        }
                    }
                blocksJSON
            }
        }
    }
    allWpCategory {
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
                        date(formatString: "MMMM DD, YYYY", locale: "de")
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
                                        fluid(maxWidth: 800) {
                                            ...GatsbyImageSharpFluid
                                        }
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
`