// i18next-extract-mark-ns-start page_aqqacube
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

class AqqacubePage extends React.Component<Props, any> {
    constructor(props) {
        super(props);
    }

    render() {
        const { t } = this.props;

        const tableData = [
            {
                key: 'Anwendung',
                value: 'Sofortlösung'
            },
            {
                key: 'Anwender',
                value: 'Lebensgemeinschaften, Dörfer, Flüchtlingsunterkünfte'
            },
            {
                key: 'Filtermenge',
                value: 'min. 400 Liter Trinkwasser pro Tag bei 8 Std. Betriebszeit'
            },
            {
                key: 'Innovation',
                value: 'Membranfilter mit hoher Rückhalterate'
            },
            {
                key: 'Kosten',
                value: '1273,30 Euro brutto pro Stück'
            },
            {
                key: 'Leergewicht',
                value: '30 kg'
            },
            {
                key: 'Rückhalterate Bakterien',
                value: '99,9999 Prozent <a href="https://wewater.org/wp-content/uploads/2019/09/WW09232019-BCS-1909302-303p.pdf" target="_blank">(zertifiziert von BCS, Florida, USA)</a>'
            },
            {
                key: 'Haltbarkeit',
                value: '6 Monate im Dauerbetrieb (gelegentlich muss der AQQAcube mit klarem Wasser ausgespült werden, nach 6 Monaten muss er gereinigt werden)'
            },
            {
                key: 'Bedienungsanleitung',
                value: `<a href="https://wewater.org/wp-content/uploads/2020/03/reinigung_aqqacube_DE.pdf" target="_blank">Deutsch</a>/
                        <a href="https://wewater.org/wp-content/uploads/2020/03/disinfection_aqqacube_EN.pdf" target="_blank">Englisch</a> (PDF)`
            },
        ];

        return (
            <Layout>
                <SEO title={t('AqqacubeSEOTitle')} description={t('AqqacubeSEODescription')} />
                <Container className="global-header-padding">
                    <Header
                        data-sal="slide-up"
                        data-sal-delay="0"
                        data-sal-duration="300"
                        data-sal-easing="ease"
                        textAlign='left'
                        className="global-flex-column global-no-margin"
                    >
                        <h3 className={`global-subtitle text-primary`}>AQQA®cube</h3>
                        <h2 className="global-headline"><Trans>Für den Soforteinsatz in Lebensgemeinschaften</Trans></h2>
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
                                    Die Rückhalterate für Bakterien wurde von BCS, Florida, USA für den AQQAbag zertifiziert. Der AQQAcube funktioniert nach dem gleichen Prinzip. Das Herzstück ist unsere Filtermembran.
                            <a href="https://wewater.org/wp-content/uploads/2019/09/WW09232019-BCS-1909302-303p.pdf" target="_blank">Das Zertifikat für den AQQAbag haben wir hier hochgeladen.</a>
                                </Trans></p>
                                <p><Trans>
                                    Mit welchen Arten von Schmutzwasser der AQQAcube umgehen kann, <a href="https://wewater.org/wp-content/uploads/2021/01/AQQAcube_Partikel.pdf" target="_blank">siehst du in dieser Übersicht.</a>
                                </Trans></p>
                                <p><Trans>
                                    Der AQQA®cube ist ein Filterprodukt, das die Vorteile von AQQAbag und AQQAsystem verbindet. Es ist mobil und kann problemlos an den jeweiligen Einsatzort gebracht werden. Dennoch kann das Produkt aufgrund seiner Größe und der enthaltenen Filterfläche mehr als 1200 Liter Trinkwasser in 24 Stunden aufbereiten. Wir gehen stets von einer Betriebszeit von 8 Stunden aus, so ergibt sich einer Filtermenge von 400 Liter Trinkwasser.
                        </Trans></p>
                                <p><Trans>
                                    Die Anwendung ist dabei genauso einfach wie beim AQQAbag: Es wird Wasser aus einem See oder einem Fluss in den Filterkasten hinein gegeben und mit einer Membran gefiltert. Dabei kann der AQQAcube an einem festen Einsatzort stehen oder transportiert werden. Ein Transport ist jedoch nur in leerem Zustand möglich.
                        </Trans></p>
                                <p><Trans>
                                    Der AQQAcube kostet nur 1273,3 Euro brutto. Rechnet man diesen Betrag auf die enorme Filterleistung um, kostet ein Liter hygienisch sauberes Wasser weniger als einen Cent. Zum Vergleich: Trinkwasser wird in Ostafrika in Plastikflaschen zu je 1,5 Liter für ca. einen Euro verkauft. Damit bietet das Produkt sauberes Trinkwasser bei hoher Geldersparnis und Einsparung von Plastikmüll.
                        </Trans></p>
                                <p><Trans>
                                    Nach 6 Monaten im Dauerbetrieb muss der AQQAcube gereinigt werden. Eine Anleitung dafür haben wir hier hochgeladen. Die Kosten für die halbjährliche Reinigung betragen etwa 100 Euro.
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

export default useTranslationHOC(AqqacubePage);