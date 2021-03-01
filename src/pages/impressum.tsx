// i18next-extract-mark-ns-start page_impressum
import { graphql } from 'gatsby';
import React from 'react';
import { Container } from 'semantic-ui-react';
import Layout from '../components/Layout/Layout';
import PlainHeader from '../components/PlainOverlay/plain-header';
import SEO from '../components/seo';
import { useTranslationHOC } from '../components/useTranslationHOC/useTranslationHOC';

interface Props {
    t: any;
}

class Impressum extends React.Component<Props, any> {
    constructor(props) {
        super(props);
    }

    render() {
        const { t } = this.props;

        return (
            <Layout>
                <SEO title={t('ImpressumSEOTitle')} description={t('ImpressumSEODescription')} />
                <Container className="global-header-padding">
                    <PlainHeader content={HeaderContent(t)} />
                    <Container text>
                        <div className="main-content-sections">
                            <section>
                                <h3>Angaben gemäß § 5 TMG</h3>

                                <p>WeWater gemeinnützige UG (haftungsbeschränkt)</p>
                                <p>Dorfstraße 11a</p>
                                <p>13597 Berlin</p>
                                <p>Deutschland</p>
                                <h3>Kontakt</h3>
                                <p>E-Mail: hi (at) wewater.org</p>
                                <h3>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:</h3>
                                <p>Steven Hille</p>
                                <h3>Haftung für Inhalte</h3>
                                <p>Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.</p>
                                <p>Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.</p>
                                <h3>Haftung für Links</h3>
                                <p>Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb
                                können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für
                                die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
                                Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße
überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.</p>
                                <p>Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte
                                einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige
Links umgehend entfernen.</p>
                                <h3>Urheberrecht</h3>
                                <p>Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes
bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.</p>
                                <p>Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.</p>
                                <h3>Quellenangaben für die verwendeten Bilder und Grafiken</h3>
                                <p>“http://www.shutterstock.de”
                                “http://www.flickr.de”
                                “http://www.pixelio.de”
                                “https://unsplash.com”
                                Hannes Schwessinger, Thilo Kunz, Steven Hille, Ulrich Weise
                                Insofern hier nicht angegeben wird die Quelle unter dem Bild genannt.
Quelle Impressum: eRecht24</p>
                            </section>
                        </div>
                    </Container>
                </Container>
            </Layout>
        );
    }
}

const HeaderContent = (t) => {
    return (
        <div>
            <h1 className="header-overlay-headline">{t('page_impressum:headline')}</h1>
            <h2 className="header-overlay-subheadline">{t('page_impressum:subheadline')}</h2>
        </div>
    );
};

export const pageQuery = graphql`
    query($language: String!) {
        locales: allLocale(filter: {language: {eq: $language}}) {
          ...GetTranslations
        }
    }
`;

export default useTranslationHOC(Impressum);
