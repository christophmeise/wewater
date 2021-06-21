// i18next-extract-mark-ns-start page_aqqabag
import { graphql } from 'gatsby';
import { GatsbyImage } from "gatsby-plugin-image";
import { Trans } from 'gatsby-plugin-react-i18next';
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
        aqqabag1: any;
        aqqabag2: any;
        aqqabag3: any;
        projekte: any;
    };
}

class AqqabagPage extends React.Component<Props, any> {
    constructor(props) {
        super(props);
    }

    render() {
        const { t, data } = this.props;

        const posts = data.projekte.edges;

        const tableData = [
            {
                key: t('Anwendung'),
                value: t('Sofortlösung (z.B. nach einer Umweltkatastrophe)')
            },
            {
                key: t('Anwender'),
                value: t('Einzelperson, Reisende')
            },
            {
                key: t('Filtermenge'),
                value: t('4 Liter Trinkwasser mindestens bei 8 Std. Betriebszeit am Tag')
            },
            {
                key: t('Innovation'),
                value: t('Membranfilter mit hoher Rückhalterate')
            },
            {
                key: t('Kosten'),
                value: t('41,65 Euro brutto pro Stück (bei kleiner Auflage, ab Auflage von 1.000 Stück sinken die Kosten pro Stück)')
            },
            {
                key: t('Rückhalterate Bakterien'),
                value: t('99,9999 Prozent <a href="https://wewaterbackend.org/wp-content/uploads/2019/09/WW09232019-BCS-1909302-303p.pdf" target="_blank">(zertifiziert von BCS, Florida, USA)</a>')
            },
            {
                key: t('Haltbarkeit'),
                value: t('6 Monate im Dauerbetrieb (gelegentlich muss der AQQAbag mit klarem Wasser ausgespült werden)')
            },
            {
                key: t('Bedienungsanleitung'),
                value: `<a href="https://wewaterbackend.org/wp-content/uploads/2019/09/anleitung_aqqabag.pdf" target="_blank">Deutsch</a>/
                    <a href="https://wewaterbackend.org/wp-content/uploads/2019/09/aqqabag_instructions.pdf" target="_blank">Englisch</a> (PDF)`
            },
        ];

        return (
            <Layout>
                <SEO title={t('AqqabagSEOTitle')} description={t('AqqabagSEODescription')} />
                <VideoOverlay content={<OverlayContent />} darken={false}
                    sourceMP4='/videos/aqqabag/AQQAbag'
                    sourceWebm='/videos/aqqabag/AQQAbag'
                    sourceOGV='/videos/aqqabag/AQQAbag'
                    poster='/videos/AlleFilterPlaceholder.webp' />
                <Container className="global-header-padding">
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
                    <Grid stackable>
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
                                    Die Anwendung ist sehr einfach: Es wird Wasser aus einem See oder einem Fluss mit einer Membran gefiltert. Das Besondere am AQQAbag ist die bisher unerreichte Qualität des Wassers bei gleichzeitig niedrigen Kosten.
                        </Trans></p>
                                <p><Trans>
                                    Der AQQAbag verstopft nicht und muss nicht gewartet werden, er ist leicht, handlich und kann unbegrenzt gelagert werden. Damit ist der AQQAbag das ideale Produkt, um Menschen vorübergehend mit Trinkwasser zu versorgen – sei es im Krisenfall, für Menschen, für die noch keine dauerhafte Lösung bereit steht oder für Reisende. Der AQQAbag wurde über mehrere Monate erfolgreich getestet und seine Wirkung von Laboren bestätigt.
                        </Trans></p>
                            </section>
                        </GridColumn>
                        <GridColumn width={5}>
                            <GatsbyImage
                                image={data.aqqabag1.childImageSharp.gatsbyImageData}
                                className="img-fluid rounded shadow"
                                style={{ marginBottom: '2rem' }}
                                alt="aqqabag1" />
                            <GatsbyImage
                                image={data.aqqabag2.childImageSharp.gatsbyImageData}
                                className="img-fluid rounded shadow"
                                style={{ marginBottom: '2rem' }}
                                alt="aqqabag2" />
                            <GatsbyImage
                                image={data.aqqabag3.childImageSharp.gatsbyImageData}
                                className="img-fluid rounded shadow"
                                style={{ marginBottom: '2rem' }}
                                alt="aqqabag3" />
                        </GridColumn>
                    </Grid>
                    <section className="global-header-padding">
                        <h2><Trans>Der AQQAbag ist u.a. im Einsatz in...</Trans></h2>
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
                <Trans>Der AQQAbag</Trans>
            </h2>
        </div >
    );
}

export const pageQuery = graphql`query ($language: String!) {
  locales: allLocale(filter: {language: {eq: $language}}) {
    ...GetTranslations
  }
  aqqabag1: file(relativePath: {eq: "images/filtersysteme/aqqabag.jpg"}) {
    childImageSharp {
      gatsbyImageData(width: 600, quality: 100, layout: CONSTRAINED)
    }
  }
  aqqabag2: file(relativePath: {eq: "images/filtersysteme/image5.jpg"}) {
    childImageSharp {
      gatsbyImageData(width: 600, quality: 100, layout: CONSTRAINED)
    }
  }
  aqqabag3: file(relativePath: {eq: "images/filtersysteme/aqqabag3.jpg"}) {
    childImageSharp {
      gatsbyImageData(width: 600, quality: 100, layout: CONSTRAINED)
    }
  }
  projekte: allWpProjekt(sort: {fields: date, order: DESC}, filter: {categories: {nodes: {elemMatch: {name: {in: ["AQQAbag-Projekt", "AQQAbag project", "Projet AQQAbag"]}}}}, language: {slug: {eq: $language}}}) {
    edges {
      node {
        id
        title
        excerpt
        date(formatString: "MMMM DD, YYYY", locale: $language)
        uri
        slug
        categories {
          nodes {
            name
          }
        }
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

export default useTranslationHOC(AqqabagPage);
