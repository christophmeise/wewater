import { graphql, useStaticQuery } from 'gatsby';
import { useI18next } from 'gatsby-plugin-react-i18next';
import React from 'react';
import { Helmet } from 'react-helmet';

interface Props {
    description?: string;
    meta?: [];
    title: string;
}

const SEO = ({ description, meta, title }: Props) => {
    const { site } = useStaticQuery(
        graphql`
            query {
                site {
                    siteMetadata {
                        title
                        description
                        author
                    }
                }
            }
        `,
    );

    const t = useI18next();
    const currentLanguage: string = t.language.toString();

    const metaDescription = description || site.siteMetadata.description;
    return (
        <React.Fragment>
            <Helmet
                htmlAttributes={{
                    lang: currentLanguage
                }}
                title={title}
                titleTemplate={`%s | ${site.siteMetadata.title}`}
                meta={[
                    {
                        name: `description`,
                        content: metaDescription,
                    },
                    {
                        property: `og:title`,
                        content: title,
                    },
                    {
                        property: `og:description`,
                        content: metaDescription,
                    },
                    {
                        property: `og:type`,
                        content: `website`,
                    },
                    {
                        name: `twitter:card`,
                        content: `summary`,
                    },
                    {
                        name: `twitter:creator`,
                        content: site.siteMetadata.author,
                    },
                    {
                        name: `twitter:title`,
                        content: title,
                    },
                    {
                        name: `twitter:description`,
                        content: metaDescription,
                    },
                ].concat(meta || [])}
            />
        </React.Fragment>
    );
};

export default SEO;
