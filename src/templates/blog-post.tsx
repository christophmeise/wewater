import { graphql } from 'gatsby';
import React from 'react';
import { Container } from 'semantic-ui-react';
import withI18next from '../components/withI18next/withI18next';
import HeaderOverlayBlog from './../components/HeaderOverlay/header-overlay-blog';
import Layout from './../components/layout';
import SEO from './../components/seo';
import './blog-post.less';

function BlogPostTemplate({ data, t }) {
    const post = data.allWpPost.edges[0].node;
    const sources = post.featuredImage.node.localFile.childImageSharp.fluid;

    return (
        <Layout title={post.title} invertedHeader={true} t={t}>
            <SEO lang="en" description={post.title} title={post.title} />
            <HeaderOverlayBlog
                sources={sources}
                color="#000000"
                inverted={true}
                content={<OverlayContent title={post.title} inverted={true} />}
            />
            <Container>
                <div className="blog-content-sections">
                    <section className="blog-post">
                        <article dangerouslySetInnerHTML={{ __html: post.content }}></article>
                    </section>
                </div>
            </Container>
        </Layout>
    );
}

export default withI18next('common')(BlogPostTemplate);

const OverlayContent = ({ title, inverted }) => {
    return (
        <div>
            <h1
                className={`font-playfair text-shadow header-overlay-headline ${inverted ? 'header-overlay-headline-inverted' : null
                    }`}
            >
                {title}
            </h1>
        </div>
    );
};

export const pageQuery = graphql`
    query BlogPostByPath($slug: String!) {
        allWpPost(filter: { slug: { eq: $slug } }) {
            edges {
                node {
                    id
                    excerpt
                    title
                    content
                    date(formatString: "MMMM DD, YYYY", locale: "de")
                    uri
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
