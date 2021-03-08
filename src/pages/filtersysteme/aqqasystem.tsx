// i18next-extract-mark-ns-start page_aqqasystem
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
                value: '30 kg'
            },
            {
                key: 'Rückhalterate Bakterien',
                value: '99,9999 Prozent <a href="https://wewater.org/wp-content/uploads/2019/09/WW09232019-BCS-1909302-303p.pdf" target="_blank">(zertifiziert von BCS, Florida, USA)</a>'
            },
            {
                key: 'Haltbarkeit',
                value: '5 Jahre (halbjährlich muss das AQQA®system mit klarem Wasser gespült werden)'
            }
        ];

        return (
            <Layout>
                <SEO title={t('AqqasystemSEOTitle')} description={t('AqqasystemSEODescription')} />
                <Container className="global-header-padding">
                    <Header
                        data-sal="slide-up"
                        data-sal-delay="0"
                        data-sal-duration="300"
                        data-sal-easing="ease"
                        textAlign='left'
                        className="global-flex-column global-no-margin"
                    >
                        <h3 className={`global-subtitle text-primary`}>AQQA®system</h3>
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
                                    Die Anwendung ist sehr einfach: Es wird Wasser aus einem See oder einem Fluss mit einer Membran gefiltert. Das Besondere am AQQAbag ist die bisher unerreichte Qualität des Wassers bei gleichzeitig niedrigen Kosten.
                        </Trans></p>
                                <p><Trans>
                                    Der AQQAbag verstopft nicht und muss nicht gewartet werden, er ist leicht, handlich und kann unbegrenzt gelagert werden. Damit ist der AQQAbag das ideale Produkt, um Menschen vorübergehend mit Trinkwasser zu versorgen – sei es im Krisenfall, für Menschen, für die noch keine dauerhafte Lösung bereit steht oder für Reisende. Der AQQAbag wurde über mehrere Monate erfolgreich getestet und seine Wirkung von Laboren bestätigt.
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

export default useTranslationHOC(AqqasystemPage);
