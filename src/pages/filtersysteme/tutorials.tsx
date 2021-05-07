// i18next-extract-mark-ns-start page_tutorials
import { graphql } from 'gatsby';
import { Trans } from 'gatsby-plugin-react-i18next';
import React from 'react';
import { Container, Grid, GridColumn, GridRow } from 'semantic-ui-react';
import Layout from '../../components/Layout/Layout';
import PlainHeader from '../../components/PlainOverlay/plain-header';
import SEO from '../../components/seo';
import { useTranslationHOC } from '../../components/useTranslationHOC/useTranslationHOC';
import './tutorials.less';

interface Props {
    t: any;
}

class TutorialsPage extends React.Component<Props, any> {
    constructor(props) {
        super(props);
    }

    render() {
        const { t } = this.props;

        return (
            <Layout>
                <SEO title={t('TutorialsSEOTitle')} description={t('TutorialsSEODescription')} />
                <Container className="global-header-padding">
                    <PlainHeader content={HeaderContent(t)} />
                    <div className="main-content-sections">
                        <section>
                            <h4><Trans>Um die Installation, Inbetriebnahme, Wartung und Desinfektion des AQQAcube zu erklären, haben wir fünf Videos produziert.</Trans></h4>
                            <div className="global-header-padding">
                                <Grid stackable>
                                    <GridRow columns={2}>
                                        <GridColumn>
                                            <h5><Trans>Vorstellung AQQAcube</Trans></h5>
                                            <div className="yt-iframe-wrapper">
                                                <iframe loading="lazy" src="https://www.youtube.com/embed/YhAQGvI53-0" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                                            </div>
                                        </GridColumn>
                                        <GridColumn>
                                            <h5><Trans>Installation AQQAcube</Trans></h5>
                                            <div className="yt-iframe-wrapper">
                                                <iframe loading="lazy" src="https://www.youtube.com/embed/63zYRLNKUQQ" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                                            </div>
                                        </GridColumn>
                                    </GridRow>
                                    <GridRow columns={2}>
                                        <GridColumn>
                                            <h5><Trans>Inbetriebnahme AQQAcube</Trans></h5>
                                            <div className="yt-iframe-wrapper">
                                                <iframe loading="lazy" src="https://www.youtube.com/embed/Bk2HdfRUCIo" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                                            </div>
                                        </GridColumn>
                                        <GridColumn>
                                            <h5><Trans>Wartung AQQAcube</Trans></h5>
                                            <div className="yt-iframe-wrapper">

                                                <iframe loading="lazy" src="https://www.youtube.com/embed/20he8UjmFZs" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                                            </div>
                                        </GridColumn>
                                    </GridRow>
                                    <GridRow columns={2}>
                                        <GridColumn>
                                            <h5><Trans>Desinfektion AQQAcube</Trans></h5>
                                            <div className="yt-iframe-wrapper">
                                                <iframe loading="lazy" src="https://www.youtube.com/embed/QgTG1h1hZMA" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                                            </div>
                                        </GridColumn>
                                    </GridRow>
                                </Grid>
                            </div>
                        </section>
                    </div>
                </Container>
            </Layout>
        );
    }
}

const HeaderContent = (t) => {
    return (
        <div>
            <h1 className="header-overlay-headline">{t('Tutorials')}</h1>
            <h2 className="header-overlay-subheadline">{t('Installation, Inbetriebnahme, Wartung und Desinfektion')}</h2>
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

export default useTranslationHOC(TutorialsPage);
