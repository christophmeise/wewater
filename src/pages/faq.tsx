// i18next-extract-mark-ns-start page_faq
import { graphql } from 'gatsby';
import React from 'react';
import { Container } from 'semantic-ui-react';
import FAQAccordion from '../components/FAQAccordionItem/faq-accordion';
import Layout from '../components/Layout/Layout';
import PlainHeader from '../components/PlainOverlay/plain-header';
import SEO from '../components/seo';
import { useTranslationHOC } from '../components/useTranslationHOC/useTranslationHOC';

interface Props {
    t: any;
    data: any;
    language: any;
}

class FAQPage extends React.Component<Props, any> {
    constructor(props) {
        super(props);
    }

    render() {
        const { t, data, language } = this.props;

        const faqContent = [];

        const pageData = language === 'de' ? data?.german?.edges[0]?.node?.blocksJSON : data?.english?.edges[0]?.node?.blocksJSON;

        const blocksJSON: any[] = pageData != null ? JSON.parse(pageData) : [];
        const faqContentBlock = blocksJSON?.filter((blocksJSON) => blocksJSON.name === 'yoast/faq-block');
        let faqContentFields;
        if (faqContentBlock != null && faqContentBlock.length > 0) {
            faqContentFields = faqContentBlock[0]?.attributes?.questions;
            for (let index = 0; index < faqContentFields.length; index++) {
                const element = faqContentFields[index];
                faqContent.push({
                    index: index,
                    question: element?.jsonQuestion,
                    answer: element?.jsonAnswer,
                });
            }
        }

        return (
            <Layout>
                <SEO title={t('FAQSEOTitle')} description={t('FAQSEODescription')} />
                <Container className="global-header-padding">
                    <PlainHeader content={HeaderContent(t)} />
                    <Container text>
                        <div className="main-content-sections">
                            <section>
                                <FAQAccordion t={t} faqContent={faqContent}></FAQAccordion>
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
            <h1 className="header-overlay-headline">{t('page_faq:headline')}</h1>
            <h2 className="header-overlay-subheadline">{t('page_faq:subheadline')}</h2>
        </div>
    );
};

export const pageQuery = graphql`
    query($language: String!) {
        locales: allLocale(filter: {language: {eq: $language}}) {
          ...GetTranslations
        }
        german: allWpPage(filter: {title: {eq: "FAQ1"}, language: {locale: {eq: "de_DE"}}}) {
            edges {
                node {
                    id
                    title
                    language {
                        code
                        locale
                    }
                    blocksJSON
                }
            }
        }
        english: allWpPage(filter: {title: {eq: "FAQ1"}, language: {locale: {eq: "en_GB"}}}) {
            edges {
                node {
                    id
                    title
                    language {
                        code
                        locale
                    }
                    blocksJSON
                }
            }
        }
    }
`;

export default useTranslationHOC(FAQPage);
