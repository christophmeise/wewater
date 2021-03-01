// i18next-extract-mark-ns-start page_contact
import { graphql } from 'gatsby';
import { Trans } from 'gatsby-plugin-react-i18next';
import React from 'react';
import { Container, Grid, Icon } from 'semantic-ui-react';
import ContactForm from '../components/ContactForm/contactForm';
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

class Contact extends React.Component<Props, any> {
    constructor(props) {
        super(props);
    }

    render() {
        const { t } = this.props;

        return (
            <Layout>
                <SEO title={t('ContactSEOTitle')} description={t('ContactSEODescription')} />
                <Container className="global-header-padding">
                    <PlainHeader content={HeaderContent()} />
                    <div className="main-content-sections">
                        <Container>
                            <section>
                                <ContactForm disabled={false} t={t}></ContactForm>
                                <Grid textAlign="center" style={{ marginTop: '3rem' }}>
                                    <Grid.Row>
                                        <h3><Trans>Follow me on</Trans></h3>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <div>
                                            <a
                                                href="https://www.instagram.com/origin.is.sound/"
                                                target="_blank"
                                                rel="noopener"
                                                aria-label="Instagram"
                                            >
                                                <Icon className="hover-animate" size="massive" name="instagram" inverted></Icon>
                                            </a>
                                            <a
                                                href="https://open.spotify.com/user/h6f9bbmz6bizjpie8iaecmmpy?si=FmJNBjQVQ_-OiLvraoI1jA"
                                                target="_blank"
                                                rel="noopener"
                                                aria-label="Spotify"
                                            >
                                                <Icon className="hover-animate" size="massive" name="spotify" inverted></Icon>
                                            </a>
                                            <a
                                                href="https://www.youtube.com/channel/UCfpN0cGzebluj7aYa-6IhtQ"
                                                target="_blank"
                                                rel="noopener"
                                                aria-label="Youtube"
                                            >
                                                <Icon className="hover-animate" size="massive" name="youtube" inverted></Icon>
                                            </a>
                                        </div>
                                    </Grid.Row>
                                </Grid>
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
            <h1 className="header-overlay-headline">Contact Origin is Sound</h1>
            <h2 className="header-overlay-subheadline">
                Leave a message or request
            </h2>
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
export default useTranslationHOC(Contact);
