import { Trans } from 'gatsby-plugin-react-i18next';
import React from "react";
import { Form } from 'semantic-ui-react';
import countryList from "../country-list";
import Error from '../Error/Error';

const Billing = ({ input, handleOnChange }) => {

  return (
    <React.Fragment>
      <Form.Group widths='equal'>
        <Form.Field>
          <label htmlFor="first-name">
            <Trans>Vorname</Trans>
            <abbr className="required" title="required">
              *
              </abbr>
          </label>
          <input
            onChange={handleOnChange}
            value={input.firstName}
            type="text"
            name="firstName"
            className="form-control woo-next-checkout-input"
            id="first-name"
          />
          <Error errors={input.errors} fieldName={"firstName"} />
        </Form.Field>
        <Form.Field>
          <label htmlFor="last-name">
            <Trans>Nachname</Trans>
            <abbr className="required" title="required">
              *
              </abbr>
          </label>
          <input
            onChange={handleOnChange}
            value={input.lastName}
            type="text"
            name="lastName"
            className="form-control woo-next-checkout-input"
            id="last-name"
          />
          <Error errors={input.errors} fieldName={"lastName"} />
        </Form.Field>

      </Form.Group>
      <Form.Field>
        <label htmlFor="company-name"><Trans>Firma</Trans></label>
        <input
          onChange={handleOnChange}
          value={input.company}
          type="text"
          name="company"
          className="form-control woo-next-checkout-input"
          id="company-name"
        />
        <Error errors={input.errors} fieldName={"company"} />
      </Form.Field>
      <Form.Field>
        <label htmlFor="country-select">
          <Trans>Land / Region</Trans>
          <abbr className="required" title="required">
            *
            </abbr>
        </label>
        <select
          onChange={handleOnChange}
          value={input.country}
          name="country"
          className="form-control woo-next-checkout-input"
          id="country-select"
        >
          <option value="">Bitte wählen...</option>
          {countryList.length &&
            countryList.map((country, index) => (
              <option key={`${country}-${index}`} value={country.countryCode}>
                {country.countryName}
              </option>
            ))}
        </select>
        <Error errors={input.errors} fieldName={"country"} />
      </Form.Field>
      <Form.Field>
        <label htmlFor="street-address">
          <Trans>Straße</Trans>
          <abbr className="required" title="required">
            *
            </abbr>
        </label>
        <input
          type="text"
          onChange={handleOnChange}
          value={input.address1}
          name="address1"
          placeholder="Straßenname und Hausnummer"
          className="form-control woo-next-checkout-input"
          id="street-address"
        />
        <Error errors={input.errors} fieldName={"address1"} />
        <br />
        <input
          type="text"
          onChange={handleOnChange}
          value={input.address2}
          name="address2"
          placeholder="Wohnung, Suite, Zimmer usw (optional)"
          className="form-control woo-next-checkout-input"
          id="address-2"
        />
      </Form.Field>
      <Form.Field>
        <label htmlFor="city">
          <Trans>Stadt</Trans>
          <abbr className="required" title="required">
            *
            </abbr>
        </label>
        <input
          onChange={handleOnChange}
          value={input.city}
          type="text"
          name="city"
          className="form-control woo-next-checkout-input"
          id="city"
        />
        <Error errors={input.errors} fieldName={"city"} />
      </Form.Field>
      <Form.Field>
        <label htmlFor="state">
          <Trans>Bundesland/Staat</Trans>
          <abbr className="required" title="required">
            *
            </abbr>
        </label>
        <input
          onChange={handleOnChange}
          value={input.state}
          type="text"
          name="state"
          className="form-control woo-next-checkout-input"
          id="state"
        />
        <Error errors={input.errors} fieldName={"state"} />
      </Form.Field>
      <Form.Field>
        <label htmlFor="post-code">
          <Trans>Postleitzahl</Trans>
          <abbr className="required" title="required">
            *
            </abbr>
        </label>
        <input
          onChange={handleOnChange}
          value={input.postcode}
          type="text"
          name="postcode"
          className="form-control woo-next-checkout-input"
          id="post-code"
        />
        <Error errors={input.errors} fieldName={"postcode"} />
      </Form.Field>
      <Form.Group widths='equal'>
        <Form.Field>
          <label htmlFor="phone">
            <Trans>Telefon</Trans>
            <abbr className="required" title="required">
              *
              </abbr>
          </label>
          <input
            onChange={handleOnChange}
            value={input.phone}
            type="text"
            name="phone"
            className="form-control woo-next-checkout-input"
            id="phone"
          />
          <Error errors={input.errors} fieldName={"phone"} />
        </Form.Field>
        <Form.Field>
          <label htmlFor="email">
            <Trans>Email</Trans>
            <abbr className="required" title="required">
              *
              </abbr>
          </label>
          <input
            onChange={handleOnChange}
            value={input.email}
            type="email"
            name="email"
            className="form-control woo-next-checkout-input"
            id="email"
          />
          <Error errors={input.errors} fieldName={"email"} />
        </Form.Field>
      </Form.Group>

      <h4 className="mt-4 mb-4"><Trans>Weitere Informationen</Trans></h4>
      <Form.Field>
        <label htmlFor="order-notes"><Trans>Bestellhinweise</Trans></label>
        <textarea onChange={handleOnChange} defaultValue={input.customerNote} name="customerNote"
          placeholder="Anmerkungen zu deiner Bestellung, z.B. besondere Hinweise für die Lieferung"
          className="form-control woo-next-checkout-textarea" id="order-notes" rows={4} />
        <Error errors={input.errors} fieldName={'customerNote'} />
      </Form.Field>
    </React.Fragment >
  );
};

export default Billing;
