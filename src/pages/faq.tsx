// i18next-extract-mark-ns-start page_faq
import { graphql } from 'gatsby';
import React from 'react';
import { Container, Grid, GridColumn } from 'semantic-ui-react';
import FAQAccordion from '../components/FAQAccordionItem/faq-accordion';
import Layout from '../components/Layout/Layout';
import PlainHeader from '../components/PlainOverlay/plain-header';
import SEO from '../components/seo';
import SidebarWidget from '../components/Sidebar/sidebar';
import { useTranslationHOC } from '../components/useTranslationHOC/useTranslationHOC';

interface Props {
    t: any;
    data: any;
    language: any;
}

interface FAQContent {
    headline: string;
    accordion: any[];
}

class FAQPage extends React.Component<Props, any> {
    constructor(props) {
        super(props);
    }

    render() {
        const { t, data } = this.props;
        const pageData = data?.faq?.edges[0]?.node?.blocksJSON;
        const blocksJSON: any[] = pageData != null ? JSON.parse(pageData) : [];
        const faqContentBlock = blocksJSON?.filter((blocksJSON) => blocksJSON.name === 'yoast/faq-block');

        const contents: FAQContent[] = [];

        let faqContent: FAQContent = {
            headline: null,
            accordion: []
        };


        let faqContentFields;
        if (faqContentBlock != null && faqContentBlock.length > 0) {
            faqContentFields = faqContentBlock[0]?.attributes?.questions;
            for (let index = 0; index < faqContentFields.length; index++) {
                const element = faqContentFields[index];
                if (element?.jsonQuestion === 'SUBHEADLINE') {
                    if (faqContent.accordion.length > 0) {
                        contents.push(JSON.parse(JSON.stringify(faqContent)));
                        faqContent = {
                            headline: null,
                            accordion: []
                        };
                    }
                    faqContent.headline = element?.jsonAnswer;
                } else {
                    faqContent.accordion.push({
                        index: index,
                        question: element?.jsonQuestion,
                        answer: element?.jsonAnswer,
                    });
                }
            }
            contents.push(JSON.parse(JSON.stringify(faqContent)));
        }

        let posts = data.blogposts?.edges;
        posts = posts.slice(0, 3);

        return (
            <Layout>
                <SEO title={t('FAQSEOTitle')} description={t('FAQSEODescription')} />
                <Container className="global-header-padding">
                    <PlainHeader content={HeaderContent(t)} />
                    <div className="main-content-sections">
                        <Grid columns={2} stackable>
                            <GridColumn width={12}>
                                <section>
                                    {contents.map((entry: FAQContent, index: any) => {
                                        return (
                                            <div key={index}>
                                                <h4>{entry.headline}</h4>
                                                <FAQAccordion t={t} faqContent={entry.accordion}></FAQAccordion>
                                            </div>
                                        );
                                    })}
                                </section>
                            </GridColumn>
                            <GridColumn width={4}>
                                <SidebarWidget posts={posts}></SidebarWidget>
                            </GridColumn>
                        </Grid>
                    </div>
                </Container>
            </Layout >
        );
    }
}

const HeaderContent = (t) => {
    return (
        <div>
            <h1 className="header-overlay-headline">{t('FAQ')}</h1>
            <h2 className="header-overlay-subheadline">{t('Häufig gestellte Fragen')}</h2>
        </div>
    );
};

export const pageQuery = graphql`
    query($language: String!) {
        locales: allLocale(filter: {language: {eq: $language}}) {
          ...GetTranslations
        }
        faq: allWpPage(filter: {title: {eq: "FAQ1"}, language: {slug: {eq: $language}}}) {
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
        blogposts: allWpPost(sort: {fields: date, order: DESC}, filter: {language: {slug: {eq: $language}}}) {
            ...GetBlogposts
        }
    }
`;

export default useTranslationHOC(FAQPage);
