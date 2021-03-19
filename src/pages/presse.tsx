// i18next-extract-mark-ns-start page_presse
import { graphql } from 'gatsby';
import React from 'react';
import { Container } from 'semantic-ui-react';
import Layout from '../components/Layout/Layout';
import PlainHeader from '../components/PlainOverlay/plain-header';
import SEO from '../components/seo';
import { useTranslationHOC } from '../components/useTranslationHOC/useTranslationHOC';

interface Props {
    t: any;
    data: any;
    language: any;
}

class PressePage extends React.Component<Props, any> {
    constructor(props) {
        super(props);
    }

    render() {
        const { t, data, language } = this.props;

        const pageData = language === 'de' ? data.german.edges[0].node.content : data.english.edges[0].node.content;


        return (
            <Layout>
                <SEO title={t('PresseSEOTitle')} description={t('PresseSEODescription')} />
                <Container className="global-header-padding">
                    <PlainHeader content={HeaderContent(t)} />
                    <Container text>
                        <div className="main-content-sections">
                            <section>
                                <p dangerouslySetInnerHTML={{ __html: pageData }}></p>
                            </section>
                        </div>
                    </Container>
                </Container>
            </Layout>
        );
    }
}

const HeaderContent = (t) => {
    return (
        <div>
            <h1 className="header-overlay-headline">{t('page_presse:headline')}</h1>
            <h2 className="header-overlay-subheadline">{t('page_presse:subheadline')}</h2>
        </div>
    );
};

export const pageQuery = graphql`

    query($language: String!) {
        locales: allLocale(filter: {language: {eq: $language}}) {
          ...GetTranslations
        }
        german: allWpPage(filter: {title: {eq: "Pressespiegel – WeWater in den Medien"}, language: {locale: {eq: "de_DE"}}}) {
            edges {
                node {
                    id
                    title
                    content
                    language {
                        code
                    }
                }
            }
        }
        english: allWpPage(filter: {title: {eq: "Press – WeWater in Media"}, language: {locale: {eq: "en_GB"}}}) {
            edges {
                node {
                    id
                    title
                    content
                    language {
                        code
                    }
                }
            }
        }
    }
`;

export default useTranslationHOC(PressePage);
