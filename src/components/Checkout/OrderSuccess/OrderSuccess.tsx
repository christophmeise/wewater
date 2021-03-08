import React from 'react';

const OrderSuccess = (props) => {

	const { response } = props;

	if (!response) {
		return null;
	}

	const responseData = response.checkout;
	const isPayPal = !(responseData.redirect.indexOf('kasse/order-received') > 0);
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
