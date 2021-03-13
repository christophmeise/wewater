import React, { useState } from 'react';
import { Menu } from 'semantic-ui-react';
import Logo from '../Logo/Logo';
import './layout.less';

const MobileMenu = ({
    handleNavigate,
    handleToggle
}) => {

    const [opened, setOpened] = useState(false);

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
                onClick={($event) => handleNavigate('/')}
            >
                <Logo />
            </Menu.Item>
            <Menu.Item position="right" onClick={() => handleToggle()}>
                <div className={`burger-menu ${opened ? 'opened' : ''}`} onClick={() => setOpened(!opened)} aria-label="Main Menu">
                    <svg fillOpacity="1" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 100 100">
                        <path className="line line1" d="M 20,29.000046 H 80.00031 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058" />
                        <path className="line line2" d="M 20,50 H 80" />
                        <path className="line line3" d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942" />
                    </svg>
                </div>
            </Menu.Item>
        </Menu>
    )

}

export default MobileMenu;