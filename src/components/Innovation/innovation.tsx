import React from 'react';
import { Container, Grid, GridColumn, Header } from 'semantic-ui-react';
import './innovation.less';

const Innovation = ({ }) => {

    return (
        <section className="main-section" style={{ padding: '3rem 0rem' }}>
            <Container>
                <Header
                    data-sal="slide-up"
                    data-sal-delay="0"
                    data-sal-duration="300"
                    data-sal-easing="ease"
                    textAlign='left'
                    className="global-flex-column global-no-margin"
                >
                    <h3 className={`global-subtitle text-primary`}>Weil’s an Wasser mangelt. Nicht an guten Ideen.</h3>
                    <h2 className="global-headline">Unsere Innovation auf einem Blick</h2>
                </Header>
                <Grid columns="4" stackable centered>
                    <GridColumn>
                        <div className="innovation-tile">
                            <img className="innovation-gif" src={'/images/innovation/cheap.gif'} alt="Money Bag Euro" />
                            <strong>Günstig in der Herstellung</strong>
                            <p>Ob direkte Integrationen mit Kartennetzwerken und Banken oder Bezahlvorgänge im Browser, Stripe-Technologien bewirken Großes im gesamten Tech-Stack der Finanzwelt.</p>
                        </div>
                    </GridColumn>
                    <GridColumn>
                        <div className="innovation-tile">
                            <img className="innovation-gif" src={'/images/innovation/gauge.gif'} alt="Gauge acceleration" />
                            <strong>Hohe Rückhalterate</strong>
                            <p>Mit Hunderten neuen Funktionen und Optimierungen pro Jahr halten wir Sie stets am technologischen Puls der Zeit. Für unsere Produktions-API etwa führen wir im Schnitt 16 Bereitstellungen täglich durch.</p>
                        </div>
                    </GridColumn>
                    <GridColumn>
                        <div className="innovation-tile">
                            <img className="innovation-gif" src={'/images/innovation/energy.gif'} alt="Hand holding a leaf" />
                            <strong>Energiefrei</strong>
                            <p>Unsere Systeme bieten eine Uptime von 99,9 %, hohe Skalierbarkeit und technische Redundanz. Stripe ist nach den höchsten Konformitätsstandards zertifiziert.</p>
                        </div>
                    </GridColumn>
                    <GridColumn>
                        <div className="innovation-tile">
                            <img className="innovation-gif" src={'/images/innovation/chemicals.gif'} alt="Water waves" />
                            <strong>Keine Chemikalien</strong>
                            <p>Wir trainieren unsere Modelle für maschinelles Lernen anhand von Milliarden Datensätzen – damit Sie sich auf bessere Konversionsraten und Umsatzsicherung sowie starken Betrugsschutz freuen können.</p>
                        </div>
                    </GridColumn>
                </Grid>
            </Container>
        </section>
    );
};

export default Innovation;
