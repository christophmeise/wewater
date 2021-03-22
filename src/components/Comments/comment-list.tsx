import { Query } from '@apollo/client/react/components';
import gql from 'graphql-tag';
import React from 'react';
import { Trans } from 'react-i18next';
import './comments.less';

// Create a GraphQL query for the comment list.
const commentQuery: any = gql`
    query($postId: ID!) {
        comments(where: { contentId: $postId, contentStatus: PUBLISH }) {
            edges {
                node {
                    id
                    content
                    date
                    author {
                        node {
                            name
                        }
                    }
                }
            }
        }
    }
`;

// Main component class.
class CommentList extends React.Component<any, any> {
    // Render stuff.
    render() {
        const postId: any = this.props.postId;

        return (
            // Wrap the comment list in our query.
            <Query<any, any> query={commentQuery} variables={{ postId }}>
                {({ loading, error, data }): any => {
                    // Loading and error messages.
                    if (loading) return 'Loading comments...';
                    if (error) return 'Error loading comments...';

                    // Display message if there are no comments to show.
                    if (data.comments.edges.length < 1) return 'This post does not have any comments.';

                    return (
                        // Display the comment list.
                        <section className="global-header-padding">
                            <div className="comment-list">
                                <h4 className="comments-title">{data?.comments?.edges?.length} <Trans> Kommentare</Trans></h4>
                                {data.comments.edges.map((edge) => (
                                    <div className="comment-container">
                                        <div className="comment-picture-wrapper">
                                            <img src="https://secure.gravatar.com/avatar/ac867270c123b35639f471f71bf52a7e?s=64&amp;d=mm&amp;r=g" width="64" height="64" alt="Avatar" className="comment-avatar"></img>
                                        </div>
                                        <div className="comment-content-col">
                                            <div className="comment-author">
                                                <strong>{edge.node.author.node.name}</strong><pre> </pre><p> <Trans> sagt:</Trans></p>
                                            </div>
                                            <p className="comment-date">{edge.node.date}</p>
                                            <div className="comment-content">
                                                <p dangerouslySetInnerHTML={{ __html: edge.node.content }}></p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    );
                }}
            </Query>
        );
    }
}

export default CommentList;