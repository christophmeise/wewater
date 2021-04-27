import { GatsbyImage } from 'gatsby-plugin-image';
import { Link } from 'gatsby-plugin-react-i18next';
import de from 'hyphenated-de';
import React from 'react';
import Hyphenated from 'react-hyphen';
import LordIcon from '../Innovation/lordicon';
import './projekt-card.less';
;

interface Props {
    post: Post;
}

type Post = {
    excerpt: any;
    title: string;
    date: string;
    uri: string;
    slug: string;
    categories: {
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
    const imageUrl = post.categories?.nodes.find((categoryNode) => categoryNode.name === 'In Arbeit') != null ? 'gears' : 'thumb';

    return (
        <div className="hover-animate rounded-small shadow project-card">
            <Link to={`/projekte/` + post.slug}>
                <GatsbyImage
                    alt="blogpost"
                    image={post?.featuredImage?.node?.localFile?.childImageSharp?.gatsbyImageData}
                    className="rounded-small project-card-background" />
                <div className="project-card-content-container">
                    <div className="project-card-progress-circle-wrapper">
                        <div className="project-card-progress-circle">
                            <LordIcon src={'/images/projekte/' + imageUrl + '.json'} delay={(3000 + 10000 * Math.random()).toString()}></LordIcon>
                        </div>
                    </div>
                    <div className="project-card-background-text-wrapper">
                        <Hyphenated language={de}>
                            <h4 className="project-card-background-text text-shadow">
                                {post.title}
                            </h4>
                        </Hyphenated>
                        <p>{post.date}</p>
                    </div>
                </div>

            </Link>
        </div>
    );
}
