import fs from 'fs';

const path = require('path')

const { resolve } = path;

require('dotenv').config({
    path: `.env`,
});

const localesNSContent = {
    en: [
        {
            content: fs.readFileSync(`src/locales/en/common.json`, 'utf8'),
            ns: 'common',
        },
        {
            content: fs.readFileSync(`src/locales/en/page_impressum.json`, 'utf8'),
            ns: 'page_impressum',
        },
        {
            content: fs.readFileSync(`src/locales/en/page_spenden.json`, 'utf8'),
            ns: 'page_spenden',
        },
        {
            content: fs.readFileSync(`src/locales/en/page_team.json`, 'utf8'),
            ns: 'page_team',
        },
        {
            content: fs.readFileSync(`src/locales/en/page_dataprotection.json`, 'utf8'),
            ns: 'page_dataprotection',
        },
        {
            content: fs.readFileSync(`src/locales/en/page_filtersystem.json`, 'utf8'),
            ns: 'page_filtersystem',
        },
        {
            content: fs.readFileSync(`src/locales/en/page_shop.json`, 'utf8'),
            ns: 'page_shop',
        },
        {
            content: fs.readFileSync(`src/locales/en/page_projekte.json`, 'utf8'),
            ns: 'page_projekte',
        },
        {
            content: fs.readFileSync(`src/locales/en/page_contact.json`, 'utf8'),
            ns: 'page_contact',
        },
        {
            content: fs.readFileSync(`src/locales/en/page_blog.json`, 'utf8'),
            ns: 'page_blog',
        },
        {
            content: fs.readFileSync(`src/locales/en/page_unterstuetzen.json`, 'utf8'),
            ns: 'page_unterstuetzen',
        },
        {
            content: fs.readFileSync(`src/locales/en/page_partner.json`, 'utf8'),
            ns: 'page_partner',
        },
    ],
    de: [
        {
            content: fs.readFileSync(`src/locales/de/common.json`, 'utf8'),
            ns: 'common',
        },
        {
            content: fs.readFileSync(`src/locales/de/page_impressum.json`, 'utf8'),
            ns: 'page_impressum',
        },
        {
            content: fs.readFileSync(`src/locales/de/page_spenden.json`, 'utf8'),
            ns: 'page_spenden',
        },
                {
            content: fs.readFileSync(`src/locales/de/page_team.json`, 'utf8'),
            ns: 'page_team',
        },
        {
            content: fs.readFileSync(`src/locales/de/page_dataprotection.json`, 'utf8'),
            ns: 'page_dataprotection',
        },
        {
            content: fs.readFileSync(`src/locales/de/page_filtersystem.json`, 'utf8'),
            ns: 'page_filtersystem',
        },
        {
            content: fs.readFileSync(`src/locales/de/page_shop.json`, 'utf8'),
            ns: 'page_shop',
        },
        {
            content: fs.readFileSync(`src/locales/de/page_projekte.json`, 'utf8'),
            ns: 'page_projekte',
        },
        {
            content: fs.readFileSync(`src/locales/de/page_contact.json`, 'utf8'),
            ns: 'page_contact',
        },
        {
            content: fs.readFileSync(`src/locales/de/page_blog.json`, 'utf8'),
            ns: 'page_blog',
        },
        {
            content: fs.readFileSync(`src/locales/de/page_unterstuetzen.json`, 'utf8'),
            ns: 'page_unterstuetzen',
        },
        {
            content: fs.readFileSync(`src/locales/de/page_partner.json`, 'utf8'),
            ns: 'page_partner',
        },
    ],
};

const availableLocales = [
    { lang: 'de', text: 'Deutsch' },
    { lang: 'en', text: 'English' },
];

const defaultLocales = { lang: 'de', text: 'Deutsch' };


export function onCreateWebpackConfig({ actions }) {
  actions.setWebpackConfig({
    resolve: {
      alias: { '../../theme.config$': path.join(__dirname, 'src/semantic/theme.config') },
    },
  })
}

export async function createPages ({ graphql, actions }) {
  const { createPage } = actions
  const blogPostTemplate = resolve(`src/templates/blog-post.tsx`);
  // const shopArticleTemplate = resolve(`src/templates/shop-article.tsx`);

   const result = await graphql(`
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


     if (result.errors) {
        reporter.panicOnBuild(`Error while running GraphQL query.`);
        return;
    }

    result.data.allWpPost.edges.forEach(({ node }) => {
            createPageForEachLanguage(createPage, blogPostTemplate, node.slug);
/*         else {
            createPageForEachLanguage(createPage, shopArticleTemplate, node.frontmatter.path);
        } */
    });

  /*return graphql(`
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
  `).then(result => {
    result.data.allWpPost.edges.forEach(({ node }) => {
      createPage({
        // Decide URL structure
        path: node.slug,
        // path to template
        component: path.resolve(`./src/templates/blog-post.tsx`),
        context: {
          // This is the $slug variable
          // passed to blog-post.js
          slug: node.slug,
        },
      })
    })
  }) */
}

function createPageForEachLanguage(createPage, component, originalPath) {
    availableLocales.map(({ lang }) => {
        let localizedPath = `/${lang}${originalPath}`;
        if (defaultLocales.lang === lang) {
            localizedPath = originalPath;
        }

        const localePage = {
            component: component,
            originalPath: originalPath,
            path: localizedPath,
            context: {
                availableLocales,
                locale: lang,
                routed: true,
                data: localesNSContent[lang],
                originalPath: originalPath,
                slug: originalPath
            },
        };
        createPage(localePage);
    });
}

export async function onCreatePage({ page, actions: { createPage, deletePage } }) {
    if (/^\/dev-404-page\/?$/.test(page.path)) {
        return;
    }

    // Delete the original page (since we are gonna create localized versions of it)
    deletePage(page);

    // Create one page for each locale
    availableLocales.map(({ lang }) => {
        let localizedPath = `/${lang}${page.path}`;
        if (defaultLocales.lang === lang) {
            localizedPath = page.path;
        }

        const localePage = {
            ...page,
            originalPath: page.path,
            path: localizedPath,
            context: {
                availableLocales,
                locale: lang,
                routed: true,
                data: localesNSContent[lang],
                originalPath: page.path,
            },
        };
        createPage(localePage);
    });
}