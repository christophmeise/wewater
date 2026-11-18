import shieldCheck from '@iconify/icons-bi/shield-check';
import { Icon } from '@iconify/react';
import { Link, Trans, useI18next } from 'gatsby-plugin-react-i18next';
import React from 'react';
import { Button, Container, Grid, GridColumn, Header } from 'semantic-ui-react';
import BetterplaceDonationIframe from '../BetterplaceDonationIframe/betterplace-donation-iframe';
import './spenden-widget.less';

// Documents linked from the tax section. Update these when new versions are uploaded to WordPress.
const ZUWENDUNGSBESTAETIGUNG_URL =
    'https://www.wewaterbackend.org/wp-content/uploads/2026/11/Bestaetigung_ueber_Zuwendungen_fuer_Finanzamt_WeWater_11_26.pdf';
const SATZUNG_URL = 'https://www.wewaterbackend.org/wp-content/uploads/2026/11/Satzung_WeWater_2026.pdf';

const TRUST_KEYS = ['spenden.trust1', 'spenden.trust2', 'spenden.trust3', 'spenden.trust4'];
const IMPACT_KEYS = ['spenden.impact1', 'spenden.impact2', 'spenden.impact3', 'spenden.impact4'];

const textComponents = {
    strong: <strong />,
    br: <br />,
    docLink: <a href={ZUWENDUNGSBESTAETIGUNG_URL} target="_blank" rel="noopener noreferrer" />,
    statuteLink: <a href={SATZUNG_URL} target="_blank" rel="noopener noreferrer" />,
    mailLink: <a href="mailto:hi@wewater.org" />,
};

const T = ({ k }: { k: string }) => <Trans i18nKey={k} components={textComponents} />;

interface Props {
    fullMode: boolean;
    hideForm: boolean;
}

const SpendenWidget = ({ fullMode, hideForm }: Props) => {
    const { language } = useI18next();

    return (
        <section className="main-section spenden-widget-container">
            <Container>
                <Grid columns="2" stackable>
                    <GridColumn>
                        <article className="spenden-widget-left">
                            <Header
                                data-sal="slide-up"
                                data-sal-delay="0"
                                data-sal-duration="300"
                                data-sal-easing="ease"
                                textAlign='left'
                                className="global-flex-column global-no-margin"
                            >
                                <h3 className={`global-subtitle text-primary`}><Trans>Werde Dauerspender*in</Trans></h3>
                                <h2 className="global-headline"><T k="spenden.headline" /></h2>
                            </Header>
                            <h4><T k="spenden.intro" /></h4>
                            <ul className="spenden-list">
                                {TRUST_KEYS.map((key) => (
                                    <li key={key}>
                                        <div><Icon icon={shieldCheck} /></div>
                                        <p><T k={key} /></p>
                                    </li>
                                ))}
                            </ul>
                            <div className="spenden-info-box">
                                <h5><T k="spenden.impact.headline" /></h5>
                                <ul className="spenden-impact-list">
                                    {IMPACT_KEYS.map((key) => (
                                        <li key={key}><T k={key} /></li>
                                    ))}
                                </ul>
                            </div>
                            <div className="spenden-info-box">
                                <h5><T k="spenden.usage.headline" /></h5>
                                <p><T k="spenden.usage1" /></p>
                                <p><T k="spenden.usage2" /></p>
                            </div>
                            {fullMode === true && (
                                <div className="spenden-info-box">
                                    <h5><T k="spenden.tax.headline" /></h5>
                                    <p><T k="spenden.tax1" /></p>
                                    <p><T k="spenden.tax2" /></p>
                                    {/* German donors don't need the "taxpayers in Germany" hint */}
                                    {language !== 'de' && <p><T k="spenden.taxForeign" /></p>}
                                    <p><T k="spenden.taxSmall" /></p>
                                    <p><T k="spenden.taxLarge" /></p>
                                    <p><T k="spenden.taxStatute" /></p>
                                </div>
                            )}
                        </article>
                    </GridColumn>
                    <GridColumn>
                        {!hideForm && <BetterplaceDonationIframe />}
                        {hideForm &&
                            <div className="spenden-button-center">
                                <Link to='/spenden'>
                                    <Button
                                        primary
                                        inverted={false}
                                        size="medium"
                                        className="rounded shadow hover-animate"
                                    >
                                        <Trans>Zur Spendenseite</Trans>
                                    </Button>
                                </Link>
                            </div>
                        }
                    </GridColumn>
                </Grid>
            </Container>
        </section>
    );
};

export default SpendenWidget;
