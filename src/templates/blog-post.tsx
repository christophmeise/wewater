import { graphql } from 'gatsby';
import React from 'react';
import { Container } from 'semantic-ui-react';
import Layout from '../components/Layout/Layout';
import HeaderOverlayBlog from './../components/HeaderOverlay/header-overlay-blog';
import SEO from './../components/seo';
import './blog-post.less';


function BlogPostTemplate({ data, t }) {
    const post = data.allWpPost.edges[0].node;
    const sources = post.featuredImage.node.localFile.childImageSharp.fluid;

    return (
        <Layout invertedHeader={true}>
            <SEO description={post.title} title={post.title} />
            <HeaderOverlayBlog
                sources={sources}
                color="#000000"
                inverted={true}
                content={<OverlayContent post={post} inverted={true} />}
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

export default BlogPostTemplate;

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
    query BlogPostByPath($slug: String!) {
        allWpPost(filter: { slug: { eq: $slug } }) {
            ...GetBlogposts
        }
    }
`;
