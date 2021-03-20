// i18next-extract-mark-ns-start page_aqqabag
import { graphql } from 'gatsby';
import Image from 'gatsby-image';
import { Trans } from 'gatsby-plugin-react-i18next';
import React from 'react';
import { Container, Grid, GridColumn, Header, Table } from 'semantic-ui-react';
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
                value: '99,9999 Prozent <a href="https://wewater.org/wp-content/uploads/2019/09/WW09232019-BCS-1909302-303p.pdf" target="_blank">(zertifiziert von BCS, Florida, USA)</a>'
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
                <VideoOverlay content={<OverlayContent t={t} inverted={true} />} darken={false}
                    sourceMP4='/videos/aqqabag/AQQAbag.mp4'
                    sourceWebm='/videos/aqqabag/AQQAbag.webm'
                    sourceOGV='/videos/aqqabag/AQQAbag.ogv'
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
                        <h2 className="global-headline"><Trans>Die Lösung für den Soforteinsatz und Einzelpersonen</Trans></h2>
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
                            <Image fluid={data.aqqabag1.childImageSharp.fluid}
                                className="img-fluid rounded shadow"
                                style={{ marginBottom: '2rem' }}
                                alt="aqqabag1"></Image>
                            <Image fluid={data.aqqabag2.childImageSharp.fluid}
                                className="img-fluid rounded shadow"
                                style={{ marginBottom: '2rem' }}
                                alt="aqqabag2"></Image>
                            <Image fluid={data.aqqabag3.childImageSharp.fluid}
                                className="img-fluid rounded shadow"
                                style={{ marginBottom: '2rem' }}
                                alt="aqqabag3"></Image>
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
            aqqabag1: file(relativePath: { eq: "images/filtersysteme/aqqabag.jpg" }) {
                childImageSharp {
                    fluid(maxWidth: 600, quality: 100) {
                        ...GatsbyImageSharpFluid_withWebp
                    }
                }
            }
            aqqabag2: file(relativePath: { eq: "images/filtersysteme/image5.jpg" }) {
                childImageSharp {
                    fluid(maxWidth: 600, quality: 100) {
                        ...GatsbyImageSharpFluid_withWebp
                    }
                }
            }
            aqqabag3: file(relativePath: { eq: "images/filtersysteme/aqqabag3.jpg" }) {
                childImageSharp {
                    fluid(maxWidth: 600, quality: 100) {
                        ...GatsbyImageSharpFluid_withWebp
                    }
                }
            }
            projekte: allWpProjekt(
                sort: { fields: date, order: DESC }
            ) {
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
                                        fluid(maxWidth: 800) {
                                            ...GatsbyImageSharpFluid
                                        }
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
