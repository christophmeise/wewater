import React from 'react';
import { Icon, Menu } from 'semantic-ui-react';
import Logo from '../Logo/Logo';
import './layout.less';

const MobileMenu = ({
    handleNavigate,
    handleToggle
}) => {

    return (
        <Menu
            className="responsive-mobile-container global-navbar-mobile-menu"
            fixed="top"
            size="large"
            borderless
        >
            <Menu.Item
                style={{ paddingBottom: '0', paddingTop: '0', alignSelf: 'center' }}
                link
                onClick={($event) => handleNavigate($event, '/')}
            >
                <Logo />
            </Menu.Item>
            <Menu.Item position="right" onClick={() => handleToggle()}>
                <Icon style={{ margin: '0' }} name="sidebar" />
            </Menu.Item>
        </Menu>
    )

}

export default MobileMenu;