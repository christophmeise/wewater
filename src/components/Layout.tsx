import { navigate } from '@reach/router';
import React, { Component } from 'react';
import 'semantic-ui-less/semantic.less';
import { Container, Icon, Menu } from 'semantic-ui-react';
import Footer from './Footer/Footer';
import Logo from './Logo/Logo';
import Navbar from './Navbar/Navbar';

interface Props {
    t: any;
    title: string;
    invertedHeader?: boolean;
    children?: any;
    headerOverlay?: any;
}

export default class Layout extends Component<Props, any> {
    constructor(props) {
        super(props);
        this.state = {
            sidebarOpened: false,
            location: {
                pathname: null,
            },
            theposition: 0,
            xDown: null,
            yDown: null
        };

        const isSSR = typeof window === 'undefined';
        if (!isSSR) {
            this.state = { location: window.location };
        }
        this.listenToScroll = this.listenToScroll.bind(this);
    }

    componentDidMount() {
        if (typeof window !== 'undefined') {
            document.body.addEventListener('scroll', this.listenToScroll);
            document.addEventListener('touchstart', this.handleTouchStart.bind(this), false);
            document.addEventListener('touchmove', this.handleTouchMove.bind(this), false);

        }
    }
    componentWillUnmount() {
        if (typeof window !== 'undefined') {
            document.body.removeEventListener('scroll', this.listenToScroll);
        }
    }

    getTouches(evt) {
        return evt.touches ||             // browser API
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

    listenToScroll(event) {
        const scrolled = document.body.scrollTop != null ? document.body.scrollTop : 0;
        this.setState({
            theposition: scrolled,
        });
    }

    handleNavigate = (e, { name }) => navigate(name);
    handleToggle = () => this.setState({ sidebarOpened: !this.state.sidebarOpened });
    handleSidebarHide = () => this.setState({ sidebarOpened: false });

    render() {
        const { children, invertedHeader, t } = this.props;
        const { sidebarOpened, location } = this.state;

        return (
            <React.Fragment>
                <Menu
                    className="responsive-mobile-container global-navbar-mobile"
                    fixed="top"
                    inverted
                    size="large"
                    borderless
                >
                    <Menu.Item
                        style={{ paddingBottom: '0', paddingTop: '0', alignSelf: 'center' }}
                        name="/"
                        link
                        onClick={this.handleNavigate}
                    >
                        <Logo />
                    </Menu.Item>
                    <Menu.Item position="right" onClick={this.handleToggle}>
                        <Icon style={{ margin: '0', color: 'white' }} name="sidebar" />
                    </Menu.Item>
                </Menu>
                <div className="flex-container">
                    <Menu
                        className="mobile-menu responsive-mobile-container"
                        style={{
                            minHeight: sidebarOpened ? '100vh' : '0vh',
                            background: sidebarOpened ? '#000000' : 'rgba(0, 0, 0, 0.5)',
                        }}
                        vertical
                        visible="true"
                        width="wide"
                    >
                        {(typeof window === 'undefined' ||
                            (typeof window !== 'undefined' && window.innerWidth < 768)) && (
                                <Navbar
                                    location={location}
                                    inverted={true}
                                    mobile={true}
                                    t={t}
                                />
                            )}
                    </Menu>

                    <div>
                        {(typeof window === 'undefined' ||
                            (typeof window !== 'undefined' && window.innerWidth >= 768)) && (
                                <section
                                    className={
                                        'responsive-desktop-container  global-navbar' +
                                        (!(this.state.theposition > 825)
                                            ? ' global-navbar-transparent'
                                            : ' global-navbar-scrolled')
                                    }
                                    style={{ padding: '0em 0em', marginBottom: '1em', border: 'none', textAlign: 'center' }}
                                >
                                    <Menu
                                        inverted={!(this.state.theposition > 825) && invertedHeader}
                                        pointing={false}
                                        secondary={true}
                                        size="large"
                                        borderless
                                    >
                                        <Container>
                                            <Navbar
                                                location={location}
                                                inverted={!(this.state.theposition > 825) && invertedHeader}
                                                mobile={false}
                                                t={t}
                                            />
                                        </Container>
                                    </Menu>
                                </section>
                            )}
                        <main role="main">
                            {children}
                            <Footer />
                        </main>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
