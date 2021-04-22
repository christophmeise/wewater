import { Trans } from 'gatsby-plugin-react-i18next';
import React from 'react';
import { Form } from 'semantic-ui-react';
import Error from "../Error/Error";

const PaymentModes = ({ input, handleOnChange }) => {
	return (
		<Form.Group grouped>
			<Error errors={input.errors} fieldName={'paymentMethod'} />
			<div className="field">
				<div className="ui radio checkbox"><input type="radio" onChange={handleOnChange} readOnly={false} value="bacs" name="paymentMethod" /><label><Trans>Direkte Bankverbindung</Trans></label></div>
			</div>
			<div className="field">
				<div className="ui radio checkbox"><input type="radio" onChange={handleOnChange} readOnly={false} value="paypal" name="paymentMethod" /><label><Trans>Paypal</Trans></label></div>
			</div>
		</Form.Group>
	);
};

export default PaymentModes;
