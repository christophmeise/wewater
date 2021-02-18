import { Link } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';
import React from 'react';
import './projekt-card.less';

interface Props {
    post: Post;
}

type Post = {
    excerpt: any;
    title: string;
    date: string;
    uri: string;
    slug: string;
    dt_portfolio_categories: {
        nodes: any[];
    }
    featuredImage: {
        node: {
            localFile: {
                childImageSharp: any;
            }
        }
    };
};

export default function ProjektCard({ post }: Props) {
    const imageUrl = post.dt_portfolio_categories?.nodes[0].name === 'In Arbeit' ? 'gears.gif' : 'thumb.gif';
    return (
        <Link to={post.slug}>
            <div className="hover-animate rounded-small shadow project-card">
                <BackgroundImage
                    Tag="div"
                    className="rounded-small project-card-background dark-overlay-project"
                    fluid={post.featuredImage.node.localFile.childImageSharp.fluid}
                >
                    <div className="project-card-progress-circle-wrapper">
                        <div className="project-card-progress-circle">

                            <img className="project-card-gif" src={'/images/projekte/' + imageUrl} alt="Turning gears" />
                        </div>
                    </div>
                    <div className="project-card-background-text-wrapper">
                        <div className="project-tag-label-group">

                            {/* TODO */}
                            {/*  {post?.tags?.nodes?.map((tag) => {
                                return (
                                    <p className="project-tag-label">
                                        {tag.name}
                                    </p>
                                );
                            })}
 */}
                        </div>
                        <h4 className="project-card-background-text text-shadow">{post.title}</h4>
                        <p>{post.date}</p>
                    </div>
                </BackgroundImage>
            </div>
        </Link>
    );
}
