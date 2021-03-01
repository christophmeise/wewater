// i18next-extract-mark-ns-start page_unterstuetzen
import { graphql } from 'gatsby';
import { Trans } from 'gatsby-plugin-react-i18next';
import React from 'react';
import { Container } from 'semantic-ui-react';
import Layout from '../components/Layout/Layout';
import PlainHeader from '../components/PlainOverlay/plain-header';
import SEO from '../components/seo';
import { useTranslationHOC } from '../components/useTranslationHOC/useTranslationHOC';


interface Props {
    t: any;
}

class UnterstuetzenPage extends React.Component<Props, any> {
    constructor(props) {
        super(props);
    }

    render() {
        const { t } = this.props;

        return (
            <Layout>
                <SEO title={t('UnterstuetzenSEOTitle')} description={t('UnterstuetzenSEODescription')} />
                <Container className="global-header-padding">
                    <PlainHeader content={HeaderContent(t)} />
                    <Container text>
                        <div className="main-content-sections">
                            <section>
                                <p><Trans>Wenn du an WeWater spenden möchtest, dann gibt es dafür drei Möglichkeiten:</Trans></p>
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
            <h1 className="header-overlay-headline">{t('page_unterstuetzen:headline')}</h1>
            <h2 className="header-overlay-subheadline">{t('page_unterstuetzen:subheadline')}</h2>
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

export default useTranslationHOC(UnterstuetzenPage);
