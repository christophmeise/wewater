import { Link } from "gatsby-link";
import { Trans } from "gatsby-plugin-react-i18next";
import { isEmpty } from "lodash";
import React, { useContext } from "react";
import { Button } from "semantic-ui-react";
import { AppContext } from "../../context/AppContext";
import "./style.less";

const CartDropdown = ({ isDropdownOpen }) => {
  const [cart]: any = useContext(AppContext);

  if (null === cart || !Object.keys(cart).length) {
    return null;
  }

  const productsCount = cart.totalProductsCount ? cart.totalProductsCount : "";
  const totalPrice = cart.totalProductsPrice ? cart.totalProductsPrice : "";

  return (
    <div className={`shopping-cart ${isDropdownOpen ? "is-open" : ""}`}>
      <div className="shopping-cart-header">
        <div className="shopping-cart-total">
          <span className="lighter-text">
            <Trans>Summe</Trans>:{" "}
          </span>
          <span className="main-color-text"> {totalPrice}</span>
        </div>
      </div>
      <ul className="shopping-cart-items">
        {cart?.products.map((product, index) => (
          <li className="clearfix" key={product.productId + index}>
            {!isEmpty(product.image) ? (
              <figure>
                <img
                  src={product.image.sourceUrl}
                  alt={product.image.altText ? product.image.altText : ""}
                  style={{ height: "70px", width: "70px" }}
                />
              </figure>
            ) : null}
            <span className="item-name">{product.name}</span>
            <span className="item-price">{product.totalPrice}</span>
            <span className="item-quantity">
              <Trans>Menge</Trans>:{product.qty}
            </span>
          </li>
        ))}
      </ul>
      <Link to="/warenkorb">
        <Button primary fluid className="shadow rounded hover-animate">
          <Button.Content>
            <Trans>Zum Warenkorb</Trans>
          </Button.Content>
        </Button>
      </Link>
    </div>
  );
};

export default CartDropdown;
