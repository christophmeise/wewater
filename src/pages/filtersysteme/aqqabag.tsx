// i18next-extract-mark-ns-start page_aqqabag
import { graphql } from 'gatsby';
import { Trans } from 'gatsby-plugin-react-i18next';
import React from 'react';
import { Container, Grid, GridColumn, Header, Table } from 'semantic-ui-react';
import Layout from '../../components/Layout/Layout';
import SEO from '../../components/seo';
import SidebarWidget from '../../components/Sidebar/sidebar';
import { useTranslationHOC } from '../../components/useTranslationHOC/useTranslationHOC';

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

class AqqabagPage extends React.Component<Props, any> {
    constructor(props) {
        super(props);
    }

    render() {
        const { t } = this.props;

        const tableData = [
            {
                key: 'Anwendung',
                value: 'Sofortlösung (z.B. nach einer Umweltkatastrophe)'
            },
            {
                key: 'Anwender',
                value: 'Einzelperson, Reisende'
            },
            {
                key: 'Filtermenge',
                value: '4 Liter Trinkwasser mindestens bei 8 Std. Betriebszeit am Tag'
            },
            {
                key: 'Innovation',
                value: 'Membranfilter mit hoher Rückhalterate'
            },
            {
                key: 'Kosten',
                value: '41,65 Euro brutto pro Stück (bei kleiner Auflage, ab Auflage von 1.000 Stück sinken die Kosten pro Stück)'
            },
            {
                key: 'Rückhalterate Bakterien',
                value: '99,9999 Prozent'
            },
            {
                key: 'Haltbarkeit',
                value: '6 Monate im Dauerbetrieb (gelegentlich muss der AQQAbag mit klarem Wasser ausgespült werden)'
            },
            {
                key: 'Bedienungsanleitung',
                value: `<a href="https://wewater.org/wp-content/uploads/2019/09/anleitung_aqqabag.pdf" target="_blank">Deutsch</a>/
                    <a href="https://wewater.org/wp-content/uploads/2019/09/aqqabag_instructions.pdf" target="_blank">Englisch</a> (PDF)`
            },
        ];

        return (
            <Layout>
                <SEO title={t('AqqabagSEOTitle')} description={t('AqqabagSEODescription')} />
                <Container className="global-header-padding">
                    <Header
                        data-sal="slide-up"
                        data-sal-delay="0"
                        data-sal-duration="300"
                        data-sal-easing="ease"
                        textAlign='left'
                        className="global-flex-column global-no-margin"
                    >
                        <h3 className={`global-subtitle text-primary`}>AQQA®bag</h3>
                        <h2 className="global-headline"><Trans>Die Lösung für den Soforteinsatz für Einzelpersonen</Trans></h2>
                    </Header>
                    <Grid>
                        <GridColumn width={12}>
                            <section>

                                <Table color="teal">
                                    <Table.Header>
                                        <Table.Row>
                                            <Table.HeaderCell><Trans>Übersicht</Trans></Table.HeaderCell>
                                            <Table.HeaderCell><Trans>Anwendung</Trans></Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Header>

                                    <Table.Body>
                                        {tableData.map((row) => {
                                            return (
                                                <Table.Row key={row.key}>
                                                    <Table.Cell><Trans>{row.key}</Trans></Table.Cell>
                                                    <Table.Cell><Trans><span dangerouslySetInnerHTML={{ __html: row.value }}></span></Trans></Table.Cell>
                                                </Table.Row>
                                            );
                                        })}
                                    </Table.Body>
                                </Table>

                                <p><Trans>
                                    Um kurzfristig den Bedarf an Trinkwasser zu decken, kann der AQQAbag eine Person ein halbes Jahr lang mit vier Litern Trinkwasser pro Tag versorgen.
                                    <a href="https://wewater.org/wp-content/uploads/2019/09/WW09232019-BCS-1909302-303p.pdf" target="_blank"> Das Zertifikat für den AQQAbag haben wir hier hochgeladen.</a>
                                </Trans></p>
                                <p><Trans>
                                    Das AQQAsystem basiert auf der Idee des AQQAbag. Es macht in größerem Maßstab aus Oberflächenwasser hygienisch sicheres Trinkwasser. Dabei kann es direkt an eine Wasserquelle oder einen Flußlauf installiert werden.
                        </Trans></p>
                                <p><Trans>
                                    Im ersten Reinigungsschritt wird in modularen Boxen, die mit unseren Filterplatten bestückt sind, das Wasser durch die Membran gereinigt. Die Membran besitzt eine Rückhaltewirkung von 99,9999 Prozent für Bakterien. Es wird nur mit geringstem Druck filtriert. Dadurch kann sich der Schmutz nur mit Hilfe der Schwerkraft von der Filterplatte lösen.
                        </Trans></p>
                                <p><Trans>
                                    AQQAsystem kann monatelang ohne Reinigung und mit gleich bleibender Leistung genutzt werden und kann durch die Aneinanderreihung mehrerer Boxen für jeden Anwendungsfall konfiguriert werden – von ca. 500 bis 30.000 Litern pro Tag. Unser Filtersystem ist damit eine dauerhafte Lösung zur Trinkwasserversorgung von Dörfern und Gemeinschaften, in denen mehrere Menschen leben.
                        </Trans></p>
                            </section>
                        </GridColumn>
                        <GridColumn width={4}>
                            <SidebarWidget></SidebarWidget>
                        </GridColumn>
                    </Grid>

                </Container>
            </Layout>
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

export default useTranslationHOC(AqqabagPage);
