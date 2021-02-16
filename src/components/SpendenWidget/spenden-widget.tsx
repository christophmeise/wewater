import React from 'react';
import { Helmet } from 'react-helmet';
import { Container } from 'semantic-ui-react';
import './spenden-widget.less';

class SpendenWidget extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Container style={{ padding: '3rem 0rem' }}>
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
                        <a href="https://www.betterplace.org/de/projects/68773-sauberes-trinkwasser-fur-die-schulen-im-kinderdorf-bei-bweyale-in-uganda/donations/new">Jetzt Spenden für „SAUBERES TRINKWASSER FÜR DIE SCHULEN IM KINDERDORF BEI BWEYALE IN UGANDA“ bei unserem Partner betterplace.org
                   </a>
                    </strong>
                </div>
            </Container>
        );
    }
}

export default SpendenWidget;







