import React from 'react';
import { Label } from 'semantic-ui-react';
const Error = ({ errors, fieldName }) => {

	return (
		<React.Fragment>
			{errors && (errors.hasOwnProperty(fieldName)) ? (
				<Label basic color='red' pointing>
					{errors[fieldName]}
				</Label>
			) : ''}
		</React.Fragment>
	)
};

export default Error;
