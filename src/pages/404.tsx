// i18next-extract-mark-ns-start page_404
import { graphql } from 'gatsby';
import { Trans } from 'gatsby-plugin-react-i18next';
import React from 'react';
import { Container } from 'semantic-ui-react';
import Layout from '../components/Layout/Layout';
import PlainHeader from '../components/PlainOverlay/plain-header';
import SEO from '../components/seo';
import { useTranslationHOC } from '../components/useTranslationHOC/useTranslationHOC';

interface Props {
    pageContext: any;
    t: any;
    data: {
        site: {
            siteMetadata: {
                title: string;
                description: string;
            };
        };
    };
}

class NotFound extends React.Component<Props, any> {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            pageContext: { locale },
            t,
        } = this.props;
        const data = this.props.data;
        return (
            <Layout>
                <SEO title={t('404SEOTitle')} description={t('404SEODescription')} />
                <Container className="global-header-padding">
                    <PlainHeader content={HeaderContent()} />
                    <div className="main-content-sections">
                        <Container>
                            <section>

                            </section>
                        </Container>
                    </div>
                </Container>
            </Layout>
        );
    }
}

const HeaderContent = () => {
    return (
        <div>
            <h1 className="header-overlay-headline"><Trans>NotFound</Trans></h1>
        </div>
    );
};

export const pageQuery = graphql`
    query($language: String!) {
        locales: allLocale(filter: {language: {eq: $language}}) {
          ...GetTranslations
        }
    }
`;
export default useTranslationHOC(NotFound);
