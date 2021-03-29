import { graphql, Link, useStaticQuery } from 'gatsby';
import { Trans } from 'gatsby-plugin-react-i18next';
import React from 'react';
import { Button, Container, Grid, Header, Icon } from 'semantic-ui-react';
import ProjektCard from '../ProjektCard/projekt-card';

const SectionProjekte = () => {
    const data = useStaticQuery(
        graphql`query LatestProjectsQuery {
  german: allWpProjekt(sort: {fields: date, order: DESC}) {
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
        featuredImage {
          node {
            localFile {
              childImageSharp {
                gatsbyImageData(width: 800, layout: CONSTRAINED)
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

    posts = posts.slice(0, 2);


    return (
        <section className="main-section">
            <Container>
                <Header
                    data-sal="slide-up"
                    data-sal-delay="0"
                    data-sal-duration="300"
                    data-sal-easing="ease"
                    textAlign='left'
                    className="global-flex-column global-no-margin"
                >
                    <h3 className={`global-subtitle text-primary`}><Trans>Projekte</Trans></h3>
                    <h2 className="global-headline"><Trans>Projekte im Überblick</Trans></h2>
                </Header>
                <Grid style={{ paddingTop: '2em' }} stackable centered columns={2}>
                    <Grid.Column>
                        {posts
                            .filter((post) => post.node.title.length > 0)
                            .map(({ node: post }) => {
                                return (
                                    posts.findIndex((entry) => entry.node.id === post.id) % 2 === 0 && (
                                        <ProjektCard key={post.id} post={post} data-sal="slide-up" data-sal-delay="0" data-sal-duration="300" data-sal-easing="ease"></ProjektCard>
                                    )
                                );
                            })}
                    </Grid.Column>
                    <Grid.Column>
                        {posts
                            .filter((post) => post.node.title.length > 0)
                            .map(({ node: post }) => {
                                return (
                                    posts.findIndex((entry) => entry.node.id === post.id) % 2 === 1 && (
                                        <ProjektCard key={post.id} post={post} data-sal="slide-up" data-sal-delay="0" data-sal-duration="300" data-sal-easing="ease"></ProjektCard>
                                    )
                                );
                            })}
                    </Grid.Column>
                </Grid>
            </Container>

            <Container
                textAlign="center"
                className="main-button-container"
                data-sal="slide-up"
                data-sal-delay="0"
                data-sal-duration="300"
                data-sal-easing="ease"
            >
                <Link to='/projekte'>
                    <Button
                        secondary={true}
                        basic
                        inverted={false}
                        size="medium"
                        className="rounded shadow hover-animate"
                    >
                        <Icon name="grid layout" className="left" style={{ opacity: '1' }}></Icon>
                        <Trans>Zur Projektübersicht</Trans>
                    </Button>
                </Link>
            </Container>
        </section >
    );
};

export default SectionProjekte;
