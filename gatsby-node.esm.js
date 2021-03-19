
const path = require('path')

require('dotenv').config({
    path: `.env`,
});


export function onCreateWebpackConfig({ actions }) {
    actions.setWebpackConfig({
        resolve: {
            alias: { '../../theme.config$': path.join(__dirname, 'src/semantic/theme.config') },
        },
    })
}

export async function createPages({ graphql, actions }) {
    const { createPage } = actions

    const blogPosts = await graphql(`
        {
          allWpPost(sort: {fields: [date]}) {
            edges {
              node {
                title
                excerpt
                slug
                date(formatString: "MM-DD-YYYY")
              }
            }
          }
        }
    `);


    if (blogPosts.errors) {
        reporter.panicOnBuild(`Error while running GraphQL query.`);
        return;
    }

    blogPosts.data.allWpPost.edges.forEach(({ node }) => {
        createPage({
            path: 'blog/' + node.slug,
            component: path.resolve(`./src/templates/blog-post.tsx`),
            context: {
                slug: node.slug,
            },
        });
    });

    const projektPosts = await graphql(`
        {
            allWpProjekt(
                sort: { fields: date, order: DESC }
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
                        blocks {
                            name
                            saveContent
                                innerBlocks {
                                    name
                                    saveContent
                                    innerBlocks {
                                        name
                                        saveContent
                                    }
                            }
                        }
                    }
                }
            }
        }
    `);


    if (projektPosts.errors) {
        reporter.panicOnBuild(`Error while running GraphQL query.`);
        return;
    }

    projektPosts.data.allWpProjekt.edges.forEach(({ node }) => {
        createPage({
            path: 'projekte/' + node.slug,
            component: path.resolve(`./src/templates/projekt-post.tsx`),
            context: {
                slug: node.slug,
            },
        });
    });


    const shopItems = await graphql(`
        {
            allWpProduct(
              sort: { fields: date, order: DESC }
          ) {
              edges {
                  node {
                      id
                      name
                      description
                      shortDescription
                      date(formatString: "MMMM DD, YYYY", locale: "de")
                      slug
                      onSale
                      status
                      averageRating
                      databaseId
                  }
              }
          }
        }
    `);

    if (shopItems.errors) {
        reporter.panicOnBuild(`Error while running GraphQL query.`);
        return;
    }

    shopItems.data.allWpProduct.edges.forEach(({ node }) => {
        createPage({
            path: 'shop/' + node.slug,
            component: path.resolve(`./src/templates/shop-article.tsx`),
            context: {
                slug: node.slug,
            },
        });
    });

}
