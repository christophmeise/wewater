// i18next-extract-mark-ns-start page_filtersystem
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import { Link, Trans } from 'gatsby-plugin-react-i18next';
import React from 'react';
import { Button, Container, Grid, GridColumn, GridRow, Header, Icon, Table } from 'semantic-ui-react';
import VideoOverlay from '../components/HeaderOverlay/video-overlay';
import Layout from '../components/Layout/Layout';
import SEO from '../components/seo';
import { useTranslationHOC } from '../components/useTranslationHOC/useTranslationHOC';
import './filtersystem.less';

interface Props {
    t: any;
    data: any;
}

class FiltersystemPage extends React.Component<Props, any> {
    constructor(props) {
        super(props);
    }

    render() {
        const { t, data } = this.props;

        const tableData = [
            {
                key: 'Anwendung',
                bag: 'Sofortlösung (z.B. nach einer Umweltkatastrophe)',
                cube: 'Sofortlösung',
                system: 'Langfristige Lösung'
            },
            {
                key: 'Anwender',
                bag: 'Einzelperson, Reisende',
                cube: 'Lebensgemeinschaften, Dörfer, Flüchtlingsunterkünfte',
                system: 'Dorfgemeinschaften, an Orten mit hohem Trinkwasserbedarf'
            },
            {
                key: 'Filtermenge',
                bag: '4 Liter Trinkwasser mindestens bei 8 Std. Betriebszeit am Tag',
                cube: 'min. 400 Liter Trinkwasser pro Tag bei 8 Std. Betriebszeit',
                system: '500 bis 30.000 Liter Trinkwasser pro Tag'
            },
            {
                key: 'Innovation',
                bag: 'Membranfilter mit hoher Rückhalterate',
                cube: 'Membranfilter mit hoher Rückhalterate',
                system: 'Membranfilter und Sonnenlichtkatalysator'
            },
            {
                key: 'Kosten',
                bag: '41,65 Euro brutto pro Stück (bei kleiner Auflage, ab Auflage von 1.000 Stück sinken die Kosten pro Stück)',
                cube: '1273,30 Euro brutto pro Stück',
                system: 'Abhängig von der Größe des Filtersystems',
            },
            {
                key: 'Rückhalterate Bakterien',
                bag: '99,9999 Prozent',
                cube: '99,9999 Prozent <a href="https://wewater.org/wp-content/uploads/2019/09/WW09232019-BCS-1909302-303p.pdf" target="_blank">(zertifiziert von BCS, Florida, USA)</a>',
                system: '99,9999 Prozent <a href="https://wewater.org/wp-content/uploads/2019/09/WW09232019-BCS-1909302-303p.pdf" target="_blank">(zertifiziert von BCS, Florida, USA)</a>',
            },
            {
                key: 'Haltbarkeit',
                bag: '6 Monate im Dauerbetrieb (gelegentlich muss der AQQAbag mit klarem Wasser ausgespült werden)',
                cube: '6 Monate im Dauerbetrieb (gelegentlich muss der AQQAcube mit klarem Wasser ausgespült werden, nach 6 Monaten muss er gereinigt werden)',
                system: '5 Jahre (halbjährlich muss das AQQAsystem mit klarem Wasser gespült werden)',
            },
            {
                key: 'Bedienungsanleitung',
                bag: `<a href="https://wewater.org/wp-content/uploads/2019/09/anleitung_aqqabag.pdf" target="_blank">Deutsch</a>/
                    <a href="https://wewater.org/wp-content/uploads/2019/09/aqqabag_instructions.pdf" target="_blank">Englisch</a> (PDF)`,
                cube: `<a href="https://wewater.org/wp-content/uploads/2020/03/reinigung_aqqacube_DE.pdf" target="_blank">Deutsch</a>/
                        <a href="https://wewater.org/wp-content/uploads/2020/03/disinfection_aqqacube_EN.pdf" target="_blank">Englisch</a> (PDF)`,
                system: `-`,
            },
        ];

        return (
            <Layout>
                <SEO title={t('FiltersystemeSEOTitle')} description={t('FiltersystemeSEODescription')} />
                <VideoOverlay content={<OverlayContent t={t} inverted={true} />} darken={false} sources='videos/filtersystem.mp4' />
                <Container className="global-header-padding">
                    <div className="main-content-sections">
                        <section id="filtersystem-grid">
                            <Grid stackable>
                                <GridRow className="team-grid-member" columns="2">
                                    <GridColumn width="10">
                                        <Header
                                            data-sal="slide-up"
                                            data-sal-delay="0"
                                            data-sal-duration="300"
                                            data-sal-easing="ease"
                                            textAlign='left'
                                            className="global-flex-column global-no-margin"
                                        >
                                            <h3 className={`global-subtitle text-primary`}>AQQAbag</h3>
                                            <h2 className="global-headline"><Trans>Die Lösung für den Soforteinsatz für Einzelpersonen</Trans></h2>
                                        </Header>
                                        <p>
                                            <Trans>
                                                Um kurzfristig den Bedarf an Trinkwasser zu decken, kann der AQQAbag eine Person ein halbes Jahr lang mit vier Litern Trinkwasser pro Tag versorgen.
                                            </Trans>
                                        </p>
                                        <Link to='/filtersysteme/aqqabag'>
                                            <Button
                                                primary
                                                inverted={false}
                                                size="medium"
                                                className="rounded shadow hover-animate"
                                            >
                                                <Icon name="grid layout" className="left" style={{ opacity: '1' }}></Icon>
                                                <Trans>Mehr erfahren</Trans>
                                            </Button>
                                        </Link>
                                    </GridColumn>
                                    <GridColumn width="6">
                                        <Img className="img-fluid rounded shadow" fluid={data.image1.childImageSharp.fluid} />
                                    </GridColumn>
                                </GridRow>
                                <GridRow className="team-grid-member" columns="2">
                                    <GridColumn width="10">
                                        <Header
                                            data-sal="slide-up"
                                            data-sal-delay="0"
                                            data-sal-duration="300"
                                            data-sal-easing="ease"
                                            textAlign='left'
                                            className="global-flex-column global-no-margin"
                                        >
                                            <h3 className={`global-subtitle text-primary`}>AQQAcube</h3>
                                            <h2 className="global-headline"><Trans>Für den Soforteinsatz in Lebensgemeinschaften</Trans></h2>
                                        </Header>
                                        <p>
                                            <Trans>
                                                Der AQQAcube ist ein Filterprodukt, das die Vorteile von AQQAbag und AQQAsystem verbindet. Es ist mobil und kann problemlos an den jeweiligen Einsatzort gebracht werden. Dennoch kann das Produkt aufgrund seiner Größe und der enthaltenen Filterfläche mehr als 1200 Liter Trinkwasser in 24 Stunden aufbereiten. Wir gehen stets von einer Betriebszeit von 8 Stunden aus, so ergibt sich einer Filtermenge von 400 Liter Trinkwasser.
                                            </Trans>
                                        </p>
                                        <Link to='/filtersysteme/aqqacube'>
                                            <Button
                                                primary
                                                inverted={false}
                                                size="medium"
                                                className="rounded shadow hover-animate"
                                            >
                                                <Icon name="grid layout" className="left" style={{ opacity: '1' }}></Icon>
                                                <Trans>Mehr erfahren</Trans>
                                            </Button>
                                        </Link>
                                    </GridColumn>
                                    <GridColumn width="6">
                                        <Img className="img-fluid rounded shadow" fluid={data.image2.childImageSharp.fluid} />
                                    </GridColumn>
                                </GridRow>
                                <GridRow className="team-grid-member" columns="2">
                                    <GridColumn width="10">
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
                                        <p>
                                            <Trans>
                                                Das AQQAsystem basiert auf der Idee des AQQAbag. Es macht in größerem Maßstab aus Oberflächenwasser hygienisch sicheres Trinkwasser. Dabei kann es direkt an eine Wasserquelle oder einen Flußlauf installiert werden.
                                            </Trans>
                                        </p>
                                        <Link to='/filtersysteme/aqqasystem'>
                                            <Button
                                                primary
                                                inverted={false}
                                                size="medium"
                                                className="rounded shadow hover-animate"
                                            >
                                                <Icon name="grid layout" className="left" style={{ opacity: '1' }}></Icon>
                                                <Trans>Mehr erfahren</Trans>
                                            </Button>
                                        </Link>
                                    </GridColumn>
                                    <GridColumn width="6">
                                        <Img className="img-fluid rounded shadow" fluid={data.image3.childImageSharp.fluid} />
                                    </GridColumn>
                                </GridRow>
                            </Grid>
                        </section>
                        <section>

                            <Table className="filtersystem-table-overview">
                                {typeof window !== 'undefined' && window.innerWidth > 767 &&
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell width={1}></Table.HeaderCell>
                                        <Table.HeaderCell width={5}>
                                            <div className="table-header-cell-wrapper">
                                                <Img className="img-fluid rounded shadow" fluid={data.image1.childImageSharp.fluid} />
                                                <Link to="/filtersysteme/aqqabag">
                                                    <h3 className="global-subtitle text-primary">AQQABag</h3>
                                                </Link>
                                            </div>
                                        </Table.HeaderCell>
                                        <Table.HeaderCell width={5}>
                                            <div className="table-header-cell-wrapper">
                                                <Img className="img-fluid rounded shadow" fluid={data.image2.childImageSharp.fluid} />
                                                <Link to="/filtersysteme/aqqacube">
                                                    <h3 className="global-subtitle text-primary">AQQACube</h3>
                                                </Link>
                                            </div>
                                        </Table.HeaderCell>
                                        <Table.HeaderCell width={5}>
                                            <div className="table-header-cell-wrapper">
                                                <Img className="img-fluid rounded shadow" fluid={data.image3.childImageSharp.fluid} />
                                                <Link to="/filtersysteme/aqqasystem">
                                                    <h3 className="global-subtitle text-primary">AQQASystem</h3>
                                                </Link>
                                            </div>
                                        </Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                }

                                <Table.Body>
                                    {tableData.map((row) => {
                                        return (
                                            <Table.Row key={row.key}>
                                                <Table.Cell><Trans>{row.key}</Trans></Table.Cell>
                                                <Table.Cell><Trans><span dangerouslySetInnerHTML={{ __html: row.bag }}></span></Trans></Table.Cell>
                                                <Table.Cell><Trans><span dangerouslySetInnerHTML={{ __html: row.cube }}></span></Trans></Table.Cell>
                                                <Table.Cell><Trans><span dangerouslySetInnerHTML={{ __html: row.system }}></span></Trans></Table.Cell>
                                            </Table.Row>
                                        );
                                    })}
                                </Table.Body>
                            </Table>
                        </section>
                    </div>
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
         image1: file(relativePath: { eq: "images/filtersysteme/image1.jpg" }) {
            childImageSharp {
                fluid(maxWidth: 600, quality: 100) {
                    ...GatsbyImageSharpFluid_withWebp
                }
            }
        }
        image2: file(relativePath: { eq: "images/filtersysteme/image2.jpg" }) {
            childImageSharp {
                fluid(maxWidth: 600, quality: 100) {
                    ...GatsbyImageSharpFluid_withWebp
                }
            }
        }
        image3: file(relativePath: { eq: "images/filtersysteme/image3.jpg" }) {
            childImageSharp {
                fluid(maxWidth: 600, quality: 100) {
                    ...GatsbyImageSharpFluid_withWebp
                }
            }
        }
    }
`;

export default useTranslationHOC(FiltersystemPage);
