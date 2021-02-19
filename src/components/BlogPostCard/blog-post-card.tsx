import { Link } from 'gatsby';
import Img from 'gatsby-image';
import React from 'react';
import { Label } from 'semantic-ui-react';
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
    return (
        <Link to={post.slug}>
            <div className="rounded hover-animate">
                <Img className="rounded-small dark-overlay-blog blog-post-card-image" fluid={post?.featuredImage?.node?.localFile?.childImageSharp?.fluid} />
                <Label.Group className="blog-post-tag-label-group">
                    {post.categories.nodes.slice(0, 3).map((tag, index) => {
                        return (
                            <Label
                                size="small"
                                circular
                                basic
                                key={"tag-" + index + post.uri}
                                className="blog-post-tag-label"
                            >
                                {tag?.name}
                            </Label>
                        );
                    })}
                </Label.Group>
                <div className="blog-post-card-content">
                    <h3 className="blog-post-title">{post.title}</h3>
                </div>
                <div className="blog-post-card-date">
                    <p>{post.date}</p>
                </div>
            </div>
        </Link>
    );
}
