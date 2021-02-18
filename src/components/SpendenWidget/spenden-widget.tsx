import shieldCheck from '@iconify/icons-bi/shield-check';
import { Icon } from '@iconify/react';
import React from 'react';
import { Helmet } from 'react-helmet';
import { Container, Grid, GridColumn, Header } from 'semantic-ui-react';
import './spenden-widget.less';

class SpendenWidget extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <section className="main-section">
                <Container style={{ padding: '3rem 0rem' }}>
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
                                    <h3 className={`global-subtitle text-primary`}>Spenden und Durst nach besserem Leben stillen</h3>
                                    <h2 className="global-headline">Spenden und Durst nach besserem Leben stillen</h2>
                                </Header>
                                <h5>WeWater arbeitet ehrenamtlich sowie auf Spendenbasis. Daher sind wir auf finanzielle Hilfe angewiesen sind, um Wasserprojekte zu realisieren. Hilf jetzt mit einer Spende.</h5>
                                <ul className="spenden-list">
                                    <li>
                                        <div><Icon icon={shieldCheck} /></div>
                                        <p>Unsere Gemeinnützigkeit ist vom Finanzamt anerkannt.</p>
                                    </li>
                                    <li>
                                        <div><Icon icon={shieldCheck} /></div>
                                        <p>
                                            Wir arbeiten ehrenamtlich und beziehen kein Gehalt, Sachleistungen oder andere Vergütungen.
                                </p>
                                    </li>
                                    <li>
                                        <div><Icon icon={shieldCheck} /></div>
                                        <p>
                                            Da wir eine kleine Organisation mit flachen Hierachien sind, arbeiten wir sehr effektiv. Quasi jeder Euro kommt dem Satzungsziel zugute, weil wir keinen riesigen Verwaltungsapparat finanzieren müssen.
                                </p>
                                    </li>
                                    <li>
                                        <div><Icon icon={shieldCheck} /></div>
                                        <p>
                                            Wir arbeiten transparent, haben unsere Satzung veröffentlicht und im Blog kannst du genau mitverfolgen was mit deinen Spendengeldern geschieht.
                                </p>
                                    </li>
                                    <li>
                                        <div><Icon icon={shieldCheck} /></div>
                                        <p>
                                            Mit dem Brunnenprojekt in Uganda haben wir uns schon vor der Gründung von WeWater engagiert, Spenden gesammelt und vor allem: Das Projekt erfolgreich umgesetzt.
                                </p>
                                    </li>
                                </ul>
                                <div className="spenden-info-box">
                                    <strong>Mittelverwendung</strong>
                                    <p>Grundsätzlich werden bei gemeinnützigen Organisationen Verwaltungs-, Organisations- oder sogar Lohnkosten als kritisch angesehen.
                                    Aktuell arbeiten wir mit sehr geringen Verwaltungskosten. Dazu gehören Kosten für das Website-Hosting, Gebühren für ein SSL-Zertifikat,
                        Kontoführungsgebühren sowie Kosten für Rechtsberatung und Steuerberater. Lohnkosten haben wir zum jetzigen Zeitpunkt keine. Dennoch werden ab einer gewissen Größe Lohnausgaben unabdingbar sein.</p>
                                </div>

                            </article>
                        </GridColumn>
                        <GridColumn>
                            <Helmet
                                script={
                                    [
                                        {
                                            type: 'text/javascript',
                                            innerHTML: `
                            var _bp_iframe        = _bp_iframe || {};
                            _bp_iframe.project_id = 68773; /* REQUIRED */
                            _bp_iframe.lang       = 'de'; /* Language of the form */
                            _bp_iframe.width = 600; /* Custom iframe-tag-width, integer */
                            _bp_iframe.color = '5ABEE6'; /* Button and banderole color, hex without "#" */
                            _bp_iframe.background_color = 'ffffff'; /* Background-color, hex without "#" */
                            _bp_iframe.default_amount = 20; /* Donation-amount, integer 1-99 */
                            _bp_iframe.default_data_transfer_accepted = true; /* true (default), false */
                            _bp_iframe.recurring_interval = 'single'; /* Interval for recurring donations, string out of ["single", "monthly", "quarter_yearly", "half_yearly", "yearly"] */
                            _bp_iframe.bottom_logo = true;
                            (function() {
                                var bp = document.createElement('script'); bp.type = 'text/javascript'; bp.async = true;
                                bp.src = 'https://betterplace-assets.betterplace.org/assets/load_donation_iframe.js';
                                var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(bp, s);
                            })();`
                                        }
                                    ]}
                            />
                            <div id="betterplace_donation_iframe" style={{ background: "transparent url('https://www.betterplace.org/assets/new_spinner.gif') 275px 20px no-repeat" }}>
                                <strong>
                                    <a href="https://www.betterplace.org/de/projects/68773-sauberes-trinkwasser-fur-die-schulen-im-kinderdorf-bei-bweyale-in-uganda/donations/new">
                                        Jetzt Spenden für „SAUBERES TRINKWASSER FÜR DIE SCHULEN IM KINDERDORF BEI BWEYALE IN UGANDA“ bei unserem Partner betterplace.org
                                    </a>
                                </strong>
                            </div>
                        </GridColumn>
                    </Grid>

                </Container>
            </section>
        );
    }
}

export default SpendenWidget;







