import arrowRight from "@iconify/icons-fa-solid/arrow-right";
import { Icon } from "@iconify/react";
import { Link } from "gatsby";
import React from "react";
import { Trans } from "react-i18next";
import { Button } from "semantic-ui-react";
import "./shop-water-donation.less";
import "./shop.less";

export default class ShopWaterDonation extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      selected: 25,
    };
  }

  render() {
    const { inverted, t, language } = this.props;

    const state = this.state;

    return (
      <div>
        <h3 className="shop-h3 text-shadow">
          <Trans>Geschenkidee</Trans>
        </h3>
        <h1
          className={`header-overlay-headline ${
            inverted ? "header-overlay-headline-inverted" : ""
          }`}
          style={{ marginBottom: "1.5rem" }}
        >
          <Trans>Individuelle Wasserspende</Trans>
        </h1>
        <h2
          className={`header-overlay-subheadline ${
            inverted ? "header-overlay-subheadline-inverted" : ""
          }`}
          style={{ marginBottom: "1.5rem", marginTop: "0rem" }}
        >
          <Trans>
            Mit unserer Wasserspende hast du immer ein ideales Geschenk parat.
            Denn damit spendest du lebensnotwendiges Trinkwasser und widmest
            diese Wasserspende zeitgleich einem lieben Menschen.
          </Trans>
        </h2>
        <h4 className="shop-h4 text-shadow">
          <Trans>Spendenhöhe</Trans>
        </h4>
        <div className="shop-spenden-select">
          <div
            className={`shop-spenden-amount-selector ${
              state.selected === 10
                ? "shop-spenden-amount-selector-selected"
                : ""
            }`}
            onClick={() => this.setState({ selected: 10 })}
          >
            10€
          </div>
          <div
            className={`shop-spenden-amount-selector ${
              state.selected === 25
                ? "shop-spenden-amount-selector-selected"
                : ""
            }`}
            onClick={() => this.setState({ selected: 25 })}
          >
            25€
          </div>
          <div
            className={`shop-spenden-amount-selector ${
              state.selected === 50
                ? "shop-spenden-amount-selector-selected"
                : ""
            }`}
            onClick={() => this.setState({ selected: 50 })}
          >
            50€
          </div>
          <div
            className={`shop-spenden-amount-selector ${
              state.selected === 100
                ? "shop-spenden-amount-selector-selected"
                : ""
            }`}
            onClick={() => this.setState({ selected: 100 })}
          >
            100€
          </div>
          <div
            className={`shop-spenden-amount-selector ${
              state.selected === 200
                ? "shop-spenden-amount-selector-selected"
                : ""
            }`}
            onClick={() => this.setState({ selected: 200 })}
          >
            200€
          </div>
        </div>
        <a href={getWasserspendeLinkByAmount(state.selected)}>
          <Button primary size="large" basic inverted className="rounded">
            {t("Wasserspende in Euro", { count: state.selected })}
            {/* <Trans>Wasserspende für {state.selected.toString()}€ schenken</Trans> */}
            <Icon
              icon={arrowRight}
              style={{
                opacity: "1",
                margin: "0em -0.21428571em 0em 0.42857143em",
              }}
            />
          </Button>
        </a>
      </div>
    );
  }
}

const getWasserspendeLinkByAmount = (amount: number) => {
  return (
    "https://shop.wewater.org/products/wasserspende-uber-" + amount + "-euro"
  );
};
