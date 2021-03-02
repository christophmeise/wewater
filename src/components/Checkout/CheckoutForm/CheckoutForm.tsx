import { useMutation, useQuery } from "@apollo/client";
import { faTint } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Trans } from 'gatsby-plugin-react-i18next';
import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Grid, GridColumn, Header } from "semantic-ui-react";
import CHECKOUT_MUTATION from "../../../mutations/checkout";
import GET_CART from "../../../queries/get-cart";
import { createCheckoutData, getFormattedCart } from "../../../utils/functions";
import validateAndSanitizeCheckoutForm from "../../../validator/checkout";
import { AppContext } from "../../context/AppContext";
import Billing from "../Billing/Billing";
import CheckoutError from "../CheckoutError/CheckoutError";
import OrderSuccess from "../OrderSuccess/OrderSuccess";
import PaymentModes from "../PaymentModes/PaymentModes";
import YourOrder from "../YourOrder/YourOrder";

const CheckoutForm = () => {
  const initialState = {
    firstName: '',
    lastName: '',
    company: '',
    country: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    postcode: '',
    phone: '',
    email: '',
    createAccount: false,
    username: '',
    password: '',
    customerNote: '',
    paymentMethod: '',
    errors: null
  };

  // Use this for testing purposes, so you dont have to fill the checkout form over an over again.
  // const initialState = {
  //   firstName: "Imran",
  //   lastName: "Sayed",
  //   address1: "109 Hills Road Valley",
  //   address2: "Station Road",
  //   city: "Pune",
  //   state: "Maharastra",
  //   country: "IN",
  //   postcode: "400298",
  //   phone: "9959338989",
  //   email: "codeytek.academy@gmail.com",
  //   company: "Tech",
  //   createAccount: false,
  // username: '',
  // password: '',
  // customerNote: "My Order notes",
  //   paymentMethod: "cod",
  //   errors: null,
  // };

  const [cart, setCart]: any = useContext(AppContext);
  const [input, setInput] = useState(initialState);
  const [orderData, setOrderData] = useState(null);
  const [requestError, setRequestError] = useState(null);

  // Get Cart Data.
  const { data, refetch } = useQuery(GET_CART, {
    notifyOnNetworkStatusChange: true,
    onCompleted: () => {
      // console.warn( 'completed GET_CART' );

      // Update cart in the localStorage.
      const updatedCart = getFormattedCart(data);
      localStorage.setItem("woo-next-cart", JSON.stringify(updatedCart));

      // Update cart data in React Context.
      setCart(updatedCart);
    },
  });

  // Checkout or CreateOrder Mutation.
  const [
    checkout,
    { data: checkoutResponse, loading: checkoutLoading },
  ] = useMutation(CHECKOUT_MUTATION, {
    variables: {
      input: orderData,
    },
    onCompleted: () => {
      // console.warn( 'completed CHECKOUT_MUTATION' );
      refetch();
    },
    onError: (error) => {
      if (error) {
        setRequestError(error.graphQLErrors[0].message);
      }
    },
  });

  /*
   * Handle form submit.
   *
   * @param {Object} event Event Object.
   *
   * @return {void}
   */
  const handleFormSubmit = (event) => {
    event.preventDefault();
    const result = validateAndSanitizeCheckoutForm(input);
    if (!result.isValid) {
      setInput({ ...input, errors: result.errors });
      return;
    }
    const checkOutData = createCheckoutData(input);
    setOrderData(checkOutData);
    setRequestError(null);
  };

  /*
   * Handle onchange input.
   *
   * @param {Object} event Event Object.
   *
   * @return {void}
   */
  const handleOnChange = (event) => {
    if ("createAccount" === event.target.name) {
      const newState = { ...input, [event.target.name]: !input.createAccount };
      setInput(newState);
    } else {
      const newState = { ...input, [event.target.name]: event.target.value };
      setInput(newState);
    }
  };

  useEffect(() => {
    if (null !== orderData) {
      // Call the checkout mutation when the value for orderData changes/updates.
      /* eslint-disable */
      checkout();
    }
  }, [orderData]);

  return (
    <>
      <Header
        data-sal="slide-up"
        data-sal-delay="0"
        data-sal-duration="300"
        data-sal-easing="ease"
        textAlign='left'
        className="global-flex-column global-no-margin"
      >
        <h3 className={`global-subtitle text-primary`}><Trans>Nur noch wenige Schritte</Trans></h3>
        <h2 className="global-headline"><Trans>Bestellung abschließen</Trans></h2>
      </Header>
      {cart ? (
        <Form onSubmit={handleFormSubmit} className="woo-next-checkout-form">
          <Grid columns="2" stackable>
            <GridColumn>
              <h4 className="mb-4"><Trans>Bestelldetails</Trans></h4>
              <Billing input={input} handleOnChange={handleOnChange} />
            </GridColumn>
            <GridColumn>
              <h4 className="mb-4"><Trans>Dein Warenkorb</Trans></h4>
              <YourOrder cart={cart} />
            </GridColumn>
          </Grid>
          <PaymentModes input={input} handleOnChange={handleOnChange} />
          <Button primary className="rounded">
            <FontAwesomeIcon icon={faTint} style={{ opacity: '1', margin: '0em 0.42857143em 0em -0.21428571em' }} />
            <Trans>Kostenpflichtig bestellen</Trans>
          </Button>

          {checkoutLoading && <p>Processing Order...</p>}
          {requestError && <CheckoutError requestError={requestError} />}
        </Form>
      ) : (
          ""
        )
      }

      {/*Show message if Order Success*/}
      <OrderSuccess response={checkoutResponse} />
    </>
  );
};

export default CheckoutForm;
