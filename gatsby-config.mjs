import { dirname } from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const path = require("path");
const adapter = require("gatsby-adapter-netlify").default;

const __dirname = dirname(fileURLToPath(import.meta.url));

const {
  NODE_ENV,
  URL: NETLIFY_SITE_URL = "https://wewater-staging.org/",
  DEPLOY_PRIME_URL: NETLIFY_DEPLOY_URL = NETLIFY_SITE_URL,
  CONTEXT: NETLIFY_ENV = NODE_ENV,
} = process.env;
const isNetlifyProduction = NETLIFY_ENV === "production";
const siteUrl = isNetlifyProduction ? NETLIFY_SITE_URL : NETLIFY_DEPLOY_URL;

const config = {
  siteMetadata: {
    title: `WeWater`,
    description: `WeWater`,
    siteUrl: siteUrl,
    author: `Christoph Meise`,
  },
  adapter: adapter({
    excludeDatastoreFromEngineFunction: false,
  }),
  plugins: [
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        url: "https://www.wewaterbackend.org/graphql",
        verbose: true,
        // url: process.env.WPGRAPHQL_URL || 'https://www.wewaterbackend.org/graphql',
        //'https://wewater.org/graphql',
        // allows a fallback url if WPGRAPHQL_URL is not set in the env, this may be a local or remote WP instance.
        schema: {
          //Prefixes all WP Types with "Wp" so "Post and allPost" become "WpPost and allWpPost".
          typePrefix: `Wp`,
          requestConcurrency: 50, // currently set to undefined
          previewRequestConcurrency: 50, // currently set to undefined
          perPage: 100,
          timeout: 60000,
        },
        type: {
          MediaItem: {
            localFile: {
              excludeByMimeTypes: [`video/mp4`, `video/mov`],
            },
          },
          Commenter: {
            excludeFieldNames: [`databaseId`],
          },
          BlockEditorPreview: {
            excludeFieldNames: [`databaseId`],
          },
        },
        develop: {
          nodeUpdateInterval: 3000,
          hardCacheMediaFiles: false, // true
        },
        production: {
          hardCacheMediaFiles: false,
        },
        /*   debug: {
          graphql: {
            showQueryOnError: true,
            showQueryVarsOnError: true,
            copyQueryOnError: false,
            panicOnError: false,
            onlyReportCriticalErrors: false,
          },
        }, */
        excludeFieldNames: [`blocksJSON`, `saveContent`, `databaseId`],
      },
    },
    {
      resolve: `gatsby-plugin-gdpr-cookies`,
      options: {
        googleAnalytics: {
          trackingId: "UA-135467862-1", // leave empty if you want to disable the tracker
          cookieName: "gatsby-gdpr-google-analytics", // default
          anonymize: true, // default
          allowAdFeatures: false, // default
        },
        googleTagManager: {
          trackingId: "GTM-5BBDTWL", // leave empty if you want to disable the tracker
          cookieName: "gatsby-gdpr-google-tagmanager", // default
          dataLayerName: "dataLayer", // default
        },
        /*
                facebookPixel: {
                  pixelId: 'YOUR_FACEBOOK_PIXEL_ID', // leave empty if you want to disable the tracker
                  cookieName: 'gatsby-gdpr-facebook-pixel', // default
                }, */
        // defines the environments where the tracking should be available  - default is ["production"]
        environments: ["production", "development"],
      },
    },
    "gatsby-plugin-less",
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    // "gatsby-plugin-instagram-embed",
    /*     "gatsby-plugin-webpack-bundle-analyser-v2", */
    {
      resolve: "gatsby-plugin-react-svg",
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
        selector: "[data-sal]", // Selector of the elements to be animated
        animateClassName: "sal-animate", // Class name which triggers animation
        disabledClassName: "sal-disabled", // Class name which defines the disabled state
        rootMargin: "0% 50%", // Corresponds to root's bounding box margin
        enterEventName: "sal:in", // Enter event name
        exitEventName: "sal:out", // Exit event name
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
        path: "./src/locales",
        name: `locale`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/static`,
      },
    },
    {
      resolve: `gatsby-plugin-react-i18next`,
      options: {
        localeJsonSourceName: `locale`, // name given to `gatsby-source-filesystem` plugin.
        languages: [`en`, `de`, `fr`],
        defaultLanguage: `de`,
        // if you are using Helmet, you must include siteUrl, and make sure you add http:https
        siteUrl: siteUrl,
        // you can pass any i18next options
        // pass following options to allow message content as a key
        i18nextOptions: {
          interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
          },
          keySeparator: false,
          nsSeparator: false,
        },
        pages: [
          /*           {
                      matchPath: '/:lang?/blog/:uid',
                      getLanguageFromPath: true,
                    } */
          /*          {
                     matchPath: '/shop/*',
                     languages: ['de']
                   } */
        ],
      },
    },
    /*     {
          resolve: `gatsby-plugin-purgecss`,
          options: {
            printRejected: true, // Print removed selectors and processed file names
            develop: false, // Enable while using `gatsby develop`
            // tailwind: true, // Enable tailwindcss support
            // ignore: ['/ignored.css', 'prismjs/', 'docsearch.js/'], // Ignore files/folders
            purgeOnly: ['semantic-ui-less/'], // Purge only these files/folders
            purgeCSSOptions: {
              // https://purgecss.com/configuration.html#options
              safelist: {
                deep: [/transition$/, /visible$/],
                greedy: [/menu$/, /link$/, /item$/, /grid$/, /container$/, /flag$/, /input$/, /selection$/, /dropdown$/, /table$/, /accordion$/, /popup$/, /tiny$/]
              }
            },
          },
        }, */
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        resolveEnv: () => NETLIFY_ENV,
        env: {
          production: {
            policy: [{ userAgent: "*" }],
          },
          "branch-deploy": {
            policy: [{ userAgent: "*", disallow: ["/"] }],
            sitemap: null,
            host: null,
          },
          "deploy-preview": {
            policy: [{ userAgent: "*", disallow: ["/"] }],
            sitemap: null,
            host: null,
          },
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `WeWater`,
        short_name: `WeWater`,
        start_url: `/`,
        background_color: `#FFFFFF`,
        theme_color: `#3cb9eb`,
        display: `minimal-ui`,
        icon: `static/maskable_icon_x192.png`, // This path is relative to the root of the site.
        cache_busting_mode: "none",
        icon_options: {
          // For all the options available,
          // please see the section "Additional Resources" below.
          purpose: `any maskable`,
        },
      },
    },
  ],
};

export default config;
