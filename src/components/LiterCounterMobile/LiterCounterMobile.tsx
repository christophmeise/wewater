import { Trans } from 'gatsby-plugin-react-i18next';
import React, { PureComponent } from 'react';

export default class LiterCounterMobile extends PureComponent<any, any> {
    constructor(props: any) {
        super(props);
        const timeDiff = new Date().getTime() - new Date('2019-03-01').getTime();
        const minutes = timeDiff / 1000 / 60;
        const liter = minutes * 11.395;
        this.state = {
            liter: liter
        }

        if (typeof window !== 'undefined') {
            setInterval(() => this.setState({ liter: this.state.liter + 0.1899 }), 1000);
        }
    }

    format = new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2 });

    render() {

        return (
            <>
                <h3 className="global-subtitle text-primary"><Trans>Globale Skalierung</Trans></h3>
                <div className="mobile-water-counter">
                    <div className="counter-wrapper">
                        <h3>{this.format.format(this.state.liter.toFixed(2))}</h3>
                    </div>
                    <p><Trans>Liter Trinkwasser werden pro Jahr gespendet</Trans></p>
                </div>
            </>
        )
    }
}
