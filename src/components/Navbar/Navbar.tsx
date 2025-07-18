import tintIcon from "@iconify/icons-fa-solid/tint";
import { Icon as IconifyIcon } from "@iconify/react";
import { Link } from "gatsby-plugin-react-i18next";
import React, { Component } from "react";
import { Button, Menu } from "semantic-ui-react";
import LanguageSwitcher from "../language-switcher/language-switcher";
import Logo from "../Logo/Logo";
import { useTranslationHOC } from "../useTranslationHOC/useTranslationHOC";
import "./navbar.less";

interface NavbarProps {
  navigate: any;
  language: string;
  t: any;
  location: any;
  mobile: boolean;
  onHoverMenuItem?: any;
  translations: any;
}

interface NavbarState {
  menuFixed: boolean;
  width: number;
  isLoggedIn: boolean;
  user: any;
}

class Navbar extends Component<NavbarProps, NavbarState> {
  state = {
    menuFixed: false,
    width: 0,
    isLoggedIn: false,
    user: null,
  };

  render() {
    const {
      location,
      mobile,
      t,
      onHoverMenuItem,
      navigate,
      language,
      translations,
    } = this.props;
    return (
      <React.Fragment>
        {!mobile && (
          <>
            <Menu.Item
              className="menu-item-logo"
              link
              onClick={navigate.bind(this, "/")}
            >
              <Logo />
            </Menu.Item>
            <Menu.Item
              name="/filtersystem"
              content={t("Filtersysteme")}
              link
              active={location.pathname === "/filtersystem"}
              onClick={navigate.bind(this, "/filtersystem")}
              onMouseEnter={onHoverMenuItem?.bind(this, "Filtersysteme")}
              data-nav="Filtersysteme"
              className="navlinkdropdown"
            ></Menu.Item>
          </>
        )}
        {mobile && (
          <>
            <Menu.Item
              name="/filtersystem"
              content={t("Filtersysteme")}
              link
              active={location.pathname === "/filtersystem"}
              onClick={navigate.bind(this, "/filtersystem")}
            ></Menu.Item>
            <Menu.Item
              className="menu-level-2"
              name="/filtersysteme/aqqabag"
              link
              active={location.pathname === "/filtersysteme/aqqabag"}
              onClick={navigate.bind(this, "/filtersysteme/aqqabag")}
            >
              <span>{t("AQQAbag")}</span>
            </Menu.Item>
            <Menu.Item
              className="menu-level-2"
              name="/filtersysteme/aqqacube"
              link
              active={location.pathname === "/filtersysteme/aqqacube"}
              onClick={navigate.bind(this, "/filtersysteme/aqqacube")}
            >
              <span>{t("AQQAcube")}</span>
            </Menu.Item>
            <Menu.Item
              className="menu-level-2"
              name="/filtersysteme/aqqasystem"
              link
              active={location.pathname === "/filtersysteme/aqqasystem"}
              onClick={navigate.bind(this, "/filtersysteme/aqqasystem")}
            >
              <span>{t("AQQAsystem")}</span>
            </Menu.Item>
            <Menu.Item
              className="menu-level-2"
              name="/filtersysteme/tutorials"
              link
              active={location.pathname === "/filtersysteme/tutorials"}
              onClick={navigate.bind(this, "/filtersysteme/tutorials")}
            >
              <span>{t("Zu den Tutorials")}</span>
            </Menu.Item>
          </>
        )}
        <Menu.Item
          name="/spenden"
          content={t("Spenden")}
          link
          active={location.pathname === "/spenden"}
          onClick={navigate.bind(this, "/spenden")}
        ></Menu.Item>
        <Menu.Item
          name="/team"
          content={t("Team")}
          link
          active={location.pathname === "/team"}
          onClick={navigate.bind(this, "/team")}
        ></Menu.Item>
        <Menu.Item
          name="/projekte"
          content={t("Projekte")}
          link
          active={location.pathname === "/projekte"}
          onClick={navigate.bind(this, "/projekte")}
        ></Menu.Item>
        <Menu.Item
          name="/blog"
          content={t("Blog")}
          link
          active={location.pathname === "/blog"}
          onClick={navigate.bind(this, "/blog")}
        ></Menu.Item>

        <a
          href="https://shop.wewater.org/"
          target="_blank"
          rel="noopener"
          style={{
            color: "#0d0c22",
          }}
        >
          <Menu.Item name="shop" link>
            {t("Shop")}
          </Menu.Item>
        </a>

        {!mobile && (
          <Menu.Menu position="right">
            <Menu.Item>
              <Link to={"/spenden"} language={language}>
                <Button
                  className="shadow hover-animate rounded"
                  primary
                  size="small"
                >
                  {t("Ich will helfen!")}
                </Button>
              </Link>
            </Menu.Item>
            <LanguageSwitcher
              mobile={mobile}
              t={t}
              translations={translations}
            ></LanguageSwitcher>
          </Menu.Menu>
        )}
        {mobile && (
          <React.Fragment>
            <LanguageSwitcher
              mobile={mobile}
              t={t}
              translations={translations}
            ></LanguageSwitcher>
            <Menu.Item>
              <Link to={"/spenden"} language={language}>
                <Button
                  primary
                  inverted={false}
                  size="small"
                  className="rounded"
                  fluid
                >
                  <IconifyIcon
                    icon={tintIcon}
                    style={{
                      opacity: "1",
                      margin: "0em 0.42857143em 0em -0.21428571em",
                    }}
                  />
                  {t("Ich will helfen!")}
                </Button>
              </Link>
            </Menu.Item>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default useTranslationHOC(Navbar);
