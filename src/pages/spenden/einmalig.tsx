// i18next-extract-mark-ns-start page_spenden
import { graphql } from "gatsby";
import { Trans } from "gatsby-plugin-react-i18next";
import React from "react";
import { Container } from "semantic-ui-react";
import Layout from "../../components/Layout/Layout";
import PlainHeader from "../../components/PlainOverlay/plain-header";
import SEO from "../../components/seo";
import { useTranslationHOC } from "../../components/useTranslationHOC/useTranslationHOC";

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
        <SEO
          title={t("SpendenEinmaligSEOTitle")}
          description={t("SpendenEinmaligSEODescription")}
        />
        <Container text className="global-header-padding">
          <PlainHeader content={HeaderContent(t)} />
          <section>
            <h3>
              <Trans>
                Vielen Dank, dass du an uns spenden möchtest. Für eine einmalige
                Spende gibt es vier Möglichkeiten.
              </Trans>
            </h3>
            <h4>
              <strong>
                <Trans>1. Du spendest via Paypal.</Trans>
              </strong>
            </h4>
            <div>
              <form
                action="https://www.paypal.com/cgi-bin/webscr"
                method="post"
                target="_top"
              >
                <input name="cmd" type="hidden" value="_s-xclick" />
                <input
                  name="hosted_button_id"
                  type="hidden"
                  value="E6362KW22CKHG"
                />
                <input
                  title="PayPal - The safer, easier way to pay online!"
                  alt="Spenden mit dem PayPal-Button"
                  name="submit"
                  src="https://www.paypalobjects.com/de_DE/DE/i/btn/btn_donateCC_LG.gif"
                  type="image"
                />
                <img
                  style={{
                    border: "0",
                    width: "1",
                    height: "1",
                    display: "none !important",
                  }}
                  hidden={true}
                  src="https://www.paypal.com/de_DE/i/scr/pixel.gif"
                  alt=""
                />
              </form>
            </div>
            <h4>
              <strong>
                <Trans>
                  2. Du spendest über unsere Projektseite auf Betterplace.
                </Trans>
              </strong>
            </h4>
            {typeof window !== "undefined" && (
              <React.Fragment>
                <div id="betterplace_donation_iframe">
                  <iframe
                    loading="lazy"
                    title="Spendenformular WeWater Betterplace Donation"
                    frameBorder="0"
                    marginHeight={0}
                    marginWidth={0}
                    src="https://www.betterplace.org/de/donate/iframe/projects/68773?background_color=ffffff&color=5ABEE6&donation_amount=20&bottom_logo=true&default_payment_method=&default_interval=single&utm_campaign=external_donation_forms"
                    width="100%"
                  ></iframe>
                </div>
              </React.Fragment>
            )}
            <h4>
              <strong>
                <Trans>3. Du spendest über eine Banküberweisung an</Trans>
              </strong>
            </h4>
            <p>
              WeWater gUG <br />
              Bank für Sozialwirtschaft <br />
              IBAN: DE90 3702 0500 0001 6026 01 <br />
              BIC-/SWIFT: BFSWDE33XXX
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
      <h1 className="header-overlay-headline">{t("Einmalig Spenden")}</h1>
    </div>
  );
};

export const pageQuery = graphql`
  query ($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      ...GetTranslations
    }
  }
`;

export default useTranslationHOC(SpendenPage);
