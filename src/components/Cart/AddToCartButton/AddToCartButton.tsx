import { useMutation, useQuery } from "@apollo/client";
import Link from "gatsby-link";
import { Trans } from 'gatsby-plugin-react-i18next';
import React, { useContext, useState } from "react";
import { Button } from "semantic-ui-react";
import { v4 } from "uuid";
import ADD_TO_CART from "../../../mutations/add-to-cart";
import GET_CART from "../../../queries/get-cart";
import { getFormattedCart } from "../../../utils/functions";
import { AppContext } from "../../context/AppContext";
import "./style.less";

const AddToCartButton = (props) => {
  const { product, variationId } = props;

  const productQtyInput: any = {
    clientMutationId: v4(), // Generate a unique id.
    productId: product?.databaseId
  };
  if (variationId != null) {
    productQtyInput.variationId = variationId;
  }

  /* eslint-disable */
  const [cart, setCart]: any = useContext(AppContext);
  const [showViewCart, setShowViewCart] = useState(false);
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
    }
  });

  // Add to Cart Mutation.
  const [
    addToCart,
    { data: addToCartRes, loading: addToCartLoading, error: addToCartError },
  ] = useMutation(ADD_TO_CART, {
    variables: {
      input: productQtyInput,
    },
    onCompleted: () => {
      // If error.
      if (addToCartError) {
        setRequestError(addToCartError.graphQLErrors[0]?.message);
      }

      // On Success:
      // 1. Make the GET_CART query to update the cart with new values in React context.
      refetch();

      // 2. Show View Cart Button
      setShowViewCart(true);
    },
    onError: (error) => {
      if (error) {
        setRequestError(error.graphQLErrors[0]?.message);
      }
    },
  });

  const handleAddToCartClick = () => {
    setRequestError(null);
    addToCart();
  };

  return (
    <div>
      <Button primary className="shadow rounded hover-animate" onClick={handleAddToCartClick}>
        <Button.Content><Trans>In den Warenkorb</Trans></Button.Content>
      </Button>
      {showViewCart ? (
        <Link to="/warenkorb">
          <Button secondary className="shadow rounded hover-animate">
            <Button.Content><Trans>Zum Warenkorb</Trans></Button.Content>
          </Button>
        </Link>
      ) : (
          ""
        )}
      {addToCartLoading ? (
        <p className="mt-2"><Trans>Füge zum Warenkorb hinzu...</Trans></p>
      ) : (
          <p className="mt-2" style={{ color: "transparent" }}>
            <Trans>Füge zum Warenkorb hinzu...</Trans>
          </p>
        )}
    </div>
  );
};

export default AddToCartButton;
