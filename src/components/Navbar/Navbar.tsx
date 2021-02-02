import { Link } from 'gatsby'
import React, { Component } from 'react'
import { Button, Menu } from 'semantic-ui-react'
import LanguageSwitcher from '../language-switcher/language-switcher'
import navigateWithLocale, { getPathWithLocale } from '../navigateWithLocale'
import Logo from './../Logo/Logo'
import './navbar.less'

interface NavbarProps {
  t: any;
  location: any
  inverted: boolean
  mobile: boolean
}

interface NavbarState {
  menuFixed: boolean
  width: number
  isLoggedIn: boolean
  user: any
}

export default class Navbar extends Component<NavbarProps, NavbarState> {
  state = {
    menuFixed: false,
    width: 0,
    isLoggedIn: false,
    user: null,
  }

  componentDidMount = async () => {
  }

  handleNavigate = (e, { name }) => navigateWithLocale(name)

  render() {
    const { location, inverted, mobile, t } = this.props

    return (
      <React.Fragment>
        {!mobile && (
          <Menu.Item className="menu-item-logo" name="/" link onClick={this.handleNavigate}>
            <Logo />
          </Menu.Item>
        )}
        <Menu.Item
          name="/filtersystem"
          content="Das Filtersystem"
          link
          active={location.pathname === '/filtersystem'}
          onClick={this.handleNavigate}
        ></Menu.Item>
        <Menu.Item
          name="/spenden"
          content="Spenden"
          link
          active={location.pathname === '/spenden'}
          onClick={this.handleNavigate}
        ></Menu.Item>
        <Menu.Item
          name="/team"
          content="Team"
          link
          active={location.pathname === '/team'}
          onClick={this.handleNavigate}
        ></Menu.Item>
        <Menu.Item
          name="/projekte"
          content="Projekte"
          link
          active={location.pathname === '/projekte'}
          onClick={this.handleNavigate}
        ></Menu.Item>
        <Menu.Item
          name="/blog"
          content="Blog"
          link
          active={location.pathname === '/blog'}
          onClick={this.handleNavigate}
        ></Menu.Item>
        <Menu.Item
          name="/shop"
          content="Shop"
          link
          active={location.pathname === '/shop'}
          onClick={this.handleNavigate}
        ></Menu.Item>
        {!mobile && (
          <Menu.Menu position="right">
            <Menu.Item>
              <Link to={getPathWithLocale('/book-call')}>
                <Button
                  className="shadow hover-animate rounded"
                  primary={!inverted}
                  inverted={inverted}
                  size="small"
                >
                  {t('spenden-button-call2action')}
                </Button>
              </Link>
            </Menu.Item>
            <LanguageSwitcher t={t} mobile={mobile}></LanguageSwitcher>
          </Menu.Menu>
        )}
        {mobile && (
          <React.Fragment>
            <LanguageSwitcher t={t} mobile={mobile}></LanguageSwitcher>
            <Menu.Item>
              <Link to={getPathWithLocale('/book-call')}>
                <Button primary={true} inverted={false} size="small">
                  {t('spenden-button-call2action')}
                </Button>
              </Link>
            </Menu.Item>
          </React.Fragment>
        )}
      </React.Fragment>
    )
  }
}
