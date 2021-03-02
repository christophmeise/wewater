import { Trans } from 'gatsby-plugin-react-i18next';
import React from 'react';
import { Form } from 'semantic-ui-react';
import Error from "../Error/Error";

const PaymentModes = ({ input, handleOnChange }) => {
	return (
		<Form.Group grouped>
			<Error errors={input.errors} fieldName={'paymentMethod'} />
			<Form.Field>
				<label className="form-check-label">
					<input onChange={handleOnChange} value="bacs" className="form-check-input" name="paymentMethod" type="radio" />
					<span className="woo-next-payment-content"><Trans>Direkte Bankverbindung</Trans></span>
				</label>
			</Form.Field>
			<Form.Field>
				<label className="form-check-label">
					<input onChange={handleOnChange} value="paypal" className="form-check-input" name="paymentMethod" type="radio" />
					<span className="woo-next-payment-content">Paypal</span>
				</label>
			</Form.Field>
		</Form.Group>
	);
};

export default PaymentModes;
