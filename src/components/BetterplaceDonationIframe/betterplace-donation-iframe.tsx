import React from 'react';

const BETTERPLACE_IFRAME_URL =
    'https://www.betterplace.org/de/donate/iframe/projects/68773?background_color=ffffff&color=5ABEE6&donation_amount=20&bottom_logo=true&default_payment_method=&default_interval=single&utm_campaign=external_donation_forms';

/**
 * Betterplace donation form. Height is set in global.less (#betterplace_donation_iframe),
 * which also covers the same markup pasted into WordPress project pages.
 */
const BetterplaceDonationIframe = () => {
    if (typeof window === 'undefined') return null;
    return (
        <div id="betterplace_donation_iframe">
            <iframe
                loading="lazy"
                title="Spendenformular WeWater Betterplace Donation"
                frameBorder="0"
                marginHeight={0}
                marginWidth={0}
                src={BETTERPLACE_IFRAME_URL}
                width="100%"
            ></iframe>
        </div>
    );
};

export default BetterplaceDonationIframe;
