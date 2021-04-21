// i18next-extract-mark-ns-start page_aqqacube
import { graphql } from 'gatsby';
import { GatsbyImage } from "gatsby-plugin-image";
import { Link, Trans } from 'gatsby-plugin-react-i18next';
import de from 'hyphenated-de';
import React from 'react';
import Hyphenated from 'react-hyphen';
import { Container, Grid, GridColumn, Header, Table } from 'semantic-ui-react';
import { WeWaterLogo } from '..';
import VideoOverlay from '../../components/HeaderOverlay/video-overlay';
import Layout from '../../components/Layout/Layout';
import ProjektCard from '../../components/ProjektCard/projekt-card';
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
        aqqacube1: any;
        aqqacube2: any;
        aqqacube3: any;
        projekte: any;
    };
}

class AqqacubePage extends React.Component<Props, any> {
    constructor(props) {
        super(props);
    }

    render() {
        const { t, data } = this.props;

        const posts = data.projekte.edges;

        const tableData = [
            {
                key: 'Anwendung',
                value: 'Sofortlösung'
            },
            {
                key: 'Anwender',
                value: 'z.B. Dorfgemeinschaften, Flüchtlingsunterkünfte, Schulen'
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
                <VideoOverlay content={<OverlayContent />} darken={false}
                    sourceMP4='/videos/aqqacube/AQQAcube'
                    sourceWebm='/videos/aqqacube/AQQAcube'
                    sourceOGV='/videos/aqqacube/AQQAcube'
                    poster='/videos/aqqacube/aqqacubePlaceholder.webp' />
                <Container className="global-header-padding">
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
                                <Trans>Für den Soforteinsatz in Lebensgemeinschaften</Trans>
                            </Hyphenated>
                        </h2>
                    </Header>
                    <Grid>
                        <GridColumn width={11}>
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
                                    Der AQQAcube ist ein Filterprodukt, das die Vorteile von AQQAbag und AQQAsystem verbindet. Er ist mobil und kann problemlos an den jeweiligen Einsatzort gebracht werden. Dennoch kann das Produkt aufgrund seiner Größe und der enthaltenen Filterfläche mehr als 1200 Liter Trinkwasser in 24 Stunden aufbereiten. Wir gehen stets von einer Betriebszeit von 8 Stunden aus, so ergibt sich einer Filtermenge von 400 Liter Trinkwasser.
                        </Trans></p>
                                <p><Trans>
                                    Die Anwendung ist dabei genauso einfach wie beim AQQAbag: Es wird Wasser aus einem See oder einem Fluss in den Filterkasten hinein gegeben und mit einer Membran gefiltert. Dabei kann der AQQAcube an einem festen Einsatzort stehen oder transportiert werden. Ein Transport ist jedoch nur in leerem Zustand möglich.
                        </Trans></p>
                                <p><Trans>
                                    Der AQQAcube kostet nur 1273,3 Euro brutto. Rechnet man diesen Betrag auf die enorme Filterleistung um, kostet ein Liter hygienisch sauberes Wasser weniger als einen Cent. Zum Vergleich: Trinkwasser wird in Ostafrika in Plastikflaschen zu je 1,5 Liter für ca. einen Euro verkauft. Damit bietet das Produkt sauberes Trinkwasser bei hoher Geldersparnis und Einsparung von Plastikmüll.
                        </Trans></p>
                                <p><Trans>
                                    Nach 6 Monaten im Dauerbetrieb muss der AQQAcube gereinigt werden. <Link to="/filtersysteme/tutorials">Eine Anleitung dafür haben wir hier hochgeladen.</Link> Die Kosten für die halbjährliche Reinigung betragen etwa 100 Euro.
                        </Trans></p>
                            </section>
                        </GridColumn>
                        <GridColumn width={5}>
                            <GatsbyImage
                                image={data.aqqacube1.childImageSharp.gatsbyImageData}
                                className="img-fluid rounded shadow"
                                style={{ marginBottom: '2rem' }}
                                alt="aqqacube1" />
                            <GatsbyImage
                                image={data.aqqacube2.childImageSharp.gatsbyImageData}
                                className="img-fluid rounded shadow"
                                style={{ marginBottom: '2rem' }}
                                alt="aqqacube2" />
                            <GatsbyImage
                                image={data.aqqacube3.childImageSharp.gatsbyImageData}
                                className="img-fluid rounded shadow"
                                style={{ marginBottom: '2rem' }}
                                alt="aqqacube3" />
                        </GridColumn>
                    </Grid>
                    <section className="global-header-padding">
                        <h2><Trans>Der AQQAcube ist u.a. im Einsatz in...</Trans></h2>
                        <div className="projekt-card-grid">
                            {posts
                                .filter((post) => post.node.title.length > 0)
                                .slice(0, 4)
                                .map(({ node: post }) => {
                                    return (
                                        <div key={post.id} className="projekt-post-card-wrapper">
                                            <ProjektCard post={post} ></ProjektCard>
                                        </div>
                                    );
                                })}
                        </div>
                    </section>
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
                <Trans>Der AQQAcube</Trans>
            </h2>
        </div >
    );
}

export const pageQuery = graphql`query ($language: String!) {
  locales: allLocale(filter: {language: {eq: $language}}) {
    ...GetTranslations
  }
  aqqacube1: file(relativePath: {eq: "images/filtersysteme/image2.jpg"}) {
    childImageSharp {
      gatsbyImageData(width: 600, quality: 100, layout: CONSTRAINED)
    }
  }
  aqqacube2: file(relativePath: {eq: "images/filtersysteme/image4.jpg"}) {
    childImageSharp {
      gatsbyImageData(width: 600, quality: 100, layout: CONSTRAINED)
    }
  }
  aqqacube3: file(relativePath: {eq: "images/filtersysteme/aqqacube.JPG"}) {
    childImageSharp {
      gatsbyImageData(width: 600, quality: 100, layout: CONSTRAINED)
    }
  }
  projekte: allWpProjekt(sort: {fields: date, order: DESC}) {
    edges {
      node {
        id
        title
        excerpt
        date(formatString: "MMMM DD, YYYY", locale: "de")
        uri
        slug
        author {
          node {
            name
          }
        }
        featuredImage {
          node {
            localFile {
              childImageSharp {
                gatsbyImageData(width: 800, layout: CONSTRAINED)
              }
            }
          }
        }
        blocks {
          name
          saveContent
          innerBlocks {
            name
            saveContent
            innerBlocks {
              name
              saveContent
            }
          }
        }
      }
    }
  }
}
`;

export default useTranslationHOC(AqqacubePage);
