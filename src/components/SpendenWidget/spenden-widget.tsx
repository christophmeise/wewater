import shieldCheck from '@iconify/icons-bi/shield-check';
import { Icon } from '@iconify/react';
import { Link, Trans } from 'gatsby-plugin-react-i18next';
import React from 'react';
import { Button, Container, Grid, GridColumn, Header } from 'semantic-ui-react';
import './spenden-widget.less';

interface Props {
    fullMode: boolean;
    hideForm: boolean;
}

class SpendenWidget extends React.Component<Props, any> {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { fullMode, hideForm } = this.props;

        return (
            <section className="main-section spenden-widget-container">
                <Container>
                    <Grid columns="2" stackable>
                        <GridColumn>
                            <article className="spenden-widget-left">
                                <Header
                                    data-sal="slide-up"
                                    data-sal-delay="0"
                                    data-sal-duration="300"
                                    data-sal-easing="ease"
                                    textAlign='left'
                                    className="global-flex-column global-no-margin"
                                >
                                    <h3 className={`global-subtitle text-primary`}><Trans>Werde Dauerspender*in</Trans></h3>
                                    <h2 className="global-headline"><Trans>Spenden und Durst nach besserem Leben stillen</Trans></h2>
                                </Header>
                                <h4><Trans>WeWater arbeitet ehrenamtlich sowie auf Spendenbasis. Daher sind wir auf finanzielle Hilfe angewiesen sind, um Wasserprojekte zu realisieren. Hilf jetzt mit einer Spende.</Trans></h4>
                                <ul className="spenden-list">
                                    <li>
                                        <div><Icon icon={shieldCheck} /></div>
                                        <p><Trans>Unsere Gemeinnützigkeit ist vom Finanzamt anerkannt.</Trans></p>
                                    </li>
                                    <li>
                                        <div><Icon icon={shieldCheck} /></div>
                                        <p><Trans>Wir arbeiten ehrenamtlich und beziehen kein Gehalt, Sachleistungen oder andere Vergütungen.</Trans></p>
                                    </li>
                                    <li>
                                        <div><Icon icon={shieldCheck} /></div>
                                        <p>
                                            <Trans>
                                                Da wir eine kleine Organisation mit flachen Hierachien sind, arbeiten wir sehr effektiv. Quasi jeder Euro kommt dem Satzungsziel zugute, weil wir keinen riesigen Verwaltungsapparat finanzieren müssen.
                                            </Trans>
                                        </p>
                                    </li>
                                    <li>
                                        <div><Icon icon={shieldCheck} /></div>
                                        <p>
                                            <Trans>
                                                Wir arbeiten transparent, haben unsere Satzung veröffentlicht und im Blog kannst du genau mitverfolgen was mit deinen Spendengeldern geschieht.
                                            </Trans>
                                        </p>
                                    </li>
                                </ul>
                                <div className="spenden-info-box">
                                    <h5><Trans>Mittelverwendung</Trans></h5>
                                    <p><Trans>
                                        Grundsätzlich werden bei gemeinnützigen Organisationen Verwaltungs-, Organisations- oder sogar Lohnkosten als kritisch angesehen.
                                        Aktuell arbeiten wir mit sehr geringen Verwaltungskosten. Dazu gehören Kosten für das Website-Hosting, Gebühren für ein SSL-Zertifikat,
                                        Kontoführungsgebühren sowie Kosten für Rechtsberatung und Steuerberater. Lohnkosten haben wir zum jetzigen Zeitpunkt keine. Dennoch werden ab einer gewissen Größe Lohnausgaben unabdingbar sein.</Trans>
                                    </p>
                                </div>
                                {(fullMode === true &&
                                    <div className="spenden-info-box">
                                        <h5><Trans>Spenden an uns kannst du steuerlich geltend machen</Trans></h5>
                                        <p>
                                            <Trans>
                                                Spenden an die WeWater gemeinnützige UG sind laut Anlage zum Körperschaftsteuerbescheid 2024 des <strong>Finanzamts für Körperschaften</strong> I (Bredtschneiderstraße 5, 14057 Berlin) vom 03.07.2026 nach § 5 Abs. 1 Nr. 9 KStG <strong>von der Körperschaftsteuer befreit</strong> und dienen ausschließlich und unmittelbar steuerbegünstigten gemeinnützigen Zwecken.
                                                <br /><br />
                                                Wir bestätigen, dass die Zuwendung nur zur Förderung gemeinnütziger Zwecke im Sinne der Förderung der Entwicklungszusammenarbeit gemäß §§ 52 Abs. 2 Satz 1 Nr.(n) 15 AO, verwendet wird.
                                                <br /><br />
                                                <strong>Spenden bis zu 300 Euro</strong> jährlich kannst du <strong>ohne Spendenquittung</strong> (§ 50 Abs. 2 Nr. 2 Buchst. b EStDV) steuerlich geltend machen. Dafür reichst du einfach deinen Kontoauszug zusammen mit
                                                <a href="https://www.wewaterbackend.org/wp-content/uploads/2026/08/Bestaetigung_ueber_Zuwendungen_fuer_Finanzamt_WeWater_2026_07_03.pdf" target="_blank"> diesem Dokument</a> (Link anklicken) beim Finanzamt ein. Wichtig: Gib bei jeder Spende per Überweisung den Verwendungszweck an (z.B. monatliche Spende, einmalige Spende). So können wir deine Spende richtig zuordnen.
                                                <br /><br />
                                                <strong>Für Spenden über 300 Euro jährlich</strong> benötigst du eine Spendenbescheinigung von uns, um sie <strong>steuerlich geltend zu machen</strong>. <strong>Bitte schreib uns eine E-Mail an
                                                    <a href="mailto:hi@wewater.org"> hi@wewater.org</a></strong> mit deinem <strong>vollständigen Namen und deiner Anschrift</strong>. Wir senden dir dann deine Spendenbescheinigung per Mail zu.
                                                <br /><br />
                                                Unsere Satzung findest du <a href="https://wewaterbackend.org/wp-content/uploads/2019/01/Satzung_WeWater_gUG.pdf" target="_blank">hier</a>.
                                            </Trans>
                                        </p>
                                    </div>
                                )}
                            </article>
                        </GridColumn>
                        <GridColumn>
                            {typeof window !== 'undefined' && !hideForm && <React.Fragment>
                                <div id="betterplace_donation_iframe">
                                    <iframe loading="lazy" title="Spendenformular WeWater Betterplace Donation" frameBorder="0" marginHeight={0} marginWidth={0} src="https://www.betterplace.org/de/donate/iframe/projects/68773?background_color=ffffff&color=5ABEE6&donation_amount=20&bottom_logo=true&default_payment_method=&default_interval=single&utm_campaign=external_donation_forms" width="100%"></iframe>
                                </div>
                            </React.Fragment>
                            }
                            {hideForm &&
                                <div className="spenden-button-center">
                                    <Link to='/spenden'>
                                        <Button
                                            primary
                                            inverted={false}
                                            size="medium"
                                            className="rounded shadow hover-animate"
                                        >
                                            <Trans>Zur Spendenseite</Trans>
                                        </Button>
                                    </Link>
                                </div>
                            }
                        </GridColumn>
                    </Grid>
                </Container>
            </section >
        );
    }
}

export default SpendenWidget;
