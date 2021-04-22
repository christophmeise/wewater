import { isEmpty } from 'lodash';
import validator from 'validator';

// @TODO to be revisited for updating for other countries.
const postCodeLocale = "IN"


const validateAndSanitizeCheckoutForm = (data) => {

	let errors = {};
	let sanitizedData = {};

	/**
	 * Set the firstName value equal to an empty string if user has not entered the firstName, otherwise the Validator.isEmpty() wont work down below.
	 * Note that the isEmpty() here is our custom function defined in is-empty.js and
	 * Validator.isEmpty() down below comes from validator library.
	 * Similarly we do it for for the rest of the fields
	 */
	data.firstName = (!isEmpty(data.firstName)) ? data.firstName : '';
	data.lastName = (!isEmpty(data.lastName)) ? data.lastName : '';
	data.company = (!isEmpty(data.company)) ? data.company : '';
	data.country = (!isEmpty(data.country)) ? data.country : '';
	data.address1 = (!isEmpty(data.address1)) ? data.address1 : '';
	data.address2 = (!isEmpty(data.address2)) ? data.address2 : '';
	data.city = (!isEmpty(data.city)) ? data.city : '';
	data.state = (!isEmpty(data.state)) ? data.state : '';
	data.postcode = (!isEmpty(data.postcode)) ? data.postcode : '';
	data.phone = (!isEmpty(data.phone)) ? data.phone : '';
	data.email = (!isEmpty(data.email)) ? data.email : '';
	data.customerNote = (!isEmpty(data.customerNote)) ? data.customerNote : '';
	data.paymentMethod = (!isEmpty(data.paymentMethod)) ? data.paymentMethod : '';
	if (data.shipToDifferentAddress === 'true') {
		data.firstName2 = (!isEmpty(data.firstName2)) ? data.firstName : '';
		data.lastName2 = (!isEmpty(data.lastName2)) ? data.lastName : '';
		data.company2 = (!isEmpty(data.company2)) ? data.company : '';
		data.country2 = (!isEmpty(data.country2)) ? data.country : '';
		data.address12 = (!isEmpty(data.address12)) ? data.address1 : '';
		data.address22 = (!isEmpty(data.address22)) ? data.address2 : '';
		data.city2 = (!isEmpty(data.city2)) ? data.city : '';
		data.state2 = (!isEmpty(data.state2)) ? data.state : '';
		data.postcode2 = (!isEmpty(data.postcode2)) ? data.postcode : '';
		data.phone2 = (!isEmpty(data.phone2)) ? data.phone : '';
	}

	/**
	 * Checks for error if required is true
	 * and adds Error and Sanitized data to the errors and sanitizedData object
	 *
	 * @param {String} fieldName Field name e.g. First name, last name
	 * @param {String} errorContent Error Content to be used in showing error e.g. First Name, Last Name
	 * @param {Integer} min Minimum characters required
	 * @param {Integer} max Maximum characters required
	 * @param {String} type Type e.g. email, phone etc.
	 * @param {boolean} required Required if required is passed as false, it will not validate error and just do sanitization.
	 */
	const addErrorAndSanitizedData = (fieldName, errorContent, min, max, type = '', required) => {

		const postCodeLocaleVal = postCodeLocale ? postCodeLocale : '';
		/**
		 * Please note that this isEmpty() belongs to validator and not our custom function defined above.
		 *
		 * Check for error and if there is no error then sanitize data.
		 */
		if (!validator.isLength(data[fieldName], { min, max })) {
			errors[fieldName] = `${errorContent} must be ${min} to ${max} characters`;
		}

		if ('email' === type && !validator.isEmail(data[fieldName])) {
			errors[fieldName] = `${errorContent} is not valid`;
		}

		if ('phone' === type && !validator.isMobilePhone(data[fieldName])) {
			errors[fieldName] = `${errorContent} is not valid`;
		}

		/* 		if ( 'postcode' === type && postCodeLocaleVal && ! validator.isPostalCode( data[ fieldName ], postCodeLocaleVal ) ) {
					errors[ fieldName ] = `${errorContent} is not valid`;
				} */

		if (required && validator.isEmpty(data[fieldName])) {
			errors[fieldName] = `${errorContent} is required`;
		}


		// If no errors
		if (!errors[fieldName]) {
			sanitizedData[fieldName] = validator.trim(data[fieldName]);
			sanitizedData[fieldName] = ('email' === type) ? validator.normalizeEmail(sanitizedData[fieldName]) : sanitizedData[fieldName];
			sanitizedData[fieldName] = validator.escape(sanitizedData[fieldName]);
		}

	};

	addErrorAndSanitizedData('firstName', 'First name', 2, 35, 'string', true);
	addErrorAndSanitizedData('lastName', 'Last name', 2, 35, 'string', true);
	addErrorAndSanitizedData('company', 'Company Name', 0, 35, 'string', false);
	addErrorAndSanitizedData('country', 'Country name', 2, 55, 'string', true);
	addErrorAndSanitizedData('address1', 'Street address line 1', 5, 100, 'string', true);
	addErrorAndSanitizedData('address2', '', 0, 254, 'string', false);
	addErrorAndSanitizedData('city', 'City field', 3, 25, 'string', true);
	addErrorAndSanitizedData('state', 'State/County', 0, 254, 'string', true);
	addErrorAndSanitizedData('postcode', 'Post code', 2, 9, 'postcode', true);
	addErrorAndSanitizedData('phone', 'Phone number', 9, 15, 'phone', true);
	addErrorAndSanitizedData('email', 'Email', 7, 254, 'email', true);
	if (data.shipToDifferentAddress === 'true') {
		addErrorAndSanitizedData('firstName2', 'First name', 2, 35, 'string', true);
		addErrorAndSanitizedData('lastName2', 'Last name', 2, 35, 'string', true);
		addErrorAndSanitizedData('company2', 'Company Name', 0, 35, 'string', false);
		addErrorAndSanitizedData('country2', 'Country name', 2, 55, 'string', true);
		addErrorAndSanitizedData('address12', 'Street address line 1', 5, 100, 'string', true);
		addErrorAndSanitizedData('address22', '', 0, 254, 'string', false);
		addErrorAndSanitizedData('city2', 'City field', 3, 25, 'string', true);
		addErrorAndSanitizedData('state2', 'State/County', 0, 254, 'string', true);
		addErrorAndSanitizedData('postcode2', 'Post code', 2, 9, 'postcode', true);
		addErrorAndSanitizedData('phone2', 'Phone number', 9, 15, 'phone', true);
	}

	addErrorAndSanitizedData('customerNote', '', 0, 254, 'string', false);
	addErrorAndSanitizedData('paymentMethod', 'Payment mode field', 2, 50, 'string', true);


	return {
		sanitizedData,
		errors,
		isValid: isEmpty(errors)
	}
};

export default validateAndSanitizeCheckoutForm;

