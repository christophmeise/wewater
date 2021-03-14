import tintIcon from '@iconify/icons-fa-solid/tint';
import { Icon as IconifyIcon } from '@iconify/react';
import { Link } from 'gatsby-plugin-react-i18next';
import React, { Component } from 'react';
import { Button, Menu } from 'semantic-ui-react';
import CartIcon from '../Cart/CartIcon/CartIcon';
import LanguageSwitcher from '../language-switcher/language-switcher';
import Logo from '../Logo/Logo';
import { useTranslationHOC } from '../useTranslationHOC/useTranslationHOC';
import './navbar.less';

interface NavbarProps {
  navigate: any;
  language: string;
  t: any;
  location: any
  mobile: boolean
  onHoverMenuItem?: any;
}

interface NavbarState {
  menuFixed: boolean
  width: number
  isLoggedIn: boolean
  user: any
}

class Navbar extends Component<NavbarProps, NavbarState> {
  state = {
    menuFixed: false,
    width: 0,
    isLoggedIn: false,
    user: null,
  }

  render() {
    const { location, mobile, t, onHoverMenuItem, navigate, language } = this.props
    return (
      <React.Fragment>
        {!mobile && (
          <>
            <Menu.Item className="menu-item-logo" link onClick={navigate.bind(this, '/')}>
              <Logo />
            </Menu.Item>
            <Menu.Item
              name="/filtersystem"
              content={t('Filtersysteme')}
              link
              active={location.pathname === '/filtersystem'}
              onMouseEnter={onHoverMenuItem?.bind(this, 'Filtersysteme')}
              data-nav='Filtersysteme'
              className="navlinkdropdown"
            ></Menu.Item>
          </>
        )}
        {mobile && (
          <Menu.Item
            name="/filtersystem"
            content={t('Filtersysteme')}
            link
            active={location.pathname === '/filtersystem'}
            onClick={navigate.bind(this, '/filtersystem')}
          ></Menu.Item>
        )}
        <Menu.Item
          name="/spenden"
          content={t('Spenden')}
          link
          active={location.pathname === '/spenden'}
          onClick={navigate.bind(this, '/spenden')}
        ></Menu.Item>
        <Menu.Item
          name="/team"
          content={t('Team')}
          link
          active={location.pathname === '/team'}
          onClick={navigate.bind(this, '/team')}
        ></Menu.Item>
        <Menu.Item
          name="/projekte"
          content={t('Projekte')}
          link
          active={location.pathname === '/projekte'}
          onClick={navigate.bind(this, '/projekte')}
        ></Menu.Item>
        <Menu.Item
          name="/blog"
          content={t('Blog')}
          link
          active={location.pathname === '/blog'}
          onClick={navigate.bind(this, '/blog')}
        ></Menu.Item>
        <Menu.Item
          name="/shop"
          content={t('Shop')}
          link
          active={location.pathname === '/shop'}
          onClick={navigate.bind(this, '/shop')}
        ></Menu.Item>
        {!mobile && (
          <Menu.Menu position="right">
            <Menu.Item
              active={false}
            >
              <CartIcon t={t}></CartIcon>
            </Menu.Item>
            <Menu.Item>
              <Link to={'/spenden'} language={language}>
                <Button
                  className="shadow hover-animate rounded"
                  primary
                  size="small"
                >
                  {t('Ich will helfen!')}
                </Button>
              </Link>
            </Menu.Item>
            <LanguageSwitcher mobile={mobile}></LanguageSwitcher>
          </Menu.Menu>
        )}
        {mobile && (
          <React.Fragment>
            <Menu.Item
              name="/warenkorb"
              content={t('Warenkorb')}
              link
              active={location.pathname === '/warenkorb'}
              onClick={navigate.bind(this, '/warenkorb')}>
            </Menu.Item>
            <LanguageSwitcher mobile={mobile}></LanguageSwitcher>
            <Menu.Item>
              <Link to={'/spenden'} language={language}>
                <Button primary inverted={false} size="small" className="rounded" fluid>
                  <IconifyIcon icon={tintIcon} style={{ opacity: '1', margin: '0em 0.42857143em 0em -0.21428571em' }} />
                  {t('Ich will helfen!')}
                </Button>
              </Link>
            </Menu.Item>
          </React.Fragment>
        )}
      </React.Fragment>
    )
  }
}

export default useTranslationHOC(Navbar);