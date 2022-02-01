import { Trans } from 'gatsby-plugin-react-i18next';
import React, { PureComponent } from 'react';

export default class LiterCounterMobile extends PureComponent<any, any> {

    literInterval;

    constructor(props: any) {
        super(props);
        const timeDiff = new Date().getTime() - new Date('2021-12-22').getTime() + 88790842706;
        const minutes = timeDiff / 1000 / 60;
        const liter = minutes * 15.4;
        this.state = {
            liter: liter
        }

        if (typeof window !== 'undefined') {
            this.literInterval = setInterval(() => this.setState({ liter: this.state.liter + 0.1899 }), 1000);
        }
    }

    componentWillUnmount() {
        if (this.literInterval != null) {
            clearInterval(this.literInterval);
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
