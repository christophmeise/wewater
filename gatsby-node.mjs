import { createRequire } from "module";

const require = createRequire(import.meta.url);

const path = require("path");

require("dotenv").config({
  path: `.env`,
});

export async function createSchemaCustomization({ actions }) {
  const { createTypes } = actions;
  const typeDefs = `
    type WpBlockAttributesObject {
      foobar: String
    }
  `;
  createTypes(typeDefs);
}

export async function createPages({ graphql, actions }) {
  const { createPage, createRedirect } = actions;

  createRedirect({
    fromPath: "/shop",
    toPath: "https://shop.wewater.org/",
    isPermanent: true,
  });
  /*   console.log("Creating pages"); */
  const blogPosts = await graphql(`
    {
      allWpPost(sort: { date: DESC }) {
        edges {
          node {
            slug
          }
        }
      }
    }
  `);

  if (blogPosts.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  const blogPostTemplate = path.resolve(`./src/templates/blog-post.tsx`);
  blogPosts.data.allWpPost.edges.forEach(({ node }) => {
    /*     console.log(
      "Creating pages allWpPost",
      node.slug,
      path.resolve(`./src/templates/blog-post.tsx`)
    ); */
    createPage({
      path: "blog/" + node.slug,
      component: blogPostTemplate,
      context: {
        slug: node.slug,
      },
    });
  });

  const projektPosts = await graphql(`
    {
      allWpProjekt(sort: { date: DESC }) {
        edges {
          node {
            slug
          }
        }
      }
    }
  `);

  if (projektPosts.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  const projectTemplate = path.resolve(`./src/templates/projekt-post.tsx`);
  projektPosts.data.allWpProjekt.edges.forEach(({ node }) => {
    createPage({
      path: "projekte/" + node.slug,
      component: projectTemplate,
      context: {
        slug: node.slug,
      },
    });
  });

  /* const shopItems = await graphql(`
    {
      allWpVariableProduct(sort: { date: DESC }) {
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

  shopItems.data.allWpVariableProduct.edges.forEach(({ node }) => {
    createPage({
      path: "shop/" + node.slug,
      component: path.resolve(`./src/templates/shop-article.tsx`),
      context: {
        slug: node.slug,
      },
    });
  }); */
}
