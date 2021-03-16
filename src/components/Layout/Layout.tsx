import arrowSmallRight from '@iconify/icons-codicon/arrow-small-right';
import cube20Regular from '@iconify/icons-fluent/cube-20-regular';
import puzzleCube20Regular from '@iconify/icons-fluent/puzzle-cube-20-regular';
import bloodBag from '@iconify/icons-mdi/blood-bag';
import { Icon } from '@iconify/react';
import { Link } from 'gatsby-plugin-react-i18next';
import React, { Component } from 'react';
import 'semantic-ui-less/semantic.less';
import { Container, Menu } from 'semantic-ui-react';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import { useTranslationHOC } from '../useTranslationHOC/useTranslationHOC';
import './layout.less';
import MobileMenu from './MobileMenu';

interface Props {
    navigate: any;
    t?: any;
    language: string;
    children?: any;
    headerOverlay?: any;
}

class Layout extends Component<Props, any> {

    constructor(props) {
        super(props);
        this.state = {
            sections: ['Filtersysteme'],
            Filtersysteme: { width: 490, height: 400, x: 0, navwidth: 0 },
            sidebarOpened: false,
            location: {
                pathname: null,
            },
            xDown: null,
            yDown: null
        };
    }

    componentDidMount() {
        const isSSR = typeof window === 'undefined';
        if (!isSSR) {
            document.addEventListener('touchstart', this.handleTouchStart.bind(this), false);
            document.addEventListener('touchmove', this.handleTouchMove.bind(this), false);
            this.setState({ location: window.location });
            if (window.innerWidth > 767) {
                window.addEventListener('resize', this.calculatePopoverPosition.bind(this), false);
                this.calculatePopoverPosition();
            }
        }
    }

    componentWillUnmount() {
        if (typeof window !== 'undefined') {
            document.removeEventListener('touchstart', this.handleTouchStart);
            document.removeEventListener('touchmove', this.handleTouchMove);
            window.removeEventListener('resize', this.calculatePopoverPosition);
        }
    }

    getTouches(evt) {
        return evt.touches || // browser API
            evt.originalEvent.touches; // jQuery
    }

    handleTouchStart(evt) {
        const firstTouch = this.getTouches(evt)[0];
        this.setState({ xDown: firstTouch.clientX });
        this.setState({ yDown: firstTouch.clientY });
    };

    handleTouchMove(evt) {
        if (!this.state.xDown || !this.state.yDown) {
            return;
        }

        var xUp = evt.touches[0].clientX;
        var yUp = evt.touches[0].clientY;

        var xDiff = this.state.xDown - xUp;
        var yDiff = this.state.yDown - yUp;
        if (Math.abs(xDiff) > Math.abs(yDiff)) {/*most significant*/
            if (xDiff > 0) {
                /* left swipe */
            } else {
                /* right swipe */
            }
        } else {
            if (yDiff > 0) {
                this.setState({ sidebarOpened: false });
            } else {
                /* down swipe */
            }
        }
        /* reset values */
        this.setState({ xDown: null });
        this.setState({ yDown: null });
    };

    handleToggle = () => this.setState({ sidebarOpened: !this.state.sidebarOpened });
    handleSidebarHide = () => this.setState({ sidebarOpened: false });

    onHeaderMouseLeave() {
        const popoverEl = document.getElementById('popover');
        popoverEl.classList.remove('open');
    }

    calculatePopoverPosition = (): void => {
        if (window.innerWidth <= 768) {
            return;
        }
        const popoverEl = document.getElementById('popover')
        const arrowEl = document.getElementById('arrow');
        const navLinkEls = document.querySelectorAll('.navlinkdropdown');

        if (!arrowEl) {
            return;
        }

        const popoverLeft = popoverEl?.getBoundingClientRect()?.x;

        navLinkEls.forEach((navLink) => {
            const section = navLink.getAttribute('data-nav');
            const rect = navLink.getBoundingClientRect();

            this.setState({
                [section]: {
                    height: this.state[section].height,
                    width: this.state[section].width,
                    x: rect.left + (rect.width / 2) - popoverLeft,
                    navwidth: rect.width
                }
            });

            arrowEl.style.transform = `
                translateX(${this.state[section].x}px)
                rotate(45deg)`;
        }, this);
    }

    onHoverMenuItem = (section) => {
        const sectionEls = document.querySelectorAll('.section');
        const backgroundEl = document.getElementById('background');
        const popoverEl = document.getElementById('popover');
        const arrowEl = document.getElementById('arrow');
        const contentEl: any = document.querySelector('.popover-content');

        popoverEl.classList.add('open');
        sectionEls.forEach(el => el.classList.remove('section-active'));
        document.querySelector(`.section-${section}`).classList.add('section-active');

        arrowEl.style.transform = `
            translateX(${this.state[section].x}px)
            rotate(45deg)
        `;

        // Resize and position background
        backgroundEl.style.transform = `
            translateX(${this.state[section].x - this.state[section].navwidth / 2}px)
            scaleX(${this.state[section].width / this.state[section].width})
            scaleY(${this.state[section].height / this.state[section].height})
        `;

        // Resize and position content
        contentEl.style.width = this.state[section].width + 'px';
        contentEl.style.height = this.state[section].height + 'px';
        contentEl.style.transform = `translateX(${this.state[section].x - this.state[section].navwidth / 2}px)`;
    }

    render() {
        const { children, t, language, navigate } = this.props;
        const { sidebarOpened, location } = this.state;

        const isMobileBrowser = typeof window !== 'undefined' && window.innerWidth < 768;
        const isDesktopBrowser = typeof window !== 'undefined' && window.innerWidth >= 768;

        return (
            <React.Fragment>
                <MobileMenu sidebarOpened={this.state.sidebarOpened} handleToggle={this.handleToggle} handleNavigate={navigate}></MobileMenu>

                <div className="flex-container">
                    <Menu
                        className="mobile-menu responsive-mobile-container"
                        style={{
                            minHeight: sidebarOpened ? '100vh' : '0vh',
                            background: sidebarOpened ? '#FFFFFF' : 'rgba(255, 255, 255, 0.5)',
                        }}
                        vertical
                        visible="true"
                        width="wide"
                    >
                        {(typeof window === 'undefined' || isMobileBrowser) && (
                            <Navbar
                                location={location}
                                inverted={true}
                                mobile={true}
                                t={t}
                            />
                        )}
                    </Menu>

                    {(typeof window === 'undefined' || isDesktopBrowser) && (
                        <header id="header" onMouseLeave={this.onHeaderMouseLeave.bind(this)}>
                            <section className='responsive-desktop-container global-navbar'>
                                <Menu
                                    inverted={false}
                                    pointing={false}
                                    secondary={true}
                                    size="large"
                                    borderless
                                >
                                    <Container>
                                        <Navbar
                                            location={location}
                                            mobile={false}
                                            t={t}
                                            onHoverMenuItem={this.onHoverMenuItem.bind(this)}
                                        />
                                    </Container>
                                </Menu>
                            </section>
                            <Popover language={language}></Popover>
                        </header>
                    )}
                    <main role="main">
                        {children}
                        <Footer t={t} />
                    </main>
                </div>
            </React.Fragment >
        );
    }
}



const Popover = ({ language }) => {
    return (
        <div id="popover" className="nav-popover">
            <div className="popover-content">
                <section className="section section-Filtersysteme section-active">
                    <ul className="navlist-primary">
                        <li className="navlist-primary-entry">
                            <Link to={'/filtersystem'} language={language}>
                                <div className="navlist-menu-entry">
                                    <h4>Alle Filtersysteme <Icon className="icon-filtersysteme" icon={arrowSmallRight} color='#5ABEE6' /></h4>
                                    <p>Übersicht aller Entwicklungen</p>
                                </div>
                            </Link>
                        </li>
                        <li className="navlist-primary-entry">
                            <Link to={'/filtersysteme/tutorials'} language={language}>
                                <div className="navlist-menu-entry">
                                    <h4>Zu den Tutorials <Icon className="icon-filtersysteme" icon={arrowSmallRight} color='#5ABEE6' /></h4>
                                    <p>Wir erklären unsere Lösungen</p>
                                </div>
                            </Link>
                        </li>
                        <li className="navlist-primary-bag two-col">
                            <Link to={'/filtersysteme/aqqabag'} language={language}>
                                <div className="navlist-circle">
                                    <Icon icon={bloodBag} color='#FFFFFF' />
                                </div>
                                <div className="navlist-menu-entry">
                                    <h4>AQQAbag</h4>
                                    <p>Lösung für Einzelpersonen</p>
                                </div>
                            </Link>
                        </li>
                        <li className="navlist-primary-cube two-col">
                            <Link to={'/filtersysteme/aqqacube'} language={language}>
                                <div className="navlist-circle">
                                    <Icon icon={cube20Regular} color='#FFFFFF' />
                                </div>
                                <div className="navlist-menu-entry">
                                    <h4>AQQAcube</h4>
                                    <p>Sofortlösung für Lebensgemeinschaften</p>
                                </div>
                            </Link>
                        </li>
                        <li className="navlist-primary-system two-col">
                            <Link to={'/filtersysteme/aqqasystem'} language={language}>
                                <div className="navlist-circle">
                                    <Icon icon={puzzleCube20Regular} color='#FFFFFF' />
                                </div>
                                <div className="navlist-menu-entry">
                                    <h4>AQQAsystem</h4>
                                    <p>Lösung für den langfristigen Einsatz</p>
                                </div>
                            </Link>
                        </li>
                    </ul>
                </section>
            </div>
            <div id="background" className="background"></div>
            <div id="arrow" className="arrow"></div>
        </div>
    )
}

export default useTranslationHOC(Layout);