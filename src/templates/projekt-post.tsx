import { graphql } from 'gatsby';
import React from 'react';
import { Container } from 'semantic-ui-react';
import HeaderOverlayBlog from '../components/HeaderOverlay/header-overlay-blog';
import Layout from '../components/Layout/Layout';
import SEO from '../components/seo';
import './projekt-post.less';


function ProjektPostTemplate({ data, t }) {

    const projekt = data.allWpProjekt.edges[0].node;
    const sources = projekt.featuredImage.node.localFile.childImageSharp.fluid;

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
                        {projekt.blocks.map((block) => {
                            return <div className="wp-block" dangerouslySetInnerHTML={{ __html: block?.saveContent }}></div>
                        })}
                    </section>
                </div>
            </Container>
        </Layout>
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