// i18next-extract-mark-ns-start page_versand
import { graphql } from 'gatsby';
import { Trans } from 'gatsby-plugin-react-i18next';
import React from 'react';
import { Container, Header } from 'semantic-ui-react';
import Layout from '../../components/Layout/Layout';
import SEO from '../../components/seo';
import { useTranslationHOC } from '../../components/useTranslationHOC/useTranslationHOC';

interface Props {
    t: any;
    language: any;
    data: any;
}

class SuccessPage extends React.Component<Props, any> {
    constructor(props) {
        super(props);
    }

    render() {
        const { t, data } = this.props;

        let posts = data.blogposts?.edges;

        posts = posts.slice(0, 3);

        return (
            <Layout>
                <SEO title={t('SuccessSEOTitle')} description={t('SuccessSEODescription')} />
                <Container className="global-header-padding">
                    <Header
                        data-sal="slide-up"
                        data-sal-delay="0"
                        data-sal-duration="300"
                        data-sal-easing="ease"
                        textAlign='left'
                        className="global-flex-column global-no-margin"
                    >
                        <h3 className={`global-subtitle text-primary`}><Trans>Vielen Dank!</Trans></h3>
                        <h2 className="global-headline"><Trans>Dein Kauf wurde erfolgreich abgeschlossen</Trans></h2>
                    </Header>
                    <div className="main-content-sections">
                        <section>
                            <p><Trans>Danke, dass du dich für WeWater einsetzt. Deine Zahlung war erfolgreich und du erhälst per E-Mail eine Kaufbestätigung.</Trans></p>
                            <p><Trans>
                                Logge dich in dein PayPal-Konto ein, um die Transaktionsdetails einzusehen.
                            </Trans></p>
                        </section>
                    </div>
                </Container >
            </Layout >
        );
    }
}


export const pageQuery = graphql`
    query($language: String!) {
        locales: allLocale(filter: {language: {eq: $language}}) {
          ...GetTranslations
        }
        blogposts: allWpPost(sort: {fields: date, order: DESC}, filter: {language: {slug: {eq: $language}}}) {
        ...GetBlogposts
      }
    }
`;

export default useTranslationHOC(SuccessPage);
