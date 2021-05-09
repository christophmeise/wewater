import { Trans } from 'gatsby-plugin-react-i18next';
import React from 'react';

const OrderSuccess = (props) => {

	const { response } = props;

	if (!response) {
		return null;
	}

	const responseData = response.checkout;
	const isPayPal = !(responseData.redirect.indexOf('order-received') > 0);
	if (isPayPal) {
		window.location.href = responseData.redirect;
	} else {
		console.log('direkte bank')
	}

	return (
		<div className="container">
			{ 'success' === responseData.result && !isPayPal ? (
				<div>
					<h4>Bestellnummer: {responseData.order.orderKey} </h4>
					<p><Trans>Überweise direkt an unsere Bankverbindung. Bitte nutze die Bestellnummer als Verwendungszweck. Deine Bestellung wird erst nach Geldeingang auf unserem Konto versandt.</Trans></p>
					<p>WeWater gUG <br />
					Bank für Sozialwirtschaft <br />
					IBAN: DE86 1002 0500 0001 6026 01 <br />
					BIC-/SWIFT: BFSWDE33BER</p>
				</div>
			) : ''}
		</div>
	)
};

export default OrderSuccess;
