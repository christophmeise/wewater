import React from 'react';
import { sanitize } from "../../../utils/functions";

const CheckoutError = ({ requestError }) => {

	let errorMsg = <div className=" alert alert-info mt-2" dangerouslySetInnerHTML={{ __html: sanitize(requestError) }} />;

	return errorMsg;

};

export default CheckoutError;
