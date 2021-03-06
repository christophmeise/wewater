import { graphql } from 'gatsby';
import React from 'react';
import { Container } from 'semantic-ui-react';
import Layout from '../components/Layout/Layout';
import SEO from '../components/seo';
import './projekt-post.less';


function ProjektPostTemplate({ data, t }) {
    const post = data.allWpDtPortfolio.edges[0].node;
    const sources = post.featuredImage.node.localFile.childImageSharp.fluid;

    return (
        <Layout invertedHeader={false}>
            <SEO description={post.title} title={post.title} />
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

export default ProjektPostTemplate;

const OverlayContent = ({ title, inverted }) => {
    return (
        <div>
            <h1
                className={`text-shadow header-overlay-headline ${inverted ? 'header-overlay-headline-inverted' : null
                    }`}
            >
                {title}
            </h1>
        </div>
    );
};

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
