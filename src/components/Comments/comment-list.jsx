import { Query } from '@apollo/client/react/components';
import gql from 'graphql-tag';
import React from 'react';

// Create a GraphQL query for the comment list.
const commentQuery = gql`
    query($postId: ID!) {
        comments(where: { contentId: $postId, contentStatus: PUBLISH }) {
            edges {
                node {
                    id
                    content
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
class CommentList extends React.Component {
    // Render stuff.
    render() {
        const postId = this.props.postId;

        return (
            // Wrap the comment list in our query.
            <Query query={commentQuery} variables={{ postId }}>
                {({ loading, error, data }) => {
                    // Loading and error messages.
                    if (loading) return 'Loading comments...';
                    if (error) return 'Error loading comments...';

                    // Display message if there are no comments to show.
                    if (data.comments.edges.length < 1) return 'This post does not have any comments.';

                    return (
                        // Display the comment list.
                        <div className="comment-list">
                            {data.comments.edges.map((edge) => (
                                <div className="comment">
                                    <div className="comment-author">
                                        <p>{edge.node.author.node.name}</p> says:
                                    </div>
                                    <div className="comment-content" dangerouslySetInnerHTML={{ __html: edge.node.content }} />
                                </div>
                            ))}
                        </div>
                    );
                }}
            </Query>
        );
    }
}

export default CommentList;