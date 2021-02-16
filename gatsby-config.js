module.exports = {
  siteMetadata: {
    title: `WeWater`,
    description: `WeWater`,
    siteUrl: `https://wewater.org/`,
    author: `Christoph Meise`,
  },
  plugins: [
    {
      resolve: `gatsby-source-wordpress-experimental`,
      options: {
        url: process.env.WPGRAPHQL_URL || 'http://18.197.107.224/graphql',
        verbose: true,
        //'https://wewater.org/graphql',
        // allows a fallback url if WPGRAPHQL_URL is not set in the env, this may be a local or remote WP instance.
        schema: {
          //Prefixes all WP Types with "Wp" so "Post and allPost" become "WpPost and allWpPost".
          typePrefix: `Wp`,
          requestConcurrency: 5, // currently set to undefined
          previewRequestConcurrency: 2, // currently set to undefined
        },
        develop: {
          nodeUpdateInterval: 3000,
          hardCacheMediaFiles: true,
        },
        production: {
          hardCacheMediaFiles: false,
        },
        debug: {
          graphql: {
            showQueryOnError: false,
            showQueryVarsOnError: true,
            copyQueryOnError: true,
            panicOnError: true,
            // a critical error is a WPGraphQL query that returns an error and no response data. Currently WPGQL will error if we try to access private posts so if this is false it returns a lot of irrelevant errors.
            onlyReportCriticalErrors: true,
          },
        },
        excludeFieldNames: [`blocksJSON`, `saveContent`],
        type: {
          Post: {
            limit:
              process.env.NODE_ENV === `development`
                ? // Lets just pull 50 posts in development to make it easy on ourselves (aka. faster).
                  50
                : // and we don't actually need more than 5000 in production for this particular site
                  5000,
          }
        }
      }
    },
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "test",
      },
    },
    "gatsby-plugin-less",
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    "gatsby-plugin-mdx",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
     {
        resolve: 'gatsby-plugin-react-svg',
        options: {
            rule: {
                include: /\.inline\.svg$/,
            },
        },
    },
    {
        resolve: `gatsby-plugin-scroll-reveal`,
        options: {
            threshold: 0.4, // Percentage of an element's area that needs to be visible to launch animation
            once: true, // Defines if animation needs to be launched once
            disable: false, // Flag for disabling animations

            // Advanced Options
            selector: '[data-sal]', // Selector of the elements to be animated
            animateClassName: 'sal-animate', // Class name which triggers animation
            disabledClassName: 'sal-disabled', // Class name which defines the disabled state
            rootMargin: '0% 50%', // Corresponds to root's bounding box margin
            enterEventName: 'sal:in', // Enter event name
            exitEventName: 'sal:out', // Exit event name
        },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/static`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `WeWater`,
        short_name: `WeWater`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `static/Logo1.png`, // This path is relative to the root of the site.
      },
    },
  ],
};
