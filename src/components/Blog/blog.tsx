import { graphql, Link, useStaticQuery } from 'gatsby';
import React from 'react';
import { Button, Container, Grid, Header, Icon } from 'semantic-ui-react';
import BlogPostCard from '../BlogPostCard/blog-post-card';

const SectionBlog = () => {
    const data = useStaticQuery(
        graphql`
            query LatestBlogQuery {
                site {
                    siteMetadata {
                        title
                    }
                }
                german: allWpPost(
                    sort: { fields: date, order: DESC }
                ) {
                    edges {
                        node {
                            id
                            excerpt
                            title
                            date(formatString: "MMMM DD, YYYY", locale: "de")
                            uri
                            slug
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
        `,
    );


    let posts = data.german.edges;

    posts = posts
        .filter((post) => new Date(post.node.date) <= new Date())

    posts = posts.slice(0, 3);

    return (
        <section className="bg-secondary" style={{ padding: '3rem 0rem' }}>
            <Container>
                <Header
                    data-sal="slide-up"
                    data-sal-delay="0"
                    data-sal-duration="300"
                    data-sal-easing="ease"
                    textAlign='center'
                    className="global-flex-column global-no-margin"
                >
                    <h3 className={`global-subtitle text-primary`}>News von WeWater</h3>
                    <h2 className="global-headline">Neuigkeiten</h2>
                </Header>
                <Grid style={{ paddingTop: '2em' }} stackable centered columns={3}>
                    <Grid.Column data-sal="slide-up" data-sal-delay="0" data-sal-duration="300" data-sal-easing="ease">
                        {posts
                            .filter((post) => post.node.title.length > 0)
                            .map(({ node: post }) => {
                                return (
                                    posts.findIndex((entry) => entry.node.id === post.id) % 3 === 0 && (
                                        <BlogPostCard key={post.id} post={post}></BlogPostCard>
                                    )
                                );
                            })}
                    </Grid.Column>
                    <Grid.Column data-sal="slide-up" data-sal-delay="0" data-sal-duration="300" data-sal-easing="ease">
                        {posts
                            .filter((post) => post.node.title.length > 0)
                            .map(({ node: post }) => {
                                return (
                                    posts.findIndex((entry) => entry.node.id === post.id) % 3 === 1 && (
                                        <BlogPostCard key={post.id} post={post}></BlogPostCard>
                                    )
                                );
                            })}
                    </Grid.Column>
                    <Grid.Column data-sal="slide-up" data-sal-delay="0" data-sal-duration="300" data-sal-easing="ease">
                        {posts
                            .filter((post) => post.node.title.length > 0)
                            .map(({ node: post }) => {
                                return (
                                    posts.findIndex((entry) => entry.node.id === post.id) % 3 === 2 && (
                                        <BlogPostCard key={post.id} post={post}></BlogPostCard>
                                    )
                                );
                            })}
                    </Grid.Column>
                </Grid>
                <Container
                    textAlign="center"
                    className="rtt-main-button-container"
                    data-sal="slide-up"
                    data-sal-delay="0"
                    data-sal-duration="300"
                    data-sal-easing="ease"
                >
                    <Link to='/blog'>
                        <Button
                            secondary={true}
                            basic
                            inverted={false}
                            size="medium"
                            className="rounded shadow hover-animate"
                        >
                            <Icon name="grid layout" className="left" style={{ opacity: '1' }}></Icon>
                            Alle Blogeinträge
                        </Button>
                    </Link>
                </Container>
            </Container>
        </section>
    );
};

export default SectionBlog;
