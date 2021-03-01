// i18next-extract-mark-ns-start page_filtersystem
import { graphql } from 'gatsby';
import { Trans } from 'gatsby-plugin-react-i18next';
import React from 'react';
import { Container } from 'semantic-ui-react';
import VideoOverlay from '../components/HeaderOverlay/video-overlay';
import Layout from '../components/Layout/Layout';
import SEO from '../components/seo';
import { useTranslationHOC } from '../components/useTranslationHOC/useTranslationHOC';

interface Props {
    t: any;
}

class FiltersystemPage extends React.Component<Props, any> {
    constructor(props) {
        super(props);
    }

    render() {
        const { t } = this.props;

        return (
            <Layout>
                <SEO title={t('FiltersystemeSEOTitle')} description={t('FiltersystemeSEODescription')} />
                <VideoOverlay content={<OverlayContent t={t} inverted={true} />} darken={false} sources='videos/filtersystem.mp4' />
                <Container className="global-header-padding">
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

class OverlayContent extends React.Component<any, any> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        const { inverted, t } = this.props;

        return (
            <div>
                <h1
                    className={`header-overlay-headline ${inverted ? 'header-overlay-headline-inverted' : ''}`}
                    style={{ marginBottom: '1.5rem' }}
                >
                    {t('page_filtersystem:headline')}
                </h1>
                <h2 className={`header-overlay-subheadline ${inverted ? 'header-overlay-subheadline-inverted' : ''}`}
                    style={{ marginBottom: '1.5rem', marginTop: '0rem' }}>
                    <p>
                        {t('page_filtersystem:subheadline')}
                    </p>
                </h2>
            </div>
        );
    }
}

export const pageQuery = graphql`
    query($language: String!) {
        locales: allLocale(filter: {language: {eq: $language}}) {
          ...GetTranslations
        }
    }
`;

export default useTranslationHOC(FiltersystemPage);
