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
                        author
                    }
                }
            }
        `,
    );

    const t = useI18next();
    const currentLanguage: string = t.language.toString();

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
                        content: description,
                    },
                    {
                        property: `og:title`,
                        content: title,
                    },
                    {
                        property: `og:description`,
                        content: description,
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
                        content: description,
                    },
                ].concat(meta || [])}
            />
        </React.Fragment>
    );
};

export default SEO;
