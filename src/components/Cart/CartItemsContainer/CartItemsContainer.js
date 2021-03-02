import { useMutation, useQuery } from "@apollo/client";
import Link from "gatsby-link";
import { Trans } from 'gatsby-plugin-react-i18next';
import React, { useContext, useState } from "react";
import { Button, Grid, GridColumn, Header } from "semantic-ui-react";
import { v4 } from "uuid";
import CLEAR_CART_MUTATION from "../../../mutations/clear-cart";
import UPDATE_CART from "../../../mutations/update-cart";
import GET_CART from "../../../queries/get-cart";
import { getFormattedCart, getUpdatedItems } from "../../../utils/functions";
import { AppContext } from "../../context/AppContext";
import CartItem from "../CartItem/CartItem";


const CartItemsContainer = () => {
  const [cart, setCart] = useContext(AppContext);
  const [requestError, setRequestError] = useState(null);

  // Get Cart Data.
  const { data, refetch } = useQuery(GET_CART, {
    notifyOnNetworkStatusChange: true,
    onCompleted: () => {
      // console.warn( 'completed GET_CART', data );

      // Update cart in the localStorage.
      const updatedCart = getFormattedCart(data);
      localStorage.setItem("woo-next-cart", JSON.stringify(updatedCart));

      // Update cart data in React Context.
      setCart(updatedCart);
    },
  });

  // Update Cart Mutation.
  const [updateCart, { loading: updateCartProcessing }] = useMutation(
    UPDATE_CART,
    {
      onCompleted: () => {
        refetch();
      },
      onError: (error) => {
        if (error) {
          setRequestError(error.graphQLErrors[0].message);
        }
      },
    }
  );

  // Update Cart Mutation.
  const [clearCart, { loading: clearCartProcessing }] = useMutation(
    CLEAR_CART_MUTATION,
    {
      onCompleted: () => {
        refetch();
      },
      onError: (error) => {
        if (error) {
          setRequestError(error.graphQLErrors[0].message);
        }
      },
    }
  );

  /*
   * Handle remove product click.
   *
   * @param {Object} event event
   * @param {Integer} Product Id.
   *
   * @return {void}
   */
  const handleRemoveProductClick = (event, cartKey, products) => {
    event.stopPropagation();
    if (products.length) {
      // By passing the newQty to 0 in updateCart Mutation, it will remove the item.
      const newQty = 0;
      const updatedItems = getUpdatedItems(products, newQty, cartKey);

      updateCart({
        variables: {
          input: {
            clientMutationId: v4(),
            items: updatedItems,
          },
        },
      });
    }
  };

  // Clear the entire cart.
  const handleClearCart = (event) => {
    event.stopPropagation();

    if (clearCartProcessing) {
      return;
    }

    clearCart({
      variables: {
        input: {
          clientMutationId: v4(),
          all: true,
        },
      },
    });
  };

  return (
    <div className="content-wrap-cart">
      {cart ? (
        <div>
          <Header
            data-sal="slide-up"
            data-sal-delay="0"
            data-sal-duration="300"
            data-sal-easing="ease"
            textAlign='left'
            className="global-flex-column global-no-margin"
          >
            <h3 className={`global-subtitle text-primary`}><Trans>Überprüfe deine Bestellung</Trans></h3>
            <h2 className="global-headline"><Trans>Warenkorb</Trans></h2>
          </Header>

          <Grid columns="2">
            <GridColumn width="10">
              <Grid>
                {cart.products.length &&
                  cart.products.map((item) => (
                    <CartItem
                      key={item.productId}
                      item={item}
                      updateCartProcessing={updateCartProcessing}
                      products={cart.products}
                      handleRemoveProductClick={handleRemoveProductClick}
                      updateCart={updateCart}
                    />
                  ))}
              </Grid>
              <div>
                <Button primary basic onClick={(event) => handleClearCart(event)} disabled={clearCartProcessing} className="shadow rounded hover-animate">
                  <Button.Content><Trans>Warenkorb leeren</Trans></Button.Content>
                </Button>
                {clearCartProcessing ? <p><Trans>Leere Warenkorb...</Trans></p> : ""}
              </div>

              {/* Display Errors if any */}
              {requestError ? (
                <div className="mt-5 row woo-next-cart-total-container">
                  {" "}
                  {requestError}{" "}
                </div>
              ) : (
                  ""
                )}
            </GridColumn>
            <GridColumn width="6">
              <div className="woo-next-cart-total-container col-md-4">
                <h3><Trans>Warenkorb-Summe</Trans></h3>
                <p><Trans>Zwischensumme</Trans></p>
                <p className="font-primary">
                  {"string" !== typeof cart.subtotal
                    ? cart.subtotal.toFixed(2)
                    : cart.subtotal}
                </p>
                <p><Trans>Versand</Trans></p>
                <p className="font-primary">
                  {"string" !== typeof cart?.shippingTotal
                    ? cart.shippingTotal?.toFixed(2)
                    : cart.shippingTotal}
                </p>
                <p><Trans>Gesamtsumme</Trans></p>
                <p className="font-primary">
                  {"string" !== typeof cart.totalProductsPrice
                    ? cart.totalProductsPrice.toFixed(2)
                    : cart.totalProductsPrice}
                </p>
                <Link to="/checkout">
                  <Button primary className="shadow rounded hover-animate">
                    <Button.Content> <Trans>Weiter zur Kasse</Trans></Button.Content>
                  </Button>
                </Link>
              </div>
            </GridColumn>
          </Grid>
        </div>
      ) : (
          <div className="container mt-5" style={{ height: '72vh' }}>
            <h2><Trans>Keine Produkte im Warenkorb</Trans></h2>
            <Link to="/shop">
              <button className="btn btn-secondary woo-next-large-black-btn">
                <span className="woo-next-cart-checkout-txt">
                  <Trans>Zurück zum Shop</Trans>
                </span>
                <i className="fas fa-long-arrow-alt-right" />
              </button>
            </Link>
          </div>
        )}
    </div>
  );
};

export default CartItemsContainer;
