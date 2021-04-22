import { useMutation, useQuery } from "@apollo/client";
import Link from "gatsby-link";
import { Trans } from 'gatsby-plugin-react-i18next';
import React, { useContext, useState } from "react";
import { Button, Container, Grid, GridColumn } from "semantic-ui-react";
import { v4 } from "uuid";
import APPLY_COUPON from "../../../mutations/apply_coupon";
import CLEAR_CART_MUTATION from "../../../mutations/clear-cart";
import UPDATE_CART from "../../../mutations/update-cart";
import GET_CART from "../../../queries/get-cart";
import { getFormattedCart, getUpdatedItems } from "../../../utils/functions";
import { AppContext } from "../../context/AppContext";
import CartItem from "../CartItem/CartItem";
import CouponInput from "./CouponInput";
import './style.less';

const CartItemsContainer = () => {
  const [cart, setCart]: any = useContext(AppContext);
  const [requestError, setRequestError] = useState(null);
  const [couponCode, setCouponCode] = useState('');

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

  const [applyCoupon, { loading: applyCouponProcessing }] = useMutation(
    APPLY_COUPON,
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

  const handleApplyCoupon = (coupon) => {
    // event.stopPropagation();

    if (applyCouponProcessing) {
      return;
    }

    applyCoupon({
      variables: {
        input: {
          clientMutationId: v4(),
          code: coupon
        },
      },
    });
  };

  return (
    <div className="cart-items-container">
      {cart ? (
        <>
          <Button primary basic compact size="small" onClick={(event) => handleClearCart(event)} disabled={clearCartProcessing} className={`shadow rounded hover-animate ${clearCartProcessing && 'loading'}`}>
            <Button.Content><Trans>Warenkorb leeren</Trans></Button.Content>
          </Button>
          <Grid columns="2" stackable>
            <GridColumn width="10">
              <Grid>
                {cart.products.length &&
                  cart.products.map((item, index) => (
                    <CartItem
                      key={item.productId + index}
                      item={item}
                      updateCartProcessing={updateCartProcessing}
                      products={cart.products}
                      handleRemoveProductClick={handleRemoveProductClick}
                      updateCart={updateCart}
                    />
                  ))}
              </Grid>
              <div>
                <CouponInput handleApplyCoupon={handleApplyCoupon} applyCouponProcessing={applyCouponProcessing} />
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
              <h3><Trans>Bestellungsübersicht</Trans></h3>

              <div className="cart-checkout-overview">
                <div className="cart-checkout-overview-row">
                  <p><Trans>Artikel:</Trans></p>
                  <p className="font-primary">
                    {"string" !== typeof cart.subtotal
                      ? cart.subtotal.toFixed(2)
                      : cart.subtotal}
                  </p>
                </div>
                <div className="cart-checkout-overview-row">
                  <p><Trans>Verpackung & Versand</Trans></p>
                  <p className="font-primary">
                    {"string" !== typeof cart?.shippingTotal
                      ? cart.shippingTotal?.toFixed(2)
                      : cart.shippingTotal}
                  </p>
                </div>
                {cart.appliedCoupons?.nodes?.length > 0 && cart.discountTotal != '€0,00' && (
                  <div className="cart-checkout-overview-row">
                    <p><Trans>Coupons</Trans></p>
                    <p className="font-primary">
                      - {cart.discountTotal}
                    </p>
                  </div>
                )}
              </div>


              <div className="cart-checkout-overview-row">
                <h4><Trans>Gesamtbetrag</Trans></h4>
                <h4 className="font-primary">
                  {"string" !== typeof cart.totalProductsPrice
                    ? cart.totalProductsPrice.toFixed(2)
                    : cart.totalProductsPrice}
                </h4>
              </div>
              <p><Trans>Oben genannte Preise verstehen sich inklusive Mehrwertsteuer.</Trans></p>
              <div className="cart-checkout-overview-row-button">
                <Link to="/checkout">
                  <Button primary size="large" className="shadow rounded hover-animate">
                    <Button.Content> <Trans>Zur Kasse gehen</Trans></Button.Content>
                  </Button>
                </Link>
              </div>
            </GridColumn>
          </Grid>
        </>
      ) : (
        <Container>
          <h2><Trans>Keine Produkte im Warenkorb</Trans></h2>
          <Link to="/shop">
            <Button primary basic className="shadow rounded hover-animate">
              <Button.Content><Trans>Zurück zum Shop</Trans></Button.Content>
            </Button>
          </Link>
        </Container>
      )}
    </div>
  );
};

export default CartItemsContainer;
