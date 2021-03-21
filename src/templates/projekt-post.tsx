import { graphql } from 'gatsby';
import React from 'react';
import { Container, Table } from 'semantic-ui-react';
import SwiperCore, { Autoplay, Navigation } from 'swiper';
import 'swiper/components/pagination/pagination.less';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.less';
import HeaderOverlayBlog from '../components/HeaderOverlay/header-overlay-blog';
import Layout from '../components/Layout/Layout';
import SEO from '../components/seo';
import './projekt-post.less';


function ProjektPostTemplate({ data, t }) {

    const projekt = data.allWpProjekt.edges[0].node;
    const sources = projekt.featuredImage.node.localFile.childImageSharp.fluid;
    let jsonBlocks = [];
    if (projekt?.blocksJSON != null) {
        jsonBlocks = JSON.parse(projekt.blocksJSON);
    }
    SwiperCore.use([Autoplay, Navigation]);
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
                <div className="blog-content-sections">
                    <section className="projekt-post">
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
                                    <div>
                                        <Swiper
                                            spaceBetween={25}
                                            slidesPerView={2}
                                            autoplay={{ delay: 10000 }}
                                            pagination={{ clickable: true, dynamicBullets: true }}
                                        >
                                            {block?.attributes?.images?.map((image) => {
                                                return (
                                                    <SwiperSlide key={image?.id}>
                                                        <img src={image?.url} alt={image?.alt} />
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
  }
`

/*
export const pageQuery = graphql`
    query ProjektPostByPath($slug: String!) {
        allWpDtPortfolio(
            filter: { slug: { eq: $slug } }
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
                    content
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
 */