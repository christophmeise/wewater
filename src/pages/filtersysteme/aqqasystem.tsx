// i18next-extract-mark-ns-start page_aqqasystem
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
        aqqasystem1: any;
        aqqasystem2: any;
        aqqasystem3: any;
        projekte: any;
    };
}

class AqqasystemPage extends React.Component<Props, any> {
    constructor(props) {
        super(props);
    }

    render() {
        const { t, data } = this.props;
        const posts = data.projekte.edges;
        const tableData = [
            {
                key: t('Anwendung'),
                value: t('Langfristige Lösung')
            },
            {
                key: t('Anwender'),
                value: t('Dorfgemeinschaften, an Orten mit hohem Trinkwasserbedarf')
            },
            {
                key: t('Filtermenge'),
                value: t('500 bis 30.000 Liter Trinkwasser pro Tag')
            },
            {
                key: t('Innovation'),
                value: t('Membranfilter')
            },
            {
                key: t('Kosten'),
                value: t('Abhängig von der Größe des Filtersystems')
            },
            {
                key: t('Leergewicht'),
                value: t('Abhängig von der Größe des Filtersystems')
            },
            {
                key: t('Rückhalterate Bakterien'),
                value: t('99,9999 Prozent <a href="https://wewater.org/wp-content/uploads/2019/09/WW09232019-BCS-1909302-303p.pdf" target="_blank">(zertifiziert von BCS, Florida, USA)</a>')
            },
            {
                key: t('Haltbarkeit'),
                value: t('5 Jahre (halbjährlich muss das AQQAsystem mit klarem Wasser gespült werden)')
            }
        ];

        return (
            <Layout>
                <SEO title={t('AqqasystemSEOTitle')} description={t('AqqasystemSEODescription')} />
                <VideoOverlay content={<OverlayContent />} darken={false}
                    sourceMP4='/videos/aqqasystem/AQQAsystem'
                    sourceWebm='/videos/aqqasystem/AQQAsystem'
                    sourceOGV='/videos/aqqasystem/AQQAsystem'
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
                        <h2 className="global-headline">
                            <Hyphenated language={de}>
                                {t('Die Lösung für den langfristigen Einsatz')}
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
                        <GridColumn width={5}>
                            <GatsbyImage
                                image={data.aqqasystem1.childImageSharp.gatsbyImageData}
                                className="img-fluid rounded shadow"
                                style={{ marginBottom: '2rem' }}
                                alt="aqqasystem1" />
                            <GatsbyImage
                                image={data.aqqasystem2.childImageSharp.gatsbyImageData}
                                className="img-fluid rounded shadow"
                                style={{ marginBottom: '2rem' }}
                                alt="aqqasystem2" />
                            <GatsbyImage
                                image={data.aqqasystem3.childImageSharp.gatsbyImageData}
                                className="img-fluid rounded shadow"
                                style={{ marginBottom: '2rem' }}
                                alt="aqqasystem3" />
                        </GridColumn>
                    </Grid>
                    {/*                     <section className="global-header-padding">
                        <h2><Trans>Das AQQAsystem ist u.a. im Einsatz in...</Trans></h2>
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
                    </section> */}
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
                <Trans>Das AQQAsystem</Trans>
            </h2>
        </div >
    );
}

export const pageQuery = graphql`query ($language: String!) {
  locales: allLocale(filter: {language: {eq: $language}}) {
    ...GetTranslations
  }
  aqqasystem1: file(relativePath: {eq: "images/filtersysteme/aqqasystem.png"}) {
    childImageSharp {
      gatsbyImageData(width: 600, quality: 100, layout: CONSTRAINED)
    }
  }
  aqqasystem2: file(relativePath: {eq: "images/filtersysteme/aqqasystem2.jpg"}) {
    childImageSharp {
      gatsbyImageData(width: 600, quality: 100, layout: CONSTRAINED)
    }
  }
  aqqasystem3: file(relativePath: {eq: "images/filtersysteme/image6.jpg"}) {
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
        date(formatString: "MMMM DD, YYYY", locale: $language)
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

export default useTranslationHOC(AqqasystemPage);
