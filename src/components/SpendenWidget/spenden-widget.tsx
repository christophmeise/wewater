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
            <section className="main-section">
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
                                    <h3 className={`global-subtitle text-primary`}><Trans>Spenden und Durst nach besserem Leben stillen</Trans></h3>
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
                                    <strong><Trans>Mittelverwendung</Trans></strong>
                                    <p><Trans>
                                        Grundsätzlich werden bei gemeinnützigen Organisationen Verwaltungs-, Organisations- oder sogar Lohnkosten als kritisch angesehen.
                                        Aktuell arbeiten wir mit sehr geringen Verwaltungskosten. Dazu gehören Kosten für das Website-Hosting, Gebühren für ein SSL-Zertifikat,
                                        Kontoführungsgebühren sowie Kosten für Rechtsberatung und Steuerberater. Lohnkosten haben wir zum jetzigen Zeitpunkt keine. Dennoch werden ab einer gewissen Größe Lohnausgaben unabdingbar sein.</Trans>
                                    </p>
                                </div>

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
                    {(fullMode === true &&
                        <Grid columns="1">
                            <GridColumn>
                                <div className="spenden-info-box">
                                    <strong><Trans>Spenden an uns kannst du steuerlich geltend machen</Trans></strong>
                                    <p>
                                        <Trans>
                                            Die WeWater gemeinnützige UG ist laut Bescheid vom 02.01.2019 vom Finanzamt für Körperschaften I (Bredtschneiderstraße 5, 14057 Berlin) nach § 60a Abs. 1 AO als gemeinnützig anerkannt.

                                            Spenden an die WeWater gemeinnützige UG sind gemäß § 10b Abs. 1 EStG steuerlich abzugsfähig. Wir bestätigen, dass die Zuwendung nur zur Förderung gemeinnütziger Zwecke im Sinne der Förderung der Entwicklungszusammenarbeit gemäß §§ 52 Abs. 2 Satz 1 Nr.(n) 15 AO, verwendet wird.

                                            Spenden bis zu 300 Euro (neu seit 01.01.2021, vorher 200€) jährlich kannst du ohne Spendenquittung (§ 50 Abs. 2 Nr. 2 Buchst. b EStDV) steuerlich geltend machen. Dafür reichst du einfach deinen Kontoauszug zusammen mit diesem Dokument für Spenden bis 31.12.2020 (Link anklicken) oder diesem Dokument für Spenden ab 01.01.2021 (Link anklicken) beim Finanzamt ein. Wichtig: Gib bei jeder Spende per Überweisung den Verwendungszweck an (z.B. monatliche Spende, einmalige Spende, Spende für Projekt xy). So können wir deine Spende richtig zuordnen.

                                            Für Spenden über 300 Euro ab 01.01.2021 bzw. über 200 Euro bis 31.12.2020 jährlich benötigst du eine Spendenbescheinigung von uns, um sie steuerlich geltend zu machen. Bitte schreib uns eine E-Mail an hi@wewater.org mit deinem vollständigen Namen und deiner Anschrift. Wir senden dir dann deine Spendenbescheinigung per Mail zu.

                                            Unsere Satzung findest du hier.
                                    </Trans>
                                    </p>
                                </div>
                            </GridColumn>
                        </Grid>
                    )}
                </Container>
            </section >
        );
    }
}

export default SpendenWidget;
