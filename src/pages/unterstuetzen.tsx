// i18next-extract-mark-ns-start page_unterstuetzen
import { graphql } from 'gatsby';
import { Trans } from 'gatsby-plugin-react-i18next';
import React from 'react';
import { Container } from 'semantic-ui-react';
import Layout from '../components/Layout/Layout';
import PlainHeader from '../components/PlainOverlay/plain-header';
import SEO from '../components/seo';
import { useTranslationHOC } from '../components/useTranslationHOC/useTranslationHOC';


interface Props {
    t: any;
}

class UnterstuetzenPage extends React.Component<Props, any> {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        var iFrame: any = document.createElement('iframe');
        iFrame.style.display = 'none';
        iFrame.style.border = "none";
        iFrame.width = "310";
        iFrame.height = "256";
        iFrame.setAttribute && iFrame.setAttribute('scrolling', 'no');
        iFrame.setAttribute('frameborder', '0');
        setTimeout(function () {
            var contents = (iFrame.contentWindow) ? iFrame.contentWindow : (iFrame.contentDocument.document) ? iFrame.contentDocument.document : iFrame.contentDocument;
            contents.document.open();
            contents.document.write(decodeURIComponent("%3Cdiv%20id%3D%22amznCharityBannerInner%22%3E%3Ca%20href%3D%22https%3A%2F%2Fsmile.amazon.de%2Fch%2F27-612-06448%22%20target%3D%22_blank%22%3E%3Cdiv%20class%3D%22text%22%20height%3D%22%22%3E%3Cdiv%20class%3D%22support-wrapper%22%3E%3Cdiv%20class%3D%22support%22%20style%3D%22font-size%3A%2025px%3B%20line-height%3A%2028px%3B%20margin-top%3A%201px%3B%20margin-bottom%3A%200px%3B%22%3EUnterst%C3%BCtzen%20Sie%20%3Cspan%20id%3D%22charity-name%22%20style%3D%22display%3A%20inline-block%3B%22%3EWeWater%20gemeinnuetzige%20UG%2C%3C%2Fspan%3E%3C%2Fdiv%3E%3C%2Fdiv%3E%3Cdiv%20class%3D%22when-shop%22%3Eindem%20Sie%20auf%20%3Cb%3Esmile.amazon.de%3C%2Fb%3E%3C%2Fdiv%3E%3Cdiv%20class%3D%22donates%22%3E%20einkaufen.%3C%2Fdiv%3E%3C%2Fdiv%3E%3C%2Fa%3E%3C%2Fdiv%3E%3Cstyle%3E%23amznCharityBannerInner%7Bbackground-image%3Aurl(https%3A%2F%2Fm.media-amazon.com%2Fimages%2FG%2F03%2Fx-locale%2Fpaladin%2Fcharitycentral%2Fbanner-background-image._CB526390082_.png)%3Bwidth%3A300px%3Bheight%3A250px%3Bposition%3Arelative%7D%23amznCharityBannerInner%20a%7Bdisplay%3Ablock%3Bwidth%3A100%25%3Bheight%3A100%25%3Bposition%3Arelative%3Bcolor%3A%23000%3Btext-decoration%3Anone%7D.text%7Bposition%3Aabsolute%3Btop%3A20px%3Bleft%3A15px%3Bright%3A15px%3Bbottom%3A100px%7D.support-wrapper%7Boverflow%3Ahidden%3Bmax-height%3A86px%7D.support%7Bfont-family%3AArial%2Csans%3Bfont-weight%3A700%3Bline-height%3A28px%3Bfont-size%3A25px%3Bcolor%3A%23333%3Btext-align%3Acenter%3Bmargin%3A0%3Bpadding%3A0%3Bbackground%3A0%200%7D.when-shop%7Bfont-family%3AArial%2Csans%3Bfont-size%3A15px%3Bfont-weight%3A400%3Bline-height%3A15px%3Bcolor%3A%23333%3Btext-align%3Acenter%3Bmargin%3A0%3Bpadding%3A0%3Bbackground%3A0%200%7D.donates%7Bfont-family%3AArial%2Csans%3Bfont-size%3A15px%3Bfont-weight%3A400%3Bline-height%3A21px%3Bcolor%3A%23333%3Btext-align%3Acenter%3Bmargin%3A0%3Bpadding%3A0%3Bbackground%3A0%200%7D%3C%2Fstyle%3E")); contents.document.close(); iFrame.style.display = 'block';
        }); document.getElementById('amznCharityBanner').appendChild(iFrame);
    }


    render() {
        const { t } = this.props;

        return (
            <Layout>
                <SEO title={t('UnterstuetzenSEOTitle')} description={t('UnterstuetzenSEODescription')} />
                <Container className="global-header-padding">
                    <PlainHeader content={HeaderContent(t)} />
                    <Container text>
                        <div className="main-content-sections">
                            <section>
                                <p><Trans>Manchmal ist man etwas knapp bei Kasse – wir kennen das. Doch es gibt diverse Möglichkeiten, wie du uns ohne eine finanzielle unterstützen kannst. Schau mal in diese Liste. Sicher ist etwas dabei, dass du für uns tun kannst. Vielen, vielen Dank!</Trans></p>
                                <h4><Trans>1. Like unsere Facebook-Seite</Trans></h4>
                                <iframe style={{ border: 'none', overflow: 'hidden' }}
                                    src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fwewater.org%2F&amp;tabs=timeline&amp;width=500&amp;height=300&amp;small_header=false&amp;adapt_container_width=true&amp;hide_cover=false&amp;show_facepile=true&amp;appId"
                                    width="500" height="300" frameBorder="0" scrolling="no" loading="lazy">
                                </iframe>
                                <h4><Trans>2. Teile unsere Facebook-Seite</Trans></h4>
                                <p><Trans>Nachdem du uns auf <a href="https://www.facebook.com/wewater.org/" target="_blank" rel="noopener noreferrer">unserer Facebook-Seite ein Like</a> gelassen hast, freuen wir uns sehr darüber, wenn du die Seite deinen Freunden empfiehlst, um uns mehr Aufmerksamkeit zu schenken.</Trans></p>
                                <h4><Trans>3. Folge uns auf <a href="https://www.instagram.com/wewater_org/?hl=de" target="_blank" rel="noopener noreferrer">Instagram</a></Trans></h4>
                                <blockquote
                                    data-instgrm-captioned
                                    data-instgrm-permalink="https://www.instagram.com/p/Bux-bfYHKrK/?utm_source=ig_embed&amp;utm_campaign=loading"
                                    data-instgrm-version="12"
                                    className="instagram-media insta-embed"
                                ></blockquote>
                                <h4><Trans>4. Kopiere das in deinen Whatsapp-Status</Trans></h4>
                                <p><em><Trans>"Ich unterstütze wewater.org. Spende auch du für sauberes Trinkwasser!"</Trans></em></p>
                                <h4><Trans>5. Liefere uns wertvolle Kontakte</Trans></h4>
                                <p><Trans>Jeder kennt jemanden, der einen kennt, der einen kennt. Wir sind dankbar über jeden Kontakt, der uns auf unserem Weg helfen kann. Das können zum Beispiel Menschen mit Know-how sein, Menschen mit guten Beziehungen in die Medien oder Menschen, die bereit sind für unser Engagement zu spenden. Schreib uns an <a href="mailto:hi@wewater.org">hi@wewater.org</a>. Oder empfiehle uns direkt weiter. Vielen Dank!</Trans></p>
                                <h4><Trans>6. Bring dich ein</Trans></h4>
                                <p><Trans>Bei unserer ehrenamtlichen Arbeit für WeWater brauchen wir Designer, Programmierer, Social Media Manager und Menschen, die Lust und Spaß daran haben sich zu engagieren. Was kannst du gut? Wir können jede Hilfe und jedes Talent gebrauchen, also schreib uns an <a href="mailto:hi@wewater.org" target="_blank" rel="noopener noreferrer">hi@wewater.org</a>. Jede Hilfe ist herzlich willkommen!</Trans></p>
                                <h4><Trans>7. Spende während du auf Amazon bestellst</Trans></h4>
                                <p><Trans>Auf <a href="http://smile.amazon.de/">smile.amazon.de</a> bietet Amazon eine Möglichkeit, um Spenden für gemeinnützige Organisationen zu sammeln. Wählst du dort "WeWater gemeinnützige UG" unter deinem begünstigtem Empfänger aus und gehst du vor jeder Bestellung auf Amazon ab sofort immer auf <a href="http://smile.amazon.de/">smile.amazon.de</a>, so erhält WeWater 0,5% deines Bestellwertes als Spende von Amazon. Komplett ohne Aufpreis für dich.</Trans></p>
                                <div id="amznCharityBanner">
                                </div>
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
            <h1 className="header-overlay-headline"><Trans>Dein 7-Punkte-Plan</Trans></h1>
            <h2 className="header-overlay-subheadline"><Trans>So kannst du uns auch ohne eine finanzielle Spende unterstützen</Trans></h2>
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

export default useTranslationHOC(UnterstuetzenPage);
