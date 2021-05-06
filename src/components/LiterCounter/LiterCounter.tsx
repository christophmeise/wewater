import tintIcon from '@iconify/icons-fa-solid/tint';
import { Icon as IconifyIcon } from '@iconify/react';
import { Link, Trans } from 'gatsby-plugin-react-i18next';
import React, { PureComponent } from 'react';
import { Button, Icon, Popup } from 'semantic-ui-react';

export default class LiterCounter extends PureComponent<any, any> {

    literInterval;

    constructor(props: any) {
        super(props);
        const timeDiff = new Date().getTime() - new Date('2019-03-01').getTime();
        const minutes = timeDiff / 1000 / 60;
        const liter = minutes * 11.395;
        this.state = {
            liter: liter
        }

        if (typeof window !== 'undefined' && window.innerWidth > 767) {
            this.literInterval = setInterval(() => this.setState({ liter: this.state.liter + 0.1899 }), 1000);
        }
    }

    componentWillUnmount() {
        if (this.literInterval != null) {
            clearInterval(this.literInterval);
        }
    }

    format = new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2 });

    render() {

        const { language } = this.props;

        return (
            <div>
                <div className="main-overlay-infobox rounded">
                    <div className="main-overlay-infobox-text">
                        <h3>{this.format.format(this.state.liter.toFixed(2))}</h3>
                    </div>
                    <div>
                        <p><Trans>Liter Trinkwasser werden pro Jahr gespendet</Trans></p>
                        <Popup
                            style={{ zIndex: 99999999999 }}
                            trigger={
                                <Button secondary basic inverted className="rounded popup-infotext-trigger" size="tiny" icon='info' aria-label="Infotext Litercounter" />
                            }
                        >
                            <Popup.Content>
                                <Trans>Basierend auf der durchschnittlichen Filterleistung unserer sich im Einsatz befindenden Wasserfilter. Die Filterleistung unserer Systeme ist am Anfang ihrer Lebenszyklen bis zu doppelt so hoch. Die Zahl ist bewusst konservativ angegeben, im Realbetrieb kann die Filterleistung noch höher ausfallen.</Trans>
                            </Popup.Content>
                        </Popup>
                    </div>
                    <div>
                        <Link to="/spenden">
                            <Button primary className="rounded">
                                <IconifyIcon icon={tintIcon} style={{ opacity: '1', margin: '0em 0.42857143em 0em -0.21428571em' }} />
                                <Trans>Ich will helfen!</Trans>
                            </Button>
                        </Link>
                        {language === 'de' ?
                            <a href="https://wewater.us20.list-manage.com/subscribe/post?u=24746d4c48c610cc73f27cb63&id=67239df000" target="_blank">
                                <Button
                                    secondary={true}
                                    basic
                                    inverted={true}
                                    size="medium"
                                    className="rounded"
                                >
                                    <Icon name="newspaper outline" className="left" style={{ opacity: '1' }}></Icon>
                                    <Trans>Alle News in mein Postfach</Trans>
                                </Button>
                            </a>
                            :
                            <Link to="/projekte">
                                <Button
                                    secondary={true}
                                    basic
                                    inverted={true}
                                    size="medium"
                                    className="rounded"
                                >
                                    <Icon name="grid layout" className="left" style={{ opacity: '1' }}></Icon>
                                    <Trans>Discover our projects</Trans>
                                </Button>
                            </Link>
                        }

                    </div>
                </div>
            </div>
        )
    }
}
