import { Link } from 'gatsby';
import Img from 'gatsby-image';
import de from 'hyphenated-de';
import React from 'react';
import Hyphenated from 'react-hyphen';
import './blog-post-card.less';

interface Props {
    post: Post;
}

type Post = {
    excerpt: any;
    title: string;
    date: string;
    uri: string;
    slug: string;
    tags: {
        nodes: any[];
    };
    categories: {
        nodes: any[];
    };
    featuredImage: {
        node: {
            localFile: {
                childImageSharp: any;
            }
        }
    };
};

export default function BlogPostCard({ post }: Props) {
    const colors = ['color-primary', 'color-secondary', 'color-tertiary'];
    return (
        <div className="rounded">
            <Link to={`/blog/` + post.slug}>
                <Img className="rounded-small blog-post-card-image" fluid={post?.featuredImage?.node?.localFile?.childImageSharp?.fluid} />
                <div className="blog-post-tag-label-group">
                    {post.categories.nodes.slice(0, 3).map((tag, index) => {
                        return (
                            <div
                                key={"tag-" + index + post.uri}
                                className="blog-post-tag-label"
                            >
                                <span className={`label-dot ` + colors[index]}></span>
                                <span className="label-text"> {tag?.name}</span>
                            </div>
                        );
                    })}
                </div>
                <div className="blog-post-card-content">
                    <Hyphenated language={de}>
                        <h3 className="blog-post-title">{post.title}</h3>
                    </Hyphenated>
                </div>
                <div className="blog-post-card-date">
                    <p>{post.date}</p>
                </div>
            </Link>
        </div>
    );
}

export function BlogPostCardSimple({ post }: Props) {
    return (
        <Link to={`/blog/` + post.slug}>
            <div className="rounded blog-post-card-simple">
                <div className="blog-post-card-simple-image-wrapper">
                    <Img className="rounded-small dark-overlay-blog blog-post-card-image-simple" fluid={post?.featuredImage?.node?.localFile?.childImageSharp?.fluid} />
                </div>
                <div className="blog-post-card-content">
                    <Hyphenated language={de}>
                        <h3 className="blog-post-title">{post.title}</h3>
                    </Hyphenated>
                </div>
            </div>
        </Link>
    );
}
