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
                <SEO title={t('SpendenEinmaligSEOTitle')} description={t('SpendenEinmaligSEODescription')} />
                <Container className="global-header-padding">
                    <PlainHeader content={HeaderContent()} />
                    <section>
                        <h3><Trans>Vielen Dank, dass du an uns spenden möchtest. Für eine einmalige Spende gibt es vier Möglichkeiten.</Trans></h3>
                        <h4><strong><Trans>1. Du spendest via Paypal.</Trans></strong></h4>
                        <div>
                            <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top"><input name="cmd" type="hidden" value="_s-xclick" />
                                <input name="hosted_button_id" type="hidden" value="E6362KW22CKHG" />
                                <input title="PayPal - The safer, easier way to pay online!" alt="Spenden mit dem PayPal-Button" name="submit" src="https://www.paypalobjects.com/de_DE/DE/i/btn/btn_donateCC_LG.gif" type="image" />
                                <img style={{ border: "0", width: "1", height: "1", display: "none !important" }} hidden={true} src="https://www.paypal.com/de_DE/i/scr/pixel.gif" alt="" />
                            </form>
                        </div>
                        <h4><strong>2. Du spendest via Lastschrift.</strong></h4>
                        <div>
                            <div className="bfs-resp-iframe">
                                <iframe src="https://secure.spendenbank.de/form/3291?langid=1" frameBorder="0" width="800" height="800" />
                            </div>
                        </div>
                        <h4><strong>3. Du spendest über unsere Projektseite auf <a href="https://www.betterplace.org/de/projects/68773-sauberes-trinkwasser-fur-die-schulen-im-kinderdorf-bei-bweyale-in-uganda" target="_blank" rel="noopener noreferrer">betterplace (hier klicken)</a>.</strong></h4>


                        <h4><strong>4. Du spendest über eine Banküberweisung an</strong></h4>
                        <p>
                            WeWater gUG
                            Bank für Sozialwirtschaft
                            IBAN: DE86 1002 0500 0001 6026 01
                            BIC-/SWIFT: BFSWDE33BER
                        </p>
                    </section>
                </Container>
            </Layout >
        );
    }
}

const HeaderContent = () => {
    return (
        <div>
            <h1 className="header-overlay-headline"><Trans>Einmalig Spenden</Trans></h1>
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
