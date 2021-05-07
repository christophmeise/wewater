// i18next-extract-mark-ns-start page_spenden
import { graphql } from 'gatsby';
import { Trans } from 'gatsby-plugin-react-i18next';
import React from 'react';
import { Container } from 'semantic-ui-react';
import Layout from '../../components/Layout/Layout';
import PlainHeader from '../../components/PlainOverlay/plain-header';
import SEO from '../../components/seo';
import { useTranslationHOC } from '../../components/useTranslationHOC/useTranslationHOC';

interface Props {
    t: any;
    data: {
        mobileImage: any;
        desktopImage: any;
    };
}

class SpendenPage extends React.Component<Props, any> {
    constructor(props) {
        super(props);
    }

    render() {
        const { t, data } = this.props;

        return (
            <Layout>
                <SEO title={t('SpendenMonatlichSEOTitle')} description={t('SpendenMonatlichSEODescription')} />
                <Container text className="global-header-padding">
                    <PlainHeader content={HeaderContent(t)} />
                    <section>
                        <h3><Trans>Wenn du gerne regelmäßig an uns spenden möchtest, dann gibt es zwei Möglichkeiten.</Trans></h3>
                        <h4><strong><Trans>1. Du spendest monatlich via PayPal.</Trans></strong></h4>
                        <p><Trans>Klick dafür einfach auf diesen Spenden-Button, gib den gewünschten Betrag ein und setze das Häkchen bei “monatliche Spende”. PayPal akzeptiert zahlreiche Zahlungsmöglichkeiten. Vielen Dank für deine Unterstützung.</Trans></p>
                        <div>
                            <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
                                <input type="hidden" name="cmd" value="_s-xclick" />
                                <input type="hidden" name="hosted_button_id" value="E6362KW22CKHG" />
                                <input type="image" src="https://www.paypalobjects.com/de_DE/DE/i/btn/btn_donateCC_LG.gif" style={{ border: "0" }} name="submit" title="PayPal - The safer, easier way to pay online!" alt="Spenden mit dem PayPal-Button" />
                                <img alt="" style={{ border: "0", width: "1", height: "1" }} src="https://www.paypal.com/de_DE/i/scr/pixel.gif" />
                            </form>
                        </div>
                        <h4><strong><Trans>2. Du richtest einen Dauerauftrag bei deiner Bank ein. Das machst du so:</Trans></strong></h4>
                        <p>
                            <Trans>
                                Du kopierst dir die unten genannten Kontodaten oder schreibst sie ab.
                                WeWater gUG
                                Bank für Sozialwirtschaft
                                IBAN: DE86 1002 0500 0001 6026 01
                                BIC-/SWIFT: BFSWDE33BER
                            </Trans>
                        </p>
                        <p>
                            <Trans>
                                Dann richtest du bei deiner Bank einen monatlichen Dauerauftrag ein.
                                Gib bitte Vor- und Nachnamen und den Verwendungszweck deiner Spende (z.B. monatliche Spende) an. Vielen Dank für deine Unterstützung.
                            </Trans>
                        </p>
                    </section>
                </Container>
            </Layout>
        );
    }
}

const HeaderContent = (t) => {
    return (
        <div>
            <h1 className="header-overlay-headline">{t('Monatlich Spenden')}</h1>
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

export default useTranslationHOC(SpendenPage);
