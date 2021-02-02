import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import { Helmet } from 'react-helmet';

interface Props {
    description?: string;
    lang?: string;
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

    const metaDescription = description || site.siteMetadata.description;
    return (
        <React.Fragment>
            <Helmet
                htmlAttributes={{
                    lang: 'en'
                }}
                script={[
                    {
                        type: 'text/javascript',
                        innerHTML: `
                            var _bp_iframe        = _bp_iframe || {};
                            _bp_iframe.project_id = 68773; /* REQUIRED */
                            _bp_iframe.lang       = 'de'; /* Language of the form */
                            _bp_iframe.width = 600; /* Custom iframe-tag-width, integer */
                            _bp_iframe.color = '5ABEE6'; /* Button and banderole color, hex without "#" */
                            _bp_iframe.background_color = 'ffffff'; /* Background-color, hex without "#" */
                            _bp_iframe.default_amount = 20; /* Donation-amount, integer 1-99 */
                            _bp_iframe.default_data_transfer_accepted = true; /* true (default), false */
                            _bp_iframe.recurring_interval = 'single'; /* Interval for recurring donations, string out of ["single", "monthly", "quarter_yearly", "half_yearly", "yearly"] */
                            _bp_iframe.bottom_logo = true;
                            (function() {
                                var bp = document.createElement('script'); bp.type = 'text/javascript'; bp.async = true;
                                bp.src = 'https://betterplace-assets.betterplace.org/assets/load_donation_iframe.js';
                                var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(bp, s);
                            })();`
                    }
                ]}
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
