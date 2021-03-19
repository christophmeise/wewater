// i18next-extract-mark-ns-start page_aqqasystem
import { graphql } from 'gatsby';
import { Trans } from 'gatsby-plugin-react-i18next';
import React from 'react';
import { Container, Grid, GridColumn, Header, Table } from 'semantic-ui-react';
import VideoOverlay from '../../components/HeaderOverlay/video-overlay';
import Layout from '../../components/Layout/Layout';
import SEO from '../../components/seo';
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

class AqqasystemPage extends React.Component<Props, any> {
    constructor(props) {
        super(props);
    }

    render() {
        const { t } = this.props;

        const tableData = [
            {
                key: 'Anwendung',
                value: 'Langfristige Lösung'
            },
            {
                key: 'Anwender',
                value: 'Dorfgemeinschaften, an Orten mit hohem Trinkwasserbedarf'
            },
            {
                key: 'Filtermenge',
                value: '500 bis 30.000 Liter Trinkwasser pro Tag'
            },
            {
                key: 'Innovation',
                value: 'Membranfilter und Sonnenlichtkatalysator'
            },
            {
                key: 'Kosten',
                value: 'Abhängig von der Größe des Filtersystems'
            },
            {
                key: 'Leergewicht',
                value: 'Abhängig von der Größe des Filtersystems'
            },
            {
                key: 'Rückhalterate Bakterien',
                value: '99,9999 Prozent <a href="https://wewater.org/wp-content/uploads/2019/09/WW09232019-BCS-1909302-303p.pdf" target="_blank">(zertifiziert von BCS, Florida, USA)</a>'
            },
            {
                key: 'Haltbarkeit',
                value: '5 Jahre (halbjährlich muss das AQQAsystem mit klarem Wasser gespült werden)'
            }
        ];

        return (
            <Layout>
                <SEO title={t('AqqasystemSEOTitle')} description={t('AqqasystemSEODescription')} />
                <VideoOverlay content={<OverlayContent t={t} inverted={true} />} darken={false}
                    sourceMP4='/videos/aqqasystem/AQQASystem.mp4'
                    sourceWebm='/videos/aqqasystem/AQQASystem.webm'
                    sourceOGV='/videos/aqqasystem/AQQASystem.ogv'
                    poster='/videos/aqqasystem/aqqasystemPlaceholder.webp' />
                <Container className="global-header-padding">
                    <Header
                        data-sal="slide-up"
                        data-sal-delay="0"
                        data-sal-duration="300"
                        data-sal-easing="ease"
                        textAlign='left'
                        className="global-flex-column global-no-margin"
                    >
                        <h3 className={`global-subtitle text-primary`}>AQQAsystem</h3>
                        <h2 className="global-headline"><Trans>Die Lösung für den langfristigen Einsatz</Trans></h2>
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
                            {/*  <SidebarWidget></SidebarWidget> */}
                        </GridColumn>
                    </Grid>
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

export default useTranslationHOC(AqqasystemPage);
