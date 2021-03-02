import React from 'react';
const Error = ({ errors, fieldName }) => {

	return (
		<React.Fragment>
			{errors && (errors.hasOwnProperty(fieldName)) ? (
				<div className="invalid-feedback d-block">{errors[fieldName]}</div>
			) : ''}
		</React.Fragment>
	)
};

export default Error;
