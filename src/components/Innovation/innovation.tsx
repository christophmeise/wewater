import { Trans } from 'gatsby-plugin-react-i18next';
import React from 'react';
import { Container, Grid, GridColumn, Header } from 'semantic-ui-react';
import './innovation.less';
import LordIcon from './lordicon';

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'lord-icon': React.DetailedHTMLProps<any, any>;
        }
    }
}

const Innovation = () => {

    return (
        <section className="main-section">
            <Container>
                <Header
                    data-sal="slide-up"
                    data-sal-delay="0"
                    data-sal-duration="300"
                    data-sal-easing="ease"
                    textAlign='left'
                    className="global-flex-column global-no-margin"
                >
                    <h3 className={`global-subtitle text-primary`}><Trans>Weil’s an Trinkwasser mangelt, nicht an guten Ideen.</Trans></h3>
                    <h2 className="global-headline"><Trans>Unsere Innovation auf einen Blick</Trans></h2>
                </Header>
                <Grid columns="4" stackable centered>
                    <GridColumn>
                        <div className="innovation-tile">
                            <LordIcon src="/images/innovation/gauge.json"></LordIcon>
                            <strong><Trans>Hohe Rückhalterate</Trans></strong>
                            <p><Trans>Unsere Filterlösungen funktionieren mit einer innovativen und hochsicheren Filtermembran. 99,9999% aller Bakterien, Partikel, Schwebstoffe oder anderer organischer Verunreinigungen werden zurückgehalten und kommen nicht ins Wasser – zertifiziert durch das Labor BCS in Florida.</Trans></p>
                        </div>
                    </GridColumn>
                    <GridColumn>
                        <div className="innovation-tile">
                            <LordIcon src="/images/innovation/energy.json"></LordIcon>
                            <strong><Trans>Energiefrei</Trans></strong>
                            <p><Trans>Kein Strom und keine weitere Infrastruktur benötigt! Filter hinstellen, Wasser durchlaufen lassen. Fertig. Die Filtration erfolgt durch Schwerkraft alleine.</Trans></p>
                        </div>
                    </GridColumn>
                    <GridColumn>
                        <div className="innovation-tile">
                            <LordIcon src="/images/innovation/chemicals.json"></LordIcon>
                            <strong><Trans>Keine Chemikalien</Trans></strong>
                            <p><Trans>Alle unsere Filtersysteme laufen komplett ohne Zusatz von chemischen Stoffen. Dadurch sind sie einfach in der Handhabung und besonders ressourcenschonend.</Trans></p>
                        </div>
                    </GridColumn>
                    <GridColumn>
                        <div className="innovation-tile">
                            <LordIcon src="/images/innovation/cheap.json"></LordIcon>
                            <strong><Trans>Günstig in der Herstellung</Trans></strong>
                            <p><Trans>Höchste Qualität Made in Germany, aber ohne Gewinnabsichten. Unsere Produktionspartner stellen die Filter zum Selbstkostenpreis her. Damit können wir sie zu besonders guten Preisen in Projekten einsetzen – ein Liter gefiltertes Wasser kostet so weniger 0,01€!</Trans></p>
                        </div>
                    </GridColumn>
                </Grid>
            </Container>
        </section>
    );
};

export default Innovation;
