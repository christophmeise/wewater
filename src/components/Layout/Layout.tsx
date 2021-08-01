import arrowSmallRight from '@iconify/icons-codicon/arrow-small-right';
import cookieBite from '@iconify/icons-la/cookie-bite';
import { Icon } from '@iconify/react';
import { Link, Trans } from 'gatsby-plugin-react-i18next';
import React, { Component } from 'react';
import CookieConsent from 'react-cookie-consent';
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
    translations?: any;
}

class Layout extends Component<Props, any> {

    myRef: any;

    constructor(props) {
        super(props);
        this.myRef = React.createRef();
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
        if (typeof window !== 'undefined') {
            document.addEventListener('touchstart', this.handleTouchStart.bind(this), false);
            document.addEventListener('touchmove', this.handleTouchMove.bind(this), false);
            this.setState({ location: window.location });
            if (window.innerWidth > 767) {
                window.addEventListener('resize', this.calculatePopoverPosition.bind(this), false);
                this.calculatePopoverPosition();
            }
            document.body.addEventListener("scroll", this.handleScroll, { passive: true });
        }
    }

    componentWillUnmount() {
        if (typeof window !== 'undefined') {
            document.removeEventListener('touchstart', this.handleTouchStart);
            document.removeEventListener('touchmove', this.handleTouchMove);
            window.removeEventListener('resize', this.calculatePopoverPosition);
            document.body.removeEventListener("scroll", this.handleScroll);
        }
    }

    handleScroll() {
        var rootNode = document.documentElement,
            body = document.body,
            top = "scrollTop",
            height = "scrollHeight";

        var percentage =
            ((body[top]) /
                ((body[height]) - rootNode.clientHeight)) * 100;

        if (percentage > 10) {
            const acceptButton = document.getElementById('rcc-confirm-button')
            if (acceptButton) {
                document.getElementById('rcc-confirm-button').click();
            }
            document.body.removeEventListener("scroll", this.handleScroll);
        }
    }

    getTouches(evt) {
        return evt.touches ||
            evt.originalEvent.touches;
    }

    handleTouchStart(evt) {
        const firstTouch = this.getTouches(evt)[0];
        this.setState({ xDown: firstTouch.clientX });
        this.setState({ yDown: firstTouch.clientY });
    };

    handleTouchMove(evt) {
        if (!this.state?.sidebarOpened || !this.state.xDown || !this.state.yDown) {
            return;
        }

        var xUp = evt.touches[0].clientX;
        var yUp = evt.touches[0].clientY;

        var xDiff = this.state.xDown - xUp;
        var yDiff = this.state.yDown - yUp;
        if (!(Math.abs(xDiff) > Math.abs(yDiff))) {
            if (yDiff > 0) {
                this.setState({ sidebarOpened: false });
            }
        }
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
        const translations = this.props.translations;

        const isMobileBrowser = typeof window !== 'undefined' && window.innerWidth < 1024;
        const isDesktopBrowser = typeof window !== 'undefined' && window.innerWidth >= 1024;

        return (
            <React.Fragment>
                <MobileMenu sidebarOpened={this.state.sidebarOpened} handleToggle={this.handleToggle} handleNavigate={navigate}></MobileMenu>

                <div className="flex-container">
                    <Menu
                        className="mobile-menu responsive-mobile-or-tablet-container"
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
                                translations={translations}
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
                                            translations={translations}
                                        />
                                    </Container>
                                </Menu>
                            </section>
                            <Popover language={language}></Popover>
                        </header>
                    )}
                    <main role="main" ref={this.myRef}>
                        {children}
                        <CookieConsent
                            acceptOnScroll={true}
                            acceptOnScrollPercentage={50}
                            disableStyles={true}
                            location="bottom"
                            buttonText={t('Accept')}
                            declineButtonText={t('Decline')}
                            cookieName="gatsby-gdpr-google-analytics"
                            containerClasses="cookie-banner"
                            contentClasses="cookie-banner-content"
                            buttonClasses="ui primary button rounded"
                            declineButtonClasses="ui primary inverted button rounded"
                            buttonWrapperClasses="cookie-banner-button-wrapper"
                            enableDeclineButton
                            expires={150}
                            onAccept={() => { console.log('accepted') }}
                        >
                            <div>
                                <Icon icon={cookieBite} />
                            </div>
                            <div>
                                <h6><Trans>Cookies policy</Trans></h6>
                                <p><Trans>Our website uses cookies to analyze how the site is used and to ensure your experience is consistent between visits. <Link to={'/dataprotection'}>Cookies Policy</Link></Trans></p>

                            </div>
                        </CookieConsent>
                        <Footer />
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
                                    <h4><Trans>Alle Filtersysteme</Trans> <Icon className="icon-filtersysteme" icon={arrowSmallRight} color='#5ABEE6' /></h4>
                                    <p><Trans>Übersicht aller Entwicklungen</Trans></p>
                                </div>
                            </Link>
                        </li>
                        <li className="navlist-primary-bag two-col">
                            <Link to={'/filtersysteme/aqqabag'} language={language}>
                                <div className="navlist-circle">
                                    <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                                        width="100%" height="100%" viewBox="0 0 6000 6000"
                                        preserveAspectRatio="xMinYMin meet" className="custom-drawn" fill="#FFFFFF">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M2947 5879 c-25 -15 -32 -30 -180 -415 -147 -379 -158 -425 -137
-530 49 -236 270 -363 500 -288 180 59 291 282 235 472 -9 29 -74 204 -146
390 -93 243 -137 343 -155 360 -27 24 -85 30 -117 11z m186 -469 c70 -181 130
-349 133 -373 14 -101 -53 -224 -148 -271 -65 -33 -161 -36 -223 -7 -90 42
-158 151 -158 253 0 48 18 104 129 392 71 185 132 336 135 336 3 0 63 -148
132 -330z"/>
                                        <path fillRule="evenodd" clipRule="evenodd" d="M3133 5062 c-7 -4 -16 -28 -22 -52 -11 -51 -58 -100 -94 -100 -62 0
-92 -73 -43 -105 19 -13 32 -14 72 -5 95 21 152 79 174 174 9 40 8 53 -5 72
-16 24 -57 32 -82 16z"/>
                                        <path fillRule="evenodd" clipRule="evenodd" d="M3725 5506 c-69 -38 -85 -62 -85 -130 0 -45 3 -51 48 -92 26 -24 64
-56 85 -71 l39 -27 46 25 c26 13 59 35 74 47 26 22 28 29 28 104 0 43 -4 88
-10 98 -14 27 -106 80 -138 80 -15 0 -54 -15 -87 -34z"/>
                                        <path fillRule="evenodd" clipRule="evenodd" d="M1822 4925 c-40 -13 -80 -29 -88 -36 -10 -8 -14 -35 -14 -95 l0 -85
63 -39 c34 -22 71 -43 82 -46 19 -5 210 73 243 99 6 5 12 24 12 41 0 25 -11
43 -57 87 -74 71 -115 99 -145 98 -12 -1 -56 -11 -96 -24z"/>
                                        <path fillRule="evenodd" clipRule="evenodd" d="M3607 4414 c-94 -47 -112 -61 -138 -102 -49 -77 -41 -95 69 -169 51
-35 103 -63 115 -63 30 0 177 99 188 128 18 47 10 115 -22 182 -17 35 -36 68
-42 72 -26 16 -66 5 -170 -48z"/>
                                        <path fillRule="evenodd" clipRule="evenodd" d="M1133 3824 c-15 -24 -15 -29 -2 -53 14 -24 20 -26 97 -29 l82 -3 0
-362 c0 -424 -4 -407 88 -407 l58 0 290 -672 290 -673 292 -3 292 -2 0 -179
c0 -213 -1 -211 103 -211 l67 0 0 -523 c0 -495 1 -525 18 -540 21 -19 45 -21
73 -7 18 10 19 27 19 540 l0 530 100 0 100 0 0 -405 c0 -389 1 -405 19 -415
31 -16 59 -12 75 12 14 19 16 76 16 415 l0 393 68 0 c103 0 102 -1 102 213 l0
177 292 2 292 3 290 673 291 672 57 0 c92 0 88 -17 88 407 l0 362 82 3 c77 3
83 5 97 29 13 24 13 29 -2 53 l-17 26 -1850 0 -1850 0 -17 -26z m3437 -414 l0
-330 -1570 0 -1570 0 0 330 0 330 1570 0 1570 0 0 -330z m-173 -492 c-13 -29
-133 -308 -268 -620 l-244 -568 -885 0 -885 0 -244 568 c-135 312 -255 591
-268 620 l-23 52 1420 0 1420 0 -23 -52z m-1127 -1448 l0 -130 -270 0 -270 0
0 130 0 130 270 0 270 0 0 -130z"/>
                                        <path fillRule="evenodd" clipRule="evenodd" d="M3107 272 c-13 -14 -17 -39 -17 -104 0 -93 13 -118 61 -118 42 0 49
17 49 120 0 61 -4 100 -12 108 -18 18 -63 14 -81 -6z"/>
                                    </svg>
                                </div>
                                <div className="navlist-menu-entry">
                                    <h4>AQQAbag</h4>
                                    <p><Trans>Lösung für Einzelpersonen</Trans></p>
                                </div>
                            </Link>
                        </li>
                        <li className="navlist-primary-cube two-col">
                            <Link to={'/filtersysteme/aqqacube'} language={language}>
                                <div className="navlist-circle">
                                    <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                                        width="100%" height="100%" viewBox="0 0 6420 6420"
                                        preserveAspectRatio="xMidYMid meet" className="custom-drawn" fill="#FFFFFF">
                                        <path d="M4938 6345 c-180 -44 -350 -182 -433 -350 -51 -103 -69 -183 -69
-305 0 -126 19 -203 75 -311 78 -149 213 -264 378 -323 79 -28 97 -30 216 -30
114 0 139 3 206 26 174 61 315 181 389 331 55 112 73 191 73 312 0 190 -58
330 -193 466 -69 70 -101 94 -170 127 -47 23 -112 49 -145 57 -74 19 -249 18
-327 0z m297 -110 c198 -50 358 -209 410 -405 19 -72 19 -201 0 -274 -64 -246
-289 -421 -540 -420 -308 0 -555 246 -555 552 0 163 49 282 165 397 140 140
337 197 520 150z"/>
                                        <path d="M5010 6060 c-19 -19 -20 -33 -20 -223 l0 -202 128 -128 c138 -137
165 -152 197 -103 23 35 9 59 -109 176 l-106 105 0 187 c0 175 -1 188 -19 198
-29 15 -49 12 -71 -10z"/>
                                        <path d="M974 5701 c-100 -24 -190 -98 -235 -195 l-29 -62 2 -2575 3 -2574 27
-50 c36 -68 101 -128 173 -162 l60 -28 1929 -3 c2128 -3 1996 -6 2098 59 56
36 99 88 131 156 l22 48 3 2124 c2 1895 1 2127 -13 2148 -17 25 -52 30 -78 11
-16 -12 -17 -158 -19 -2133 -3 -1801 -5 -2124 -17 -2147 -8 -16 -17 -28 -21
-28 -14 0 -664 925 -660 940 8 40 9 3208 1 3231 -8 24 6 48 150 250 87 123
159 233 159 245 0 36 -23 56 -59 52 -31 -3 -44 -18 -186 -218 l-152 -215
-1329 -2 -1329 -3 -340 482 c-187 265 -341 487 -343 493 -2 7 16 21 40 31 41
18 101 19 1557 22 1091 2 1518 5 1528 13 20 18 17 76 -6 89 -23 12 -3017 13
-3067 1z m206 -727 c248 -351 334 -481 331 -497 -2 -12 -6 -732 -8 -1599 -3
-1277 -1 -1584 10 -1615 l13 -38 -333 -470 c-183 -259 -335 -470 -339 -470
-32 0 -32 53 -33 2595 0 1389 2 2535 5 2548 4 12 9 22 13 22 3 -1 157 -215
341 -476z m3054 -536 c14 -20 16 -187 16 -1580 0 -1545 0 -1558 -20 -1578 -20
-20 -33 -20 -1299 -20 -1150 0 -1281 2 -1295 16 -14 14 -16 172 -16 1588 0
1209 3 1575 12 1584 9 9 311 12 1299 12 l1288 0 15 -22z m349 -3754 c180 -255
330 -471 333 -478 16 -41 20 -41 -1991 -41 -1726 0 -1923 2 -1953 16 l-33 15
338 477 337 477 1321 0 1320 -1 328 -465z"/>
                                        <path d="M1962 4158 c-9 -9 -12 -312 -12 -1304 0 -1413 -4 -1317 57 -1317 56
1 53 -67 53 1313 0 1138 -2 1278 -16 1298 -17 24 -62 30 -82 10z"/>
                                        <path d="M2336 4154 c-14 -14 -16 -146 -16 -1303 0 -1405 -4 -1314 55 -1314
59 0 55 -91 55 1313 0 1234 -1 1288 -18 1303 -23 21 -56 22 -76 1z"/>
                                        <path d="M2706 4154 c-14 -14 -16 -146 -16 -1303 0 -1405 -4 -1314 55 -1314
59 0 55 -91 55 1314 0 1407 4 1319 -55 1319 -13 0 -31 -7 -39 -16z"/>
                                        <path d="M3077 4152 c-16 -17 -17 -122 -17 -1298 0 -1385 -3 -1316 53 -1316
61 -1 57 -97 57 1318 0 1268 0 1293 -19 1304 -29 15 -56 12 -74 -8z"/>
                                        <path d="M3445 4147 c-14 -21 -15 -167 -13 -1305 2 -838 6 -1284 13 -1290 25
-24 55 -23 80 2 l25 25 0 1273 c0 1137 -2 1276 -16 1296 -21 30 -69 30 -89 -1z"/>
                                        <path d="M3822 4158 c-9 -9 -12 -312 -12 -1304 0 -1413 -4 -1317 57 -1317 56
1 53 -67 53 1313 0 1138 -2 1278 -16 1298 -17 24 -62 30 -82 10z"/>
                                        <path d="M2865 5390 c-185 -33 -275 -167 -196 -292 22 -34 44 -53 88 -74 53
-27 67 -29 168 -29 94 0 117 3 162 24 63 28 118 86 132 138 39 145 -150 269
-354 233z m172 -125 c80 -34 95 -77 41 -119 -58 -43 -151 -57 -230 -36 -42 12
-98 55 -98 75 0 24 44 65 85 80 53 19 157 19 202 0z"/>
                                    </svg>

                                    {/* <Icon icon={cube20Regular} color='#FFFFFF' /> */}
                                </div>
                                <div className="navlist-menu-entry">
                                    <h4>AQQAcube</h4>
                                    <p><Trans>Sofortlösung für Lebensgemeinschaften</Trans></p>
                                </div>
                            </Link>
                        </li>
                        <li className="navlist-primary-system two-col">
                            <Link to={'/filtersysteme/aqqasystem'} language={language}>
                                <div className="navlist-circle">
                                    <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                                        width="100%" height="100%" viewBox="224.02 185.85 218.62 294.96"
                                        preserveAspectRatio="xMinYMin meet" className="custom-drawn-small" fill="#FFFFFF">
                                        <g id="g10" transform="matrix(1.3333333,0,0,-1.3333333,0,666.66667)">
                                            <g id="g12" transform="scale(0.1)">
                                                <path d="m3299.8 1509.4v20h-1490.2v2036.7h1470.2v-2056.7h20v20-20h20v2076.7c0 5.26-2.14 10.42-5.86 14.14-3.73 3.72-8.88 5.86-14.14 5.86h-1510.2c-5.27 0-10.42-2.14-14.14-5.86-3.73-3.72-5.86-8.88-5.86-14.14v-2076.7c0-5.27 2.13-10.42 5.86-14.14 3.72-3.73 8.87-5.86 14.14-5.86h1510.2c5.26 0 10.41 2.13 14.14 5.86 3.72 3.72 5.86 8.87 5.86 14.14h-20" /><path d="m3299.8 1509.4v20h-1490.2v2036.7h1470.2v-2056.7h20v20-20h20v2076.7c0 5.26-2.14 10.42-5.86 14.14-3.73 3.72-8.88 5.86-14.14 5.86h-1510.2c-5.27 0-10.42-2.14-14.14-5.86-3.73-3.72-5.86-8.88-5.86-14.14v-2076.7c0-5.27 2.13-10.42 5.86-14.14 3.72-3.73 8.87-5.86 14.14-5.86h1510.2c5.26 0 10.41 2.13 14.14 5.86 3.72 3.72 5.86 8.87 5.86 14.14h-20" />
                                                <path d="m3210.3 1433.9h-1490.2v2056.7c0 11.05-8.96 20-20 20-11.05 0-20-8.95-20-20v-2076.7c0-5.27 2.13-10.42 5.86-14.14 3.72-3.73 8.87-5.86 14.14-5.86h1510.2c11.05 0 20 8.96 20 20 0 11.05-8.95 20-20 20" />
                                                <path d="m1963.1 3442.9c0 19.77-16.04 35.8-35.81 35.8s-35.8-16.03-35.8-35.8c0-19.78 16.03-35.82 35.8-35.82s35.81 16.04 35.81 35.82" />
                                                <path d="m1926.7 3178.7c0 7.92-6.42 14.34-14.34 14.34-7.93 0-14.35-6.42-14.35-14.34 0-7.93 6.42-14.36 14.35-14.36 7.92 0 14.34 6.43 14.34 14.36" />
                                                <path d="m1926.7 3059.9c0 7.92-6.42 14.34-14.34 14.34-7.93 0-14.35-6.42-14.35-14.34 0-7.93 6.42-14.36 14.35-14.36 7.92 0 14.34 6.43 14.34 14.36" />
                                                <path d="m1926.7 2941.2c0 7.93-6.42 14.35-14.34 14.35-7.93 0-14.35-6.42-14.35-14.35 0-7.92 6.42-14.35 14.35-14.35 7.92 0 14.34 6.43 14.34 14.35" />
                                                <path d="m1926.7 2822.4c0 7.93-6.42 14.35-14.34 14.35-7.93 0-14.35-6.42-14.35-14.35 0-7.92 6.42-14.35 14.35-14.35 7.92 0 14.34 6.43 14.34 14.35" />
                                                <path d="m1926.7 2703.6c0 7.93-6.42 14.35-14.34 14.35-7.93 0-14.35-6.42-14.35-14.35 0-7.92 6.42-14.35 14.35-14.35 7.92 0 14.34 6.43 14.34 14.35" />
                                                <path d="m1926.7 2584.8c0 7.93-6.42 14.35-14.34 14.35-7.93 0-14.35-6.42-14.35-14.35 0-7.92 6.42-14.35 14.35-14.35 7.92 0 14.34 6.43 14.34 14.35" />
                                                <path d="m1926.7 2466c0 7.93-6.42 14.35-14.34 14.35-7.93 0-14.35-6.42-14.35-14.35 0-7.92 6.42-14.35 14.35-14.35 7.92 0 14.34 6.43 14.34 14.35" />
                                                <path d="m1926.7 2347.2c0 7.93-6.42 14.35-14.34 14.35-7.93 0-14.35-6.42-14.35-14.35 0-7.92 6.42-14.35 14.35-14.35 7.92 0 14.34 6.43 14.34 14.35" />
                                                <path d="m1926.7 2228.5c0 7.93-6.42 14.35-14.34 14.35-7.93 0-14.35-6.42-14.35-14.35 0-7.92 6.42-14.34 14.35-14.34 7.92 0 14.34 6.42 14.34 14.34" />
                                                <path d="m1926.7 2109.7c0 7.93-6.42 14.35-14.34 14.35-7.93 0-14.35-6.42-14.35-14.35 0-7.92 6.42-14.34 14.35-14.34 7.92 0 14.34 6.42 14.34 14.34" />
                                                <path d="m1926.7 1990.9c0 7.93-6.42 14.35-14.34 14.35-7.93 0-14.35-6.42-14.35-14.35 0-7.92 6.42-14.34 14.35-14.34 7.92 0 14.34 6.42 14.34 14.34" />
                                                <path d="m1926.7 1872.1c0 7.92-6.42 14.35-14.34 14.35-7.93 0-14.35-6.43-14.35-14.35s6.42-14.34 14.35-14.34c7.92 0 14.34 6.42 14.34 14.34" />
                                                <path d="m1926.7 1753.4c0 7.92-6.42 14.35-14.34 14.35-7.93 0-14.35-6.43-14.35-14.35s6.42-14.34 14.35-14.34c7.92 0 14.34 6.42 14.34 14.34" />
                                                <path d="m2031.2 3236c0 7.93-6.42 14.36-14.34 14.36-7.93 0-14.36-6.43-14.36-14.36 0-7.92 6.43-14.34 14.36-14.34 7.92 0 14.34 6.42 14.34 14.34" />
                                                <path d="m2031.2 3117.2c0 7.93-6.42 14.35-14.34 14.35-7.93 0-14.36-6.42-14.36-14.35 0-7.92 6.43-14.34 14.36-14.34 7.92 0 14.34 6.42 14.34 14.34" />
                                                <path d="m2031.2 2998.4c0 7.93-6.42 14.35-14.34 14.35-7.93 0-14.36-6.42-14.36-14.35 0-7.92 6.43-14.34 14.36-14.34 7.92 0 14.34 6.42 14.34 14.34" />
                                                <path d="m2031.2 2879.6c0 7.93-6.42 14.35-14.34 14.35-7.93 0-14.36-6.42-14.36-14.35 0-7.92 6.43-14.34 14.36-14.34 7.92 0 14.34 6.42 14.34 14.34" />
                                                <path d="m2031.2 2760.8c0 7.93-6.42 14.35-14.34 14.35-7.93 0-14.36-6.42-14.36-14.35 0-7.92 6.43-14.34 14.36-14.34 7.92 0 14.34 6.42 14.34 14.34" />
                                                <path d="m2031.2 2642.1c0 7.92-6.42 14.35-14.34 14.35-7.93 0-14.36-6.43-14.36-14.35s6.43-14.34 14.36-14.34c7.92 0 14.34 6.42 14.34 14.34" />
                                                <path d="m2031.2 2523.3c0 7.92-6.42 14.34-14.34 14.34-7.93 0-14.36-6.42-14.36-14.34s6.43-14.35 14.36-14.35c7.92 0 14.34 6.43 14.34 14.35" />
                                                <path d="m2031.2 2404.5c0 7.92-6.42 14.34-14.34 14.34-7.93 0-14.36-6.42-14.36-14.34s6.43-14.35 14.36-14.35c7.92 0 14.34 6.43 14.34 14.35" />
                                                <path d="m2031.2 2285.7c0 7.92-6.42 14.34-14.34 14.34-7.93 0-14.36-6.42-14.36-14.34 0-7.93 6.43-14.35 14.36-14.35 7.92 0 14.34 6.42 14.34 14.35" />
                                                <path d="m2031.2 2167c0 7.92-6.42 14.34-14.34 14.34-7.93 0-14.36-6.42-14.36-14.34 0-7.93 6.43-14.35 14.36-14.35 7.92 0 14.34 6.42 14.34 14.35" />
                                                <path d="m2031.2 2048.2c0 7.92-6.42 14.34-14.34 14.34-7.93 0-14.36-6.42-14.36-14.34 0-7.93 6.43-14.35 14.36-14.35 7.92 0 14.34 6.42 14.34 14.35" />
                                                <path d="m2031.2 1929.4c0 7.92-6.42 14.34-14.34 14.34-7.93 0-14.36-6.42-14.36-14.34 0-7.93 6.43-14.35 14.36-14.35 7.92 0 14.34 6.42 14.34 14.35" />
                                                <path d="m2031.2 1810.6c0 7.92-6.42 14.35-14.34 14.35-7.93 0-14.36-6.43-14.36-14.35 0-7.93 6.43-14.36 14.36-14.36 7.92 0 14.34 6.43 14.34 14.36" />
                                                <path d="m2135.6 3178.7c0 7.92-6.43 14.34-14.36 14.34-7.92 0-14.34-6.42-14.34-14.34 0-7.93 6.42-14.36 14.34-14.36 7.93 0 14.36 6.43 14.36 14.36" />
                                                <path d="m2135.6 3059.9c0 7.92-6.43 14.34-14.36 14.34-7.92 0-14.34-6.42-14.34-14.34 0-7.93 6.42-14.36 14.34-14.36 7.93 0 14.36 6.43 14.36 14.36" />
                                                <path d="m2135.6 2941.2c0 7.93-6.43 14.35-14.36 14.35-7.92 0-14.34-6.42-14.34-14.35 0-7.92 6.42-14.35 14.34-14.35 7.93 0 14.36 6.43 14.36 14.35" />
                                                <path d="m2135.6 2822.4c0 7.93-6.43 14.35-14.36 14.35-7.92 0-14.34-6.42-14.34-14.35 0-7.92 6.42-14.35 14.34-14.35 7.93 0 14.36 6.43 14.36 14.35" />
                                                <path d="m2135.6 2703.6c0 7.93-6.43 14.35-14.36 14.35-7.92 0-14.34-6.42-14.34-14.35 0-7.92 6.42-14.35 14.34-14.35 7.93 0 14.36 6.43 14.36 14.35" />
                                                <path d="m2135.6 2584.8c0 7.93-6.43 14.35-14.36 14.35-7.92 0-14.34-6.42-14.34-14.35 0-7.92 6.42-14.35 14.34-14.35 7.93 0 14.36 6.43 14.36 14.35" />
                                                <path d="m2135.6 2466c0 7.93-6.43 14.35-14.36 14.35-7.92 0-14.34-6.42-14.34-14.35 0-7.92 6.42-14.35 14.34-14.35 7.93 0 14.36 6.43 14.36 14.35" />
                                                <path d="m2135.6 2347.2c0 7.93-6.43 14.35-14.36 14.35-7.92 0-14.34-6.42-14.34-14.35 0-7.92 6.42-14.35 14.34-14.35 7.93 0 14.36 6.43 14.36 14.35" />
                                                <path d="m2135.6 2228.5c0 7.93-6.43 14.35-14.36 14.35-7.92 0-14.34-6.42-14.34-14.35 0-7.92 6.42-14.34 14.34-14.34 7.93 0 14.36 6.42 14.36 14.34" />
                                                <path d="m2135.6 2109.7c0 7.93-6.43 14.35-14.36 14.35-7.92 0-14.34-6.42-14.34-14.35 0-7.92 6.42-14.34 14.34-14.34 7.93 0 14.36 6.42 14.36 14.34" />
                                                <path d="m2135.6 1990.9c0 7.93-6.43 14.35-14.36 14.35-7.92 0-14.34-6.42-14.34-14.35 0-7.92 6.42-14.34 14.34-14.34 7.93 0 14.36 6.42 14.36 14.34" />
                                                <path d="m2135.6 1872.1c0 7.92-6.43 14.35-14.36 14.35-7.92 0-14.34-6.43-14.34-14.35s6.42-14.34 14.34-14.34c7.93 0 14.36 6.42 14.36 14.34" />
                                                <path d="m2135.6 1753.4c0 7.92-6.43 14.35-14.36 14.35-7.92 0-14.34-6.43-14.34-14.35s6.42-14.34 14.34-14.34c7.93 0 14.36 6.42 14.36 14.34" />
                                                <path d="m2240 3236c0 7.93-6.42 14.36-14.35 14.36-7.92 0-14.35-6.43-14.35-14.36 0-7.92 6.43-14.34 14.35-14.34 7.93 0 14.35 6.42 14.35 14.34" />
                                                <path d="m2240 3117.2c0 7.93-6.42 14.35-14.35 14.35-7.92 0-14.35-6.42-14.35-14.35 0-7.92 6.43-14.34 14.35-14.34 7.93 0 14.35 6.42 14.35 14.34" />
                                                <path d="m2240 2998.4c0 7.93-6.42 14.35-14.35 14.35-7.92 0-14.35-6.42-14.35-14.35 0-7.92 6.43-14.34 14.35-14.34 7.93 0 14.35 6.42 14.35 14.34" />
                                                <path d="m2240 2879.6c0 7.93-6.42 14.35-14.35 14.35-7.92 0-14.35-6.42-14.35-14.35 0-7.92 6.43-14.34 14.35-14.34 7.93 0 14.35 6.42 14.35 14.34" />
                                                <path d="m2240 2760.8c0 7.93-6.42 14.35-14.35 14.35-7.92 0-14.35-6.42-14.35-14.35 0-7.92 6.43-14.34 14.35-14.34 7.93 0 14.35 6.42 14.35 14.34" />
                                                <path d="m2240 2642.1c0 7.92-6.42 14.35-14.35 14.35-7.92 0-14.35-6.43-14.35-14.35s6.43-14.34 14.35-14.34c7.93 0 14.35 6.42 14.35 14.34" />
                                                <path d="m2240 2523.3c0 7.92-6.42 14.34-14.35 14.34-7.92 0-14.35-6.42-14.35-14.34s6.43-14.35 14.35-14.35c7.93 0 14.35 6.43 14.35 14.35" />
                                                <path d="m2240 2404.5c0 7.92-6.42 14.34-14.35 14.34-7.92 0-14.35-6.42-14.35-14.34s6.43-14.35 14.35-14.35c7.93 0 14.35 6.43 14.35 14.35" />
                                                <path d="m2240 2285.7c0 7.92-6.42 14.34-14.35 14.34-7.92 0-14.35-6.42-14.35-14.34 0-7.93 6.43-14.35 14.35-14.35 7.93 0 14.35 6.42 14.35 14.35" />
                                                <path d="m2240 2167c0 7.92-6.42 14.34-14.35 14.34-7.92 0-14.35-6.42-14.35-14.34 0-7.93 6.43-14.35 14.35-14.35 7.93 0 14.35 6.42 14.35 14.35" />
                                                <path d="m2240 2048.2c0 7.92-6.42 14.34-14.35 14.34-7.92 0-14.35-6.42-14.35-14.34 0-7.93 6.43-14.35 14.35-14.35 7.93 0 14.35 6.42 14.35 14.35" />
                                                <path d="m2240 1929.4c0 7.92-6.42 14.34-14.35 14.34-7.92 0-14.35-6.42-14.35-14.34 0-7.93 6.43-14.35 14.35-14.35 7.93 0 14.35 6.42 14.35 14.35" />
                                                <path d="m2240 1810.6c0 7.92-6.42 14.35-14.35 14.35-7.92 0-14.35-6.43-14.35-14.35 0-7.93 6.43-14.36 14.35-14.36 7.93 0 14.35 6.43 14.35 14.36" />
                                                <path d="m2344.5 3178.7c0 7.92-6.42 14.34-14.35 14.34-7.92 0-14.35-6.42-14.35-14.34 0-7.93 6.43-14.36 14.35-14.36 7.93 0 14.35 6.43 14.35 14.36" />
                                                <path d="m2344.5 3059.9c0 7.92-6.42 14.34-14.35 14.34-7.92 0-14.35-6.42-14.35-14.34 0-7.93 6.43-14.36 14.35-14.36 7.93 0 14.35 6.43 14.35 14.36" />
                                                <path d="m2344.5 2941.2c0 7.93-6.42 14.35-14.35 14.35-7.92 0-14.35-6.42-14.35-14.35 0-7.92 6.43-14.35 14.35-14.35 7.93 0 14.35 6.43 14.35 14.35" />
                                                <path d="m2344.5 2822.4c0 7.93-6.42 14.35-14.35 14.35-7.92 0-14.35-6.42-14.35-14.35 0-7.92 6.43-14.35 14.35-14.35 7.93 0 14.35 6.43 14.35 14.35" />
                                                <path d="m2344.5 2703.6c0 7.93-6.42 14.35-14.35 14.35-7.92 0-14.35-6.42-14.35-14.35 0-7.92 6.43-14.35 14.35-14.35 7.93 0 14.35 6.43 14.35 14.35" />
                                                <path d="m2344.5 2584.8c0 7.93-6.42 14.35-14.35 14.35-7.92 0-14.35-6.42-14.35-14.35 0-7.92 6.43-14.35 14.35-14.35 7.93 0 14.35 6.43 14.35 14.35" />
                                                <path d="m2344.5 2466c0 7.93-6.42 14.35-14.35 14.35-7.92 0-14.35-6.42-14.35-14.35 0-7.92 6.43-14.35 14.35-14.35 7.93 0 14.35 6.43 14.35 14.35" />
                                                <path d="m2344.5 2347.2c0 7.93-6.42 14.35-14.35 14.35-7.92 0-14.35-6.42-14.35-14.35 0-7.92 6.43-14.35 14.35-14.35 7.93 0 14.35 6.43 14.35 14.35" />
                                                <path d="m2344.5 2228.5c0 7.93-6.42 14.35-14.35 14.35-7.92 0-14.35-6.42-14.35-14.35 0-7.92 6.43-14.34 14.35-14.34 7.93 0 14.35 6.42 14.35 14.34" />
                                                <path d="m2344.5 2109.7c0 7.93-6.42 14.35-14.35 14.35-7.92 0-14.35-6.42-14.35-14.35 0-7.92 6.43-14.34 14.35-14.34 7.93 0 14.35 6.42 14.35 14.34" />
                                                <path d="m2344.5 1990.9c0 7.93-6.42 14.35-14.35 14.35-7.92 0-14.35-6.42-14.35-14.35 0-7.92 6.43-14.34 14.35-14.34 7.93 0 14.35 6.42 14.35 14.34" />
                                                <path d="m2344.5 1872.1c0 7.92-6.42 14.35-14.35 14.35-7.92 0-14.35-6.43-14.35-14.35s6.43-14.34 14.35-14.34c7.93 0 14.35 6.42 14.35 14.34" />
                                                <path d="m2344.5 1753.4c0 7.92-6.42 14.35-14.35 14.35-7.92 0-14.35-6.43-14.35-14.35s6.43-14.34 14.35-14.34c7.93 0 14.35 6.42 14.35 14.34" />
                                                <path d="m2448.9 3236c0 7.93-6.43 14.36-14.35 14.36s-14.34-6.43-14.34-14.36c0-7.92 6.42-14.34 14.34-14.34s14.35 6.42 14.35 14.34" />
                                                <path d="m2448.9 3117.2c0 7.93-6.43 14.35-14.35 14.35s-14.34-6.42-14.34-14.35c0-7.92 6.42-14.34 14.34-14.34s14.35 6.42 14.35 14.34" />
                                                <path d="m2448.9 2998.4c0 7.93-6.43 14.35-14.35 14.35s-14.34-6.42-14.34-14.35c0-7.92 6.42-14.34 14.34-14.34s14.35 6.42 14.35 14.34" />
                                                <path d="m2448.9 2879.6c0 7.93-6.43 14.35-14.35 14.35s-14.34-6.42-14.34-14.35c0-7.92 6.42-14.34 14.34-14.34s14.35 6.42 14.35 14.34" />
                                                <path d="m2448.9 2760.8c0 7.93-6.43 14.35-14.35 14.35s-14.34-6.42-14.34-14.35c0-7.92 6.42-14.34 14.34-14.34s14.35 6.42 14.35 14.34" />
                                                <path d="m2448.9 2642.1c0 7.92-6.43 14.35-14.35 14.35s-14.34-6.43-14.34-14.35 6.42-14.34 14.34-14.34 14.35 6.42 14.35 14.34" />
                                                <path d="m2448.9 2523.3c0 7.92-6.43 14.34-14.35 14.34s-14.34-6.42-14.34-14.34 6.42-14.35 14.34-14.35 14.35 6.43 14.35 14.35" />
                                                <path d="m2448.9 2404.5c0 7.92-6.43 14.34-14.35 14.34s-14.34-6.42-14.34-14.34 6.42-14.35 14.34-14.35 14.35 6.43 14.35 14.35" />
                                                <path d="m2448.9 2285.7c0 7.92-6.43 14.34-14.35 14.34s-14.34-6.42-14.34-14.34c0-7.93 6.42-14.35 14.34-14.35s14.35 6.42 14.35 14.35" />
                                                <path d="m2448.9 2167c0 7.92-6.43 14.34-14.35 14.34s-14.34-6.42-14.34-14.34c0-7.93 6.42-14.35 14.34-14.35s14.35 6.42 14.35 14.35" />
                                                <path d="m2448.9 2048.2c0 7.92-6.43 14.34-14.35 14.34s-14.34-6.42-14.34-14.34c0-7.93 6.42-14.35 14.34-14.35s14.35 6.42 14.35 14.35" />
                                                <path d="m2448.9 1929.4c0 7.92-6.43 14.34-14.35 14.34s-14.34-6.42-14.34-14.34c0-7.93 6.42-14.35 14.34-14.35s14.35 6.42 14.35 14.35" />
                                                <path d="m2448.9 1810.6c0 7.92-6.43 14.35-14.35 14.35s-14.34-6.43-14.34-14.35c0-7.93 6.42-14.36 14.34-14.36s14.35 6.43 14.35 14.36" />
                                                <path d="m2553.3 3178.7c0 7.92-6.42 14.34-14.34 14.34-7.93 0-14.35-6.42-14.35-14.34 0-7.93 6.42-14.36 14.35-14.36 7.92 0 14.34 6.43 14.34 14.36" />
                                                <path d="m2553.3 3059.9c0 7.92-6.42 14.34-14.34 14.34-7.93 0-14.35-6.42-14.35-14.34 0-7.93 6.42-14.36 14.35-14.36 7.92 0 14.34 6.43 14.34 14.36" />
                                                <path d="m2553.3 2941.2c0 7.93-6.42 14.35-14.34 14.35-7.93 0-14.35-6.42-14.35-14.35 0-7.92 6.42-14.35 14.35-14.35 7.92 0 14.34 6.43 14.34 14.35" />
                                                <path d="m2553.3 2822.4c0 7.93-6.42 14.35-14.34 14.35-7.93 0-14.35-6.42-14.35-14.35 0-7.92 6.42-14.35 14.35-14.35 7.92 0 14.34 6.43 14.34 14.35" />
                                                <path d="m2553.3 2703.6c0 7.93-6.42 14.35-14.34 14.35-7.93 0-14.35-6.42-14.35-14.35 0-7.92 6.42-14.35 14.35-14.35 7.92 0 14.34 6.43 14.34 14.35" />
                                                <path d="m2553.3 2584.8c0 7.93-6.42 14.35-14.34 14.35-7.93 0-14.35-6.42-14.35-14.35 0-7.92 6.42-14.35 14.35-14.35 7.92 0 14.34 6.43 14.34 14.35" />
                                                <path d="m2553.3 2466c0 7.93-6.42 14.35-14.34 14.35-7.93 0-14.35-6.42-14.35-14.35 0-7.92 6.42-14.35 14.35-14.35 7.92 0 14.34 6.43 14.34 14.35" />
                                                <path d="m2553.3 2347.2c0 7.93-6.42 14.35-14.34 14.35-7.93 0-14.35-6.42-14.35-14.35 0-7.92 6.42-14.35 14.35-14.35 7.92 0 14.34 6.43 14.34 14.35" />
                                                <path d="m2553.3 2228.5c0 7.93-6.42 14.35-14.34 14.35-7.93 0-14.35-6.42-14.35-14.35 0-7.92 6.42-14.34 14.35-14.34 7.92 0 14.34 6.42 14.34 14.34" />
                                                <path d="m2553.3 2109.7c0 7.93-6.42 14.35-14.34 14.35-7.93 0-14.35-6.42-14.35-14.35 0-7.92 6.42-14.34 14.35-14.34 7.92 0 14.34 6.42 14.34 14.34" />
                                                <path d="m2553.3 1990.9c0 7.93-6.42 14.35-14.34 14.35-7.93 0-14.35-6.42-14.35-14.35 0-7.92 6.42-14.34 14.35-14.34 7.92 0 14.34 6.42 14.34 14.34" />
                                                <path d="m2553.3 1872.1c0 7.92-6.42 14.35-14.34 14.35-7.93 0-14.35-6.43-14.35-14.35s6.42-14.34 14.35-14.34c7.92 0 14.34 6.42 14.34 14.34" />
                                                <path d="m2553.3 1753.4c0 7.92-6.42 14.35-14.34 14.35-7.93 0-14.35-6.43-14.35-14.35s6.42-14.34 14.35-14.34c7.92 0 14.34 6.42 14.34 14.34" />
                                                <path d="m2657.8 3236c0 7.93-6.43 14.36-14.35 14.36-7.93 0-14.35-6.43-14.35-14.36 0-7.92 6.42-14.34 14.35-14.34 7.92 0 14.35 6.42 14.35 14.34" />
                                                <path d="m2657.8 3117.2c0 7.93-6.43 14.35-14.35 14.35-7.93 0-14.35-6.42-14.35-14.35 0-7.92 6.42-14.34 14.35-14.34 7.92 0 14.35 6.42 14.35 14.34" />
                                                <path d="m2657.8 2998.4c0 7.93-6.43 14.35-14.35 14.35-7.93 0-14.35-6.42-14.35-14.35 0-7.92 6.42-14.34 14.35-14.34 7.92 0 14.35 6.42 14.35 14.34" />
                                                <path d="m2657.8 2879.6c0 7.93-6.43 14.35-14.35 14.35-7.93 0-14.35-6.42-14.35-14.35 0-7.92 6.42-14.34 14.35-14.34 7.92 0 14.35 6.42 14.35 14.34" />
                                                <path d="m2657.8 2760.8c0 7.93-6.43 14.35-14.35 14.35-7.93 0-14.35-6.42-14.35-14.35 0-7.92 6.42-14.34 14.35-14.34 7.92 0 14.35 6.42 14.35 14.34" />
                                                <path d="m2657.8 2642.1c0 7.92-6.43 14.35-14.35 14.35-7.93 0-14.35-6.43-14.35-14.35s6.42-14.34 14.35-14.34c7.92 0 14.35 6.42 14.35 14.34" />
                                                <path d="m2657.8 2523.3c0 7.92-6.43 14.34-14.35 14.34-7.93 0-14.35-6.42-14.35-14.34s6.42-14.35 14.35-14.35c7.92 0 14.35 6.43 14.35 14.35" />
                                                <path d="m2657.8 2404.5c0 7.92-6.43 14.34-14.35 14.34-7.93 0-14.35-6.42-14.35-14.34s6.42-14.35 14.35-14.35c7.92 0 14.35 6.43 14.35 14.35" />
                                                <path d="m2657.8 2285.7c0 7.92-6.43 14.34-14.35 14.34-7.93 0-14.35-6.42-14.35-14.34 0-7.93 6.42-14.35 14.35-14.35 7.92 0 14.35 6.42 14.35 14.35" />
                                                <path d="m2657.8 2167c0 7.92-6.43 14.34-14.35 14.34-7.93 0-14.35-6.42-14.35-14.34 0-7.93 6.42-14.35 14.35-14.35 7.92 0 14.35 6.42 14.35 14.35" />
                                                <path d="m2657.8 2048.2c0 7.92-6.43 14.34-14.35 14.34-7.93 0-14.35-6.42-14.35-14.34 0-7.93 6.42-14.35 14.35-14.35 7.92 0 14.35 6.42 14.35 14.35" />
                                                <path d="m2657.8 1929.4c0 7.92-6.43 14.34-14.35 14.34-7.93 0-14.35-6.42-14.35-14.34 0-7.93 6.42-14.35 14.35-14.35 7.92 0 14.35 6.42 14.35 14.35" />
                                                <path d="m2657.8 1810.6c0 7.92-6.43 14.35-14.35 14.35-7.93 0-14.35-6.43-14.35-14.35 0-7.93 6.42-14.36 14.35-14.36 7.92 0 14.35 6.43 14.35 14.36" />
                                                <path d="m2762.2 3178.7c0 7.92-6.43 14.34-14.35 14.34-7.93 0-14.35-6.42-14.35-14.34 0-7.93 6.42-14.36 14.35-14.36 7.92 0 14.35 6.43 14.35 14.36" />
                                                <path d="m2762.2 3059.9c0 7.92-6.43 14.34-14.35 14.34-7.93 0-14.35-6.42-14.35-14.34 0-7.93 6.42-14.36 14.35-14.36 7.92 0 14.35 6.43 14.35 14.36" />
                                                <path d="m2762.2 2941.2c0 7.93-6.43 14.35-14.35 14.35-7.93 0-14.35-6.42-14.35-14.35 0-7.92 6.42-14.35 14.35-14.35 7.92 0 14.35 6.43 14.35 14.35" />
                                                <path d="m2762.2 2822.4c0 7.93-6.43 14.35-14.35 14.35-7.93 0-14.35-6.42-14.35-14.35 0-7.92 6.42-14.35 14.35-14.35 7.92 0 14.35 6.43 14.35 14.35" />
                                                <path d="m2762.2 2703.6c0 7.93-6.43 14.35-14.35 14.35-7.93 0-14.35-6.42-14.35-14.35 0-7.92 6.42-14.35 14.35-14.35 7.92 0 14.35 6.43 14.35 14.35" />
                                                <path d="m2762.2 2584.8c0 7.93-6.43 14.35-14.35 14.35-7.93 0-14.35-6.42-14.35-14.35 0-7.92 6.42-14.35 14.35-14.35 7.92 0 14.35 6.43 14.35 14.35" />
                                                <path d="m2762.2 2466c0 7.93-6.43 14.35-14.35 14.35-7.93 0-14.35-6.42-14.35-14.35 0-7.92 6.42-14.35 14.35-14.35 7.92 0 14.35 6.43 14.35 14.35" />
                                                <path d="m2762.2 2347.2c0 7.93-6.43 14.35-14.35 14.35-7.93 0-14.35-6.42-14.35-14.35 0-7.92 6.42-14.35 14.35-14.35 7.92 0 14.35 6.43 14.35 14.35" />
                                                <path d="m2762.2 2228.5c0 7.93-6.43 14.35-14.35 14.35-7.93 0-14.35-6.42-14.35-14.35 0-7.92 6.42-14.34 14.35-14.34 7.92 0 14.35 6.42 14.35 14.34" />
                                                <path d="m2762.2 2109.7c0 7.93-6.43 14.35-14.35 14.35-7.93 0-14.35-6.42-14.35-14.35 0-7.92 6.42-14.34 14.35-14.34 7.92 0 14.35 6.42 14.35 14.34" />
                                                <path d="m2762.2 1990.9c0 7.93-6.43 14.35-14.35 14.35-7.93 0-14.35-6.42-14.35-14.35 0-7.92 6.42-14.34 14.35-14.34 7.92 0 14.35 6.42 14.35 14.34" />
                                                <path d="m2762.2 1872.1c0 7.92-6.43 14.35-14.35 14.35-7.93 0-14.35-6.43-14.35-14.35s6.42-14.34 14.35-14.34c7.92 0 14.35 6.42 14.35 14.34" />
                                                <path d="m2762.2 1753.4c0 7.92-6.43 14.35-14.35 14.35-7.93 0-14.35-6.43-14.35-14.35s6.42-14.34 14.35-14.34c7.92 0 14.35 6.42 14.35 14.34" />
                                                <path d="m2866.6 3236c0 7.93-6.42 14.36-14.35 14.36-7.92 0-14.35-6.43-14.35-14.36 0-7.92 6.43-14.34 14.35-14.34 7.93 0 14.35 6.42 14.35 14.34" />
                                                <path d="m2866.6 3117.2c0 7.93-6.42 14.35-14.35 14.35-7.92 0-14.35-6.42-14.35-14.35 0-7.92 6.43-14.34 14.35-14.34 7.93 0 14.35 6.42 14.35 14.34" />
                                                <path d="m2866.6 2998.4c0 7.93-6.42 14.35-14.35 14.35-7.92 0-14.35-6.42-14.35-14.35 0-7.92 6.43-14.34 14.35-14.34 7.93 0 14.35 6.42 14.35 14.34" />
                                                <path d="m2866.6 2879.6c0 7.93-6.42 14.35-14.35 14.35-7.92 0-14.35-6.42-14.35-14.35 0-7.92 6.43-14.34 14.35-14.34 7.93 0 14.35 6.42 14.35 14.34" />
                                                <path d="m2866.6 2760.8c0 7.93-6.42 14.35-14.35 14.35-7.92 0-14.35-6.42-14.35-14.35 0-7.92 6.43-14.34 14.35-14.34 7.93 0 14.35 6.42 14.35 14.34" />
                                                <path d="m2866.6 2642.1c0 7.92-6.42 14.35-14.35 14.35-7.92 0-14.35-6.43-14.35-14.35s6.43-14.34 14.35-14.34c7.93 0 14.35 6.42 14.35 14.34" />
                                                <path d="m2866.6 2523.3c0 7.92-6.42 14.34-14.35 14.34-7.92 0-14.35-6.42-14.35-14.34s6.43-14.35 14.35-14.35c7.93 0 14.35 6.43 14.35 14.35" />
                                                <path d="m2866.6 2404.5c0 7.92-6.42 14.34-14.35 14.34-7.92 0-14.35-6.42-14.35-14.34s6.43-14.35 14.35-14.35c7.93 0 14.35 6.43 14.35 14.35" />
                                                <path d="m2866.6 2285.7c0 7.92-6.42 14.34-14.35 14.34-7.92 0-14.35-6.42-14.35-14.34 0-7.93 6.43-14.35 14.35-14.35 7.93 0 14.35 6.42 14.35 14.35" />
                                                <path d="m2866.6 2167c0 7.92-6.42 14.34-14.35 14.34-7.92 0-14.35-6.42-14.35-14.34 0-7.93 6.43-14.35 14.35-14.35 7.93 0 14.35 6.42 14.35 14.35" />
                                                <path d="m2866.6 2048.2c0 7.92-6.42 14.34-14.35 14.34-7.92 0-14.35-6.42-14.35-14.34 0-7.93 6.43-14.35 14.35-14.35 7.93 0 14.35 6.42 14.35 14.35" />
                                                <path d="m2866.6 1929.4c0 7.92-6.42 14.34-14.35 14.34-7.92 0-14.35-6.42-14.35-14.34 0-7.93 6.43-14.35 14.35-14.35 7.93 0 14.35 6.42 14.35 14.35" />
                                                <path d="m2866.6 1810.6c0 7.92-6.42 14.35-14.35 14.35-7.92 0-14.35-6.43-14.35-14.35 0-7.93 6.43-14.36 14.35-14.36 7.93 0 14.35 6.43 14.35 14.36" />
                                                <path d="m2971 3178.7c0 7.92-6.42 14.34-14.35 14.34-7.92 0-14.34-6.42-14.34-14.34 0-7.93 6.42-14.36 14.34-14.36 7.93 0 14.35 6.43 14.35 14.36" />
                                                <path d="m2971 3059.9c0 7.92-6.42 14.34-14.35 14.34-7.92 0-14.34-6.42-14.34-14.34 0-7.93 6.42-14.36 14.34-14.36 7.93 0 14.35 6.43 14.35 14.36" />
                                                <path d="m2971 2941.2c0 7.93-6.42 14.35-14.35 14.35-7.92 0-14.34-6.42-14.34-14.35 0-7.92 6.42-14.35 14.34-14.35 7.93 0 14.35 6.43 14.35 14.35" />
                                                <path d="m2971 2822.4c0 7.93-6.42 14.35-14.35 14.35-7.92 0-14.34-6.42-14.34-14.35 0-7.92 6.42-14.35 14.34-14.35 7.93 0 14.35 6.43 14.35 14.35" />
                                                <path d="m2971 2703.6c0 7.93-6.42 14.35-14.35 14.35-7.92 0-14.34-6.42-14.34-14.35 0-7.92 6.42-14.35 14.34-14.35 7.93 0 14.35 6.43 14.35 14.35" />
                                                <path d="m2971 2584.8c0 7.93-6.42 14.35-14.35 14.35-7.92 0-14.34-6.42-14.34-14.35 0-7.92 6.42-14.35 14.34-14.35 7.93 0 14.35 6.43 14.35 14.35" />
                                                <path d="m2971 2466c0 7.93-6.42 14.35-14.35 14.35-7.92 0-14.34-6.42-14.34-14.35 0-7.92 6.42-14.35 14.34-14.35 7.93 0 14.35 6.43 14.35 14.35" />
                                                <path d="m2971 2347.2c0 7.93-6.42 14.35-14.35 14.35-7.92 0-14.34-6.42-14.34-14.35 0-7.92 6.42-14.35 14.34-14.35 7.93 0 14.35 6.43 14.35 14.35" />
                                                <path d="m2971 2228.5c0 7.93-6.42 14.35-14.35 14.35-7.92 0-14.34-6.42-14.34-14.35 0-7.92 6.42-14.34 14.34-14.34 7.93 0 14.35 6.42 14.35 14.34" />
                                                <path d="m2971 2109.7c0 7.93-6.42 14.35-14.35 14.35-7.92 0-14.34-6.42-14.34-14.35 0-7.92 6.42-14.34 14.34-14.34 7.93 0 14.35 6.42 14.35 14.34" />
                                                <path d="m2971 1990.9c0 7.93-6.42 14.35-14.35 14.35-7.92 0-14.34-6.42-14.34-14.35 0-7.92 6.42-14.34 14.34-14.34 7.93 0 14.35 6.42 14.35 14.34" />
                                                <path d="m2971 1872.1c0 7.92-6.42 14.35-14.35 14.35-7.92 0-14.34-6.43-14.34-14.35s6.42-14.34 14.34-14.34c7.93 0 14.35 6.42 14.35 14.34" />
                                                <path d="m2971 1753.4c0 7.92-6.42 14.35-14.35 14.35-7.92 0-14.34-6.43-14.34-14.35s6.42-14.34 14.34-14.34c7.93 0 14.35 6.42 14.35 14.34" />
                                                <path d="m3075.5 3236c0 7.93-6.42 14.36-14.34 14.36s-14.35-6.43-14.35-14.36c0-7.92 6.43-14.34 14.35-14.34s14.34 6.42 14.34 14.34" />
                                                <path d="m3075.5 3117.2c0 7.93-6.42 14.35-14.34 14.35s-14.35-6.42-14.35-14.35c0-7.92 6.43-14.34 14.35-14.34s14.34 6.42 14.34 14.34" />
                                                <path d="m3075.5 2998.4c0 7.93-6.42 14.35-14.34 14.35s-14.35-6.42-14.35-14.35c0-7.92 6.43-14.34 14.35-14.34s14.34 6.42 14.34 14.34" />
                                                <path d="m3075.5 2879.6c0 7.93-6.42 14.35-14.34 14.35s-14.35-6.42-14.35-14.35c0-7.92 6.43-14.34 14.35-14.34s14.34 6.42 14.34 14.34" />
                                                <path d="m3075.5 2760.8c0 7.93-6.42 14.35-14.34 14.35s-14.35-6.42-14.35-14.35c0-7.92 6.43-14.34 14.35-14.34s14.34 6.42 14.34 14.34" />
                                                <path d="m3075.5 2642.1c0 7.92-6.42 14.35-14.34 14.35s-14.35-6.43-14.35-14.35 6.43-14.34 14.35-14.34 14.34 6.42 14.34 14.34" />
                                                <path d="m3075.5 2523.3c0 7.92-6.42 14.34-14.34 14.34s-14.35-6.42-14.35-14.34 6.43-14.35 14.35-14.35 14.34 6.43 14.34 14.35" />
                                                <path d="m3075.5 2404.5c0 7.92-6.42 14.34-14.34 14.34s-14.35-6.42-14.35-14.34 6.43-14.35 14.35-14.35 14.34 6.43 14.34 14.35" />
                                                <path d="m3075.5 2285.7c0 7.92-6.42 14.34-14.34 14.34s-14.35-6.42-14.35-14.34c0-7.93 6.43-14.35 14.35-14.35s14.34 6.42 14.34 14.35" />
                                                <path d="m3075.5 2167c0 7.92-6.42 14.34-14.34 14.34s-14.35-6.42-14.35-14.34c0-7.93 6.43-14.35 14.35-14.35s14.34 6.42 14.34 14.35" />
                                                <path d="m3075.5 2048.2c0 7.92-6.42 14.34-14.34 14.34s-14.35-6.42-14.35-14.34c0-7.93 6.43-14.35 14.35-14.35s14.34 6.42 14.34 14.35" />
                                                <path d="m3075.5 1929.4c0 7.92-6.42 14.34-14.34 14.34s-14.35-6.42-14.35-14.34c0-7.93 6.43-14.35 14.35-14.35s14.34 6.42 14.34 14.35" />
                                                <path d="m3075.5 1810.6c0 7.92-6.42 14.35-14.34 14.35s-14.35-6.43-14.35-14.35c0-7.93 6.43-14.36 14.35-14.36s14.34 6.43 14.34 14.36" />
                                                <path d="m3179.9 3178.7c0 7.92-6.42 14.34-14.34 14.34-7.93 0-14.35-6.42-14.35-14.34 0-7.93 6.42-14.36 14.35-14.36 7.92 0 14.34 6.43 14.34 14.36" />
                                                <path d="m3179.9 3059.9c0 7.92-6.42 14.34-14.34 14.34-7.93 0-14.35-6.42-14.35-14.34 0-7.93 6.42-14.36 14.35-14.36 7.92 0 14.34 6.43 14.34 14.36" />
                                                <path d="m3179.9 2941.2c0 7.93-6.42 14.35-14.34 14.35-7.93 0-14.35-6.42-14.35-14.35 0-7.92 6.42-14.35 14.35-14.35 7.92 0 14.34 6.43 14.34 14.35" />
                                                <path d="m3179.9 2822.4c0 7.93-6.42 14.35-14.34 14.35-7.93 0-14.35-6.42-14.35-14.35 0-7.92 6.42-14.35 14.35-14.35 7.92 0 14.34 6.43 14.34 14.35" />
                                                <path d="m3179.9 2703.6c0 7.93-6.42 14.35-14.34 14.35-7.93 0-14.35-6.42-14.35-14.35 0-7.92 6.42-14.35 14.35-14.35 7.92 0 14.34 6.43 14.34 14.35" />
                                                <path d="m3179.9 2584.8c0 7.93-6.42 14.35-14.34 14.35-7.93 0-14.35-6.42-14.35-14.35 0-7.92 6.42-14.35 14.35-14.35 7.92 0 14.34 6.43 14.34 14.35" />
                                                <path d="m3179.9 2466c0 7.93-6.42 14.35-14.34 14.35-7.93 0-14.35-6.42-14.35-14.35 0-7.92 6.42-14.35 14.35-14.35 7.92 0 14.34 6.43 14.34 14.35" />
                                                <path d="m3179.9 2347.2c0 7.93-6.42 14.35-14.34 14.35-7.93 0-14.35-6.42-14.35-14.35 0-7.92 6.42-14.35 14.35-14.35 7.92 0 14.34 6.43 14.34 14.35" />
                                                <path d="m3179.9 2228.5c0 7.93-6.42 14.35-14.34 14.35-7.93 0-14.35-6.42-14.35-14.35 0-7.92 6.42-14.34 14.35-14.34 7.92 0 14.34 6.42 14.34 14.34" />
                                                <path d="m3179.9 2109.7c0 7.93-6.42 14.35-14.34 14.35-7.93 0-14.35-6.42-14.35-14.35 0-7.92 6.42-14.34 14.35-14.34 7.92 0 14.34 6.42 14.34 14.34" />
                                                <path d="m3179.9 1990.9c0 7.93-6.42 14.35-14.34 14.35-7.93 0-14.35-6.42-14.35-14.35 0-7.92 6.42-14.34 14.35-14.34 7.92 0 14.34 6.42 14.34 14.34" />
                                                <path d="m3179.9 1872.1c0 7.92-6.42 14.35-14.34 14.35-7.93 0-14.35-6.43-14.35-14.35s6.42-14.34 14.35-14.34c7.92 0 14.34 6.42 14.34 14.34" />
                                                <path d="m3179.9 1753.4c0 7.92-6.42 14.35-14.34 14.35-7.93 0-14.35-6.43-14.35-14.35s6.42-14.34 14.35-14.34c7.92 0 14.34 6.42 14.34 14.34" />
                                                <path d="m3178.4 3442.9c0 19.77-16.03 35.8-35.8 35.8s-35.81-16.03-35.81-35.8c0-19.78 16.04-35.82 35.81-35.82s35.8 16.04 35.8 35.82" />
                                                <path d="m1963.1 1634.7c0 19.78-16.04 35.81-35.81 35.81s-35.8-16.03-35.8-35.81c0-19.76 16.03-35.8 35.8-35.8s35.81 16.04 35.81 35.8" />
                                                <path d="m3178.4 1634.7c0 19.78-16.03 35.81-35.8 35.81s-35.81-16.03-35.81-35.81c0-19.76 16.04-35.8 35.81-35.8s35.8 16.04 35.8 35.8" />
                                                <path d="m2607.4 3407.1h20c-0.01 45.67-37 82.66-82.65 82.67-45.67-0.01-82.65-37.01-82.66-82.67 0.01-45.65 36.99-82.64 82.66-82.65 45.65 0.01 82.64 37 82.65 82.65h-40c-0.01-11.83-4.74-22.37-12.49-30.16-7.78-7.75-18.32-12.48-30.16-12.49-11.85 0.01-22.38 4.74-30.17 12.49-7.75 7.79-12.48 18.32-12.49 30.16 0.01 11.85 4.75 22.39 12.49 30.18 7.79 7.75 18.32 12.48 30.17 12.49 11.84-0.01 22.37-4.74 30.16-12.49 7.75-7.79 12.48-18.33 12.49-30.18h20" />
                                            </g>
                                        </g>
                                    </svg>

                                    {/* <Icon icon={puzzleCube20Regular} color='#FFFFFF' /> */}
                                </div>
                                <div className="navlist-menu-entry">
                                    <h4>AQQAsystem</h4>
                                    <p><Trans>Lösung für den langfristigen Einsatz</Trans></p>
                                </div>
                            </Link>
                        </li>
                        <li className="navlist-primary-entry">
                            <Link to={'/filtersysteme/tutorials'} language={language}>
                                <div className="navlist-menu-entry">
                                    <h4><Trans>Zu den Tutorials</Trans> <Icon className="icon-filtersysteme" icon={arrowSmallRight} color='#5ABEE6' /></h4>
                                    <p><Trans>Wir erklären unsere Lösungen</Trans></p>
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