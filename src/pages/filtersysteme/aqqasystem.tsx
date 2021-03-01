// i18next-extract-mark-ns-start page_aqqasystem
import { graphql } from 'gatsby';
import { Trans } from 'gatsby-plugin-react-i18next';
import React from 'react';
import { Container, Header } from 'semantic-ui-react';
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
                    <section>
                        <p><Trans><strong>Anwendung: </strong>Langfristige Lösung</Trans></p>
                        <p><Trans><strong>Anwender: </strong>Dorfgemeinschaften, an Orten mit hohem Trinkwasserbedarf</Trans></p>
                        <p><Trans><strong>Filtermenge: </strong>500 bis 30.000 Liter Trinkwasser pro Tag</Trans></p>
                        <p><Trans><strong>Innovation: </strong>Membranfilter und Sonnenlichtkatalysator</Trans></p>
                        <p><Trans><strong>Kosten: </strong>Abhängig von der Größe des Filtersystems</Trans></p>
                        <p><Trans><strong>Rückhalterate Bakterien: </strong>99,9999 Prozent <a href="https://wewater.org/wp-content/uploads/2019/09/WW09232019-BCS-1909302-303p.pdf" target="_blank">(zertifiziert von BCS, Florida, USA)</a></Trans></p>
                        <p><Trans><strong>Haltbarkeit: </strong>5 Jahre (halbjährlich muss das AQQA®system mit klarem Wasser gespült werden)</Trans></p>
                        <p><Trans>
                            Die Rückhalterate für Bakterien wurde von BCS, Florida, USA für den AQQAbag zertifiziert. Das AQQAsystem funktioniert nach dem gleichen Prinzip. Das Herzstück ist unsere Filtermembran.
                        </Trans></p>
                        <p><Trans>
                            Die Anwendung ist sehr einfach: Es wird Wasser aus einem See oder einem Fluss mit einer Membran gefiltert. Das Besondere am AQQAbag ist die bisher unerreichte Qualität des Wassers bei gleichzeitig niedrigen Kosten.
                        </Trans></p>
                        <p><Trans>
                            Der AQQAbag verstopft nicht und muss nicht gewartet werden, er ist leicht, handlich und kann unbegrenzt gelagert werden. Damit ist der AQQAbag das ideale Produkt, um Menschen vorübergehend mit Trinkwasser zu versorgen – sei es im Krisenfall, für Menschen, für die noch keine dauerhafte Lösung bereit steht oder für Reisende. Der AQQAbag wurde über mehrere Monate erfolgreich getestet und seine Wirkung von Laboren bestätigt.
                        </Trans></p>
                    </section>
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
