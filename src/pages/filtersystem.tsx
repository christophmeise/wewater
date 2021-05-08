// i18next-extract-mark-ns-start page_filtersystem
import { graphql } from 'gatsby';
import { GatsbyImage } from "gatsby-plugin-image";
import { Link, Trans } from 'gatsby-plugin-react-i18next';
import de from 'hyphenated-de';
import React from 'react';
import Hyphenated from 'react-hyphen';
import { Button, Container, Grid, GridColumn, GridRow, Header, Icon, Table } from 'semantic-ui-react';
import { WeWaterLogo } from '.';
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
                key: t('Anwendung'),
                bag: t('Sofortlösung (z.B. nach einer Umweltkatastrophe)'),
                cube: t('Sofortlösung'),
                system: t('Langfristige Lösung')
            },
            {
                key: t('Anwender'),
                bag: t('Einzelperson, Reisende'),
                cube: t('Lebensgemeinschaften, Dörfer, Flüchtlingsunterkünfte'),
                system: t('Dorfgemeinschaften, an Orten mit hohem Trinkwasserbedarf')
            },
            {
                key: t('Filtermenge'),
                bag: t('4 Liter Trinkwasser mindestens bei 8 Std. Betriebszeit am Tag'),
                cube: t('min. 400 Liter Trinkwasser pro Tag bei 8 Std. Betriebszeit'),
                system: t('500 bis 30.000 Liter Trinkwasser pro Tag')
            },
            {
                key: t('Innovation'),
                bag: t('Membranfilter mit hoher Rückhalterate'),
                cube: t('Membranfilter mit hoher Rückhalterate'),
                system: t('Membranfilter')
            },
            {
                key: t('Kosten'),
                bag: t('41,65 Euro brutto pro Stück (bei kleiner Auflage, ab Auflage von 1.000 Stück sinken die Kosten pro Stück)'),
                cube: t('1273,30 Euro brutto pro Stück'),
                system: t('Abhängig von der Größe des Filtersystems')
            },
            {
                key: t('Rückhalterate Bakterien'),
                bag: t('99,9999 Prozent <a href="https://wewater.org/wp-content/uploads/2019/09/WW09232019-BCS-1909302-303p.pdf" target="_blank">(zertifiziert von BCS, Florida, USA)</a>'),
                cube: t('99,9999 Prozent <a href="https://wewater.org/wp-content/uploads/2019/09/WW09232019-BCS-1909302-303p.pdf" target="_blank">(zertifiziert von BCS, Florida, USA)</a>'),
                system: t('99,9999 Prozent <a href="https://wewater.org/wp-content/uploads/2019/09/WW09232019-BCS-1909302-303p.pdf" target="_blank">(zertifiziert von BCS, Florida, USA)</a>')
            },
            {
                key: t('Haltbarkeit'),
                bag: t('6 Monate im Dauerbetrieb (gelegentlich muss der AQQAbag mit klarem Wasser ausgespült werden)'),
                cube: t('6 Monate im Dauerbetrieb (gelegentlich muss der AQQAcube mit klarem Wasser ausgespült werden, nach 6 Monaten muss er gereinigt werden)'),
                system: t('5 Jahre (halbjährlich muss das AQQAsystem mit klarem Wasser gespült werden)')
            },
            {
                key: t('Bedienungsanleitung'),
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
                <VideoOverlay content={<OverlayContent />} darken={false}
                    sourceMP4='/videos/AlleFilter'
                    sourceWebm='/videos/AlleFilter'
                    sourceOGV='/videos/AlleFilter'
                    poster='/videos/AlleFilterPlaceholder.JPG' />
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
                                            <h2 className="global-headline">
                                                <Hyphenated language={de}>
                                                    {t('Die Lösung für den Soforteinsatz und Einzelpersonen')}
                                                </Hyphenated>
                                            </h2>
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
                                        <GatsbyImage
                                            alt="image1"
                                            image={data.image1.childImageSharp.gatsbyImageData}
                                            className="img-fluid rounded shadow" />
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
                                            <h2 className="global-headline">
                                                <Hyphenated language={de}>
                                                    {t('Für den Soforteinsatz in Lebensgemeinschaften')}
                                                </Hyphenated>
                                            </h2>
                                        </Header>
                                        <p>
                                            <Trans>
                                                Der AQQAcube vereint die Vorteile von AQQAbag und AQQAsystem. Er ist mit 30 Kg sehr mobil und filtert innerhalb von 24 Stunden 1200 Liter Trinkwasser.
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
                                        <GatsbyImage
                                            alt="image2"
                                            image={data.image2.childImageSharp.gatsbyImageData}
                                            className="img-fluid rounded shadow" />
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
                                            <h2 className="global-headline">
                                                <Hyphenated language={de}>
                                                    {t('Die Lösung für den langfristigen Einsatz')}
                                                </Hyphenated>
                                            </h2>
                                        </Header>
                                        <p>
                                            <Trans>
                                                Das AQQAsystem basiert auf der Idee des AQQAbag, ist jedoch modular skalierbar. So kann er jedem Einsatzort perfekt angepasst werden. Geeignet für Großprojekte.
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
                                        <GatsbyImage
                                            alt="image3"
                                            image={data.image3.childImageSharp.gatsbyImageData}
                                            className="img-fluid rounded shadow" />
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
                                                    <GatsbyImage
                                                        alt="image4"
                                                        image={data.image1.childImageSharp.gatsbyImageData}
                                                        className="img-fluid rounded shadow" />
                                                    <Link to="/filtersysteme/aqqabag">
                                                        <h3 className="global-subtitle text-primary">AQQAbag</h3>
                                                    </Link>
                                                </div>
                                            </Table.HeaderCell>
                                            <Table.HeaderCell width={5}>
                                                <div className="table-header-cell-wrapper">
                                                    <GatsbyImage
                                                        alt="image5"
                                                        image={data.image2.childImageSharp.gatsbyImageData}
                                                        className="img-fluid rounded shadow" />
                                                    <Link to="/filtersysteme/aqqacube">
                                                        <h3 className="global-subtitle text-primary">AQQAcube</h3>
                                                    </Link>
                                                </div>
                                            </Table.HeaderCell>
                                            <Table.HeaderCell width={5}>
                                                <div className="table-header-cell-wrapper">
                                                    <GatsbyImage
                                                        alt="image6"
                                                        image={data.image3.childImageSharp.gatsbyImageData}
                                                        className="img-fluid rounded shadow" />
                                                    <Link to="/filtersysteme/aqqasystem">
                                                        <h3 className="global-subtitle text-primary">AQQAsystem</h3>
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
                                                <Table.Cell><span className="table-cell-key-mobile"><Trans>{row.key}</Trans></span><span className="table-cell-key-desktop"><Trans>{row.key}</Trans></span></Table.Cell>
                                                <Table.Cell><strong className="table-cell-strong-mobile text-primary">AQQABag</strong><Trans><span dangerouslySetInnerHTML={{ __html: row.bag }}></span></Trans></Table.Cell>
                                                <Table.Cell><strong className="table-cell-strong-mobile text-primary">AQQACube</strong><Trans><span dangerouslySetInnerHTML={{ __html: row.cube }}></span></Trans></Table.Cell>
                                                <Table.Cell><strong className="table-cell-strong-mobile text-primary">AQQASystem</strong><Trans><span dangerouslySetInnerHTML={{ __html: row.system }}></span></Trans></Table.Cell>
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

const OverlayContent = () => {
    return (
        <div className="main-overlay-content">
            <div className="wewater-mobile-logo shadow">
                {WeWaterLogo()}
            </div>
            <h2 className="text-shadow">
                <Trans>Unsere Filtersysteme</Trans>
            </h2>
        </div >
    );
}

export const pageQuery = graphql`query ($language: String!) {
  locales: allLocale(filter: {language: {eq: $language}}) {
    ...GetTranslations
  }
  image1: file(relativePath: {eq: "images/filtersysteme/aqqabag.jpg"}) {
    childImageSharp {
      gatsbyImageData(width: 600, quality: 100, layout: CONSTRAINED, placeholder: BLURRED)
    }
  }
  image2: file(relativePath: {eq: "images/filtersysteme/image2.jpg"}) {
    childImageSharp {
      gatsbyImageData(width: 600, quality: 100, layout: CONSTRAINED, placeholder: BLURRED)
    }
  }
  image3: file(relativePath: {eq: "images/filtersysteme/aqqasystem.png"}) {
    childImageSharp {
      gatsbyImageData(width: 600, quality: 100, layout: CONSTRAINED, placeholder: BLURRED)
    }
  }
}
`;

export default useTranslationHOC(FiltersystemPage);
