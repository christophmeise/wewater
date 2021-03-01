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
  inverted: boolean
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

  componentDidMount = async () => {
  }

  handleNavigate = (e, { name }) => console.log('WIP')

  render() {
    const { location, inverted, mobile, t, onHoverMenuItem, navigate, language } = this.props
    return (
      <React.Fragment>
        {!mobile && (
          <Menu.Item className="menu-item-logo" link onClick={navigate.bind(this, '/')}>
            <Logo />
          </Menu.Item>
        )}
        <Menu.Item
          name="/filtersystem"
          content={t('Filtersysteme')}
          link
          active={location.pathname === '/filtersystem'}
          onMouseEnter={onHoverMenuItem?.bind(this, 'Filtersysteme')}
          data-nav='Filtersysteme'
          className="navlinkdropdown"
        ></Menu.Item>
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
        <Menu.Item
          active={false}
        >
          <CartIcon t={t}></CartIcon>
        </Menu.Item>
        {!mobile && (
          <Menu.Menu position="right">
            <Menu.Item>
              <Link to={'/spenden'} language={language}>
                <Button
                  className="shadow hover-animate rounded"
                  primary={!inverted}
                  inverted={inverted}
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
            <LanguageSwitcher mobile={mobile}></LanguageSwitcher>
            <Menu.Item>
              <Link to={'/spenden'} language={language}>
                <Button primary={true} inverted={false} size="small">
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