// i18next-extract-mark-ns-start page_versand
import { graphql } from 'gatsby';
import { Trans } from 'gatsby-plugin-react-i18next';
import React from 'react';
import { Container, Grid, GridColumn, Header } from 'semantic-ui-react';
import Layout from '../components/Layout/Layout';
import SEO from '../components/seo';
import SidebarWidget from '../components/Sidebar/sidebar';
import { useTranslationHOC } from '../components/useTranslationHOC/useTranslationHOC';

interface Props {
    t: any;
}

class VersandPage extends React.Component<Props, any> {
    constructor(props) {
        super(props);
    }

    render() {
        const { t } = this.props;

        return (
            <Layout>
                <SEO title={t('VersandSEOTitle')} description={t('VersandSEODescription')} />
                <Container className="global-header-padding">
                    <Grid columns={2}>
                        <GridColumn width={12}>
                            <Header
                                data-sal="slide-up"
                                data-sal-delay="0"
                                data-sal-duration="300"
                                data-sal-easing="ease"
                                textAlign='left'
                                className="global-flex-column global-no-margin"
                            >
                                <h3 className={`global-subtitle text-primary`}>Informationen</h3>
                                <h2 className="global-headline"><Trans>Kosten für Versand und Verpackung</Trans></h2>
                            </Header>
                            <div className="main-content-sections">
                                <section>
                                    <p><Trans>Danke, dass du dich für WeWater interessierst. Wir haben für Bestellungen aus unserem Online-Shop Pauschalpreise für Versand und Verpackung je nach Produktart kalkuliert.</Trans></p>
                                    <p><Trans>
                                        Diese betragen für den Versand nach … <br />
                                Deutschland: 4,99 € für T-Shirts und Pullover sowie 5,99 € für AQQAbags und Kalender. <br />
                                Beim Kauf von Gutscheinen für die Wasserspende werden immer 0,95 € Versandkosten berechnet. Auch beim digitalen Versand als PDF.
                            </Trans></p>
                                    <p><Trans>
                                        Für die folgenden Länder gibt es Pauschalpreis. <br />
                                Österreich: 13,99 € <br />
                                Schweiz: 19,00 € <br />
                                Spanien: 19,99 € <br />
                                    </Trans></p>
                                    <p><Trans>
                                        Weitere Zielländer gerne auf Anfrage an hi@wewater.org. Ausgenommen sind bei diesen Pauschalpreisen Bestellungen des AQQAcube. Dafür muss ein individueller Preis berechnet werden.
                            </Trans></p>
                                </section>
                            </div>
                        </GridColumn>
                        <GridColumn width={4}>
                            <SidebarWidget></SidebarWidget>
                        </GridColumn>
                    </Grid>
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
    }
`;

export default useTranslationHOC(VersandPage);
