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
            id="first-name"
            autoComplete="given-name"
          />
          <Error errors={input.errors} fieldName={"fname"} />
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
            id="last-name"
            autoComplete="family-name"
          />
          <Error errors={input.errors} fieldName={"lname "} />
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
          autoComplete="country"
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
          autoComplete="address-line1"
        />
        <Error errors={input.errors} fieldName={"address-line1"} />
        <br />
        <br />
        <input
          type="text"
          onChange={handleOnChange}
          value={input.address2}
          name="address2"
          placeholder="Wohnung, Suite, Zimmer usw (optional)"
          className="form-control woo-next-checkout-input"
          id="address-2"
          autoComplete="address-line2"
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
          autoComplete="city"
        />
        <Error errors={input.errors} fieldName={"city"} />
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
          autoComplete="postal-code"
        />
        <Error errors={input.errors} fieldName={"postal"} />
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
            id="phone"
            autoComplete="tel"
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
            id="email"
            autoComplete="email"
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
      <Form.Field>
        <div className="ui checkbox">
          <input type="checkbox" name="shipToDifferentAddress" onChange={handleOnChange} />
          <label><Trans>Abweichende Lieferadresse</Trans></label>
        </div>
      </Form.Field>

      {input.shipToDifferentAddress === 'true' ?
        <>
          <Form.Group widths='equal'>
            <Form.Field>
              <label htmlFor="first-name2">
                <Trans>Vorname</Trans>
                <abbr className="required" title="required">
                  *
              </abbr>
              </label>
              <input
                onChange={handleOnChange}
                value={input.firstName2}
                type="text"
                name="firstName2"
                id="first-name2"
                autoComplete="given-name"
              />
              <Error errors={input.errors} fieldName={"fname2"} />
            </Form.Field>
            <Form.Field>
              <label htmlFor="last-name2">
                <Trans>Nachname</Trans>
                <abbr className="required" title="required">
                  *
              </abbr>
              </label>
              <input
                onChange={handleOnChange}
                value={input.lastName2}
                type="text"
                name="lastName2"
                id="last-name2"
                autoComplete="family-name"
              />
              <Error errors={input.errors} fieldName={"lname2 "} />
            </Form.Field>

          </Form.Group>
          <Form.Field>
            <label htmlFor="company-name"><Trans>Firma</Trans></label>
            <input
              onChange={handleOnChange}
              value={input.company2}
              type="text"
              name="company2"
              id="company-name2"
            />
            <Error errors={input.errors} fieldName={"company2"} />
          </Form.Field>
          <Form.Field>
            <label htmlFor="country-select2">
              <Trans>Land / Region</Trans>
              <abbr className="required" title="required">
                *
            </abbr>
            </label>
            <select
              onChange={handleOnChange}
              value={input.country2}
              name="country2"
              id="country-select2"
              autoComplete="country"
            >
              <option value="">Bitte wählen...</option>
              {countryList.length &&
                countryList.map((country, index) => (
                  <option key={`${country}-${index}`} value={country.countryCode}>
                    {country.countryName}
                  </option>
                ))}
            </select>
            <Error errors={input.errors} fieldName={"country2"} />
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
              value={input.address12}
              name="address12"
              placeholder="Straßenname und Hausnummer"
              id="street-address"
              autoComplete="address-line12"
            />
            <Error errors={input.errors} fieldName={"address-line12"} />
            <br />
            <br />
            <input
              type="text"
              onChange={handleOnChange}
              value={input.address22}
              name="address22"
              placeholder="Wohnung, Suite, Zimmer usw (optional)"
              id="address-22"
              autoComplete="address-line22"
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
              value={input.city2}
              type="text"
              name="city2"
              id="city2"
              autoComplete="city"
            />
            <Error errors={input.errors} fieldName={"city2"} />
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
              value={input.postcode2}
              type="text"
              name="postcode2"
              id="post-code2"
              autoComplete="postal-code"
            />
            <Error errors={input.errors} fieldName={"postal2"} />
          </Form.Field>
          <Form.Field>
            <label htmlFor="phone">
              <Trans>Telefon</Trans>
              <abbr className="required" title="required">
                *
              </abbr>
            </label>
            <input
              onChange={handleOnChange}
              value={input.phone2}
              type="text"
              name="phone2"
              id="phone2"
              autoComplete="tel"
            />
            <Error errors={input.errors} fieldName={"phone2"} />
          </Form.Field>
        </> : ''
      }
    </React.Fragment >
  );
};

export default Billing;
