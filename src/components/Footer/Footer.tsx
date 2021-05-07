import { Link, Trans, useI18next } from 'gatsby-plugin-react-i18next';
import React from 'react';
import { Container, Grid, GridRow, Header, Icon, List } from 'semantic-ui-react';
import Logo from './../Logo/Logo';
import './footer.less';

const Footer = () => {
    const { language, t } = useI18next();
    return (
        <footer>
            <svg className="footer-overlay-svg" viewBox="0 0 1440 130" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M-0.500244 149L21.0998 140.722C42.6998 132.444 87.0998 115.889 130.3 113.13C173.5 110.37 217.9 121.407 261.1 118.648C305.5 115.889 348.7 99.3333 391.9 85.537C436.3 71.7407 479.5 60.7037 522.7 66.2222C567.1 71.7407 610.3 93.8148 653.5 107.611C697.9 121.407 741.1 126.926 785.5 118.648C828.7 110.37 871.9 88.2963 916.3 66.2222C959.5 44.1481 1002.7 22.0741 1047.1 19.3148C1090.3 16.5556 1133.5 33.1111 1177.9 38.6296C1221.1 44.1481 1265.5 38.6296 1308.7 30.3519C1351.9 22.0741 1396.3 11.037 1417.9 5.51852L1439.5 1.90735e-06V149H1417.9C1396.3 149 1351.9 149 1308.7 149C1265.5 149 1221.1 149 1177.9 149C1133.5 149 1090.3 149 1047.1 149C1002.7 149 959.5 149 916.3 149C871.9 149 828.7 149 785.5 149C741.1 149 697.9 149 653.5 149C610.3 149 567.1 149 522.7 149C479.5 149 436.3 149 391.9 149C348.7 149 305.5 149 261.1 149C217.9 149 173.5 149 130.3 149C87.0998 149 42.6998 149 21.0998 149H-0.500244Z" fill="#F6F9FC" />
            </svg>
            <div className="footer-main">
                <Container>
                    <div className="company-links">
                        <h4>WeWater</h4>
                        <div>
                            <a
                                href="https://www.facebook.com/wewater.org/"
                                target="_blank"
                                rel="noopener"
                                aria-label="Facebook"
                            >
                                <Icon className="hover-animate" size="large" name="facebook"></Icon>
                            </a>
                            <a
                                href="https://www.instagram.com/wewater_org/"
                                target="_blank"
                                rel="noopener"
                                aria-label="Instagram"
                            >
                                <Icon className="hover-animate" size="large" name="instagram"></Icon>
                            </a>
                            <a
                                href="https://www.youtube.com/channel/UC3zOjWWL5drSnoxzcj3-jqw"
                                target="_blank"
                                rel="noopener"
                                aria-label="Youtube"
                            >
                                <Icon className="hover-animate" size="large" name="youtube"></Icon>
                            </a>
                        </div>

                    </div>
                    <Grid centered stackable columns="3">
                        <Grid.Column>
                            <GridRow columns="1">
                                <Grid.Column className="footer-column">
                                    <Header className="footer-nav-header" as="h3" content={t('Hilf uns')} />
                                    <List link>
                                        <List.Item>
                                            <Link to={'/spenden'} language={language}><Trans>So kannst du spenden</Trans></Link>
                                        </List.Item>
                                        <List.Item>
                                            <Link to={'/unterstuetzen'} language={language}><Trans>So kannst du anderweitig unterstützen</Trans></Link>
                                        </List.Item>
                                        <List.Item>
                                            <Link to={'/shop'} language={language}><Trans>Hier kannst du unsere Wasserfilter kaufen</Trans></Link>
                                        </List.Item>
                                        <List.Item>
                                            <Link to={'/spenden'} language={language}><Trans>Spendenbescheinigung</Trans></Link>
                                        </List.Item>
                                    </List>
                                </Grid.Column>
                            </GridRow>
                        </Grid.Column>
                        <Grid.Column>
                            <GridRow>
                                <Grid.Column className="footer-column">
                                    <Header className="footer-nav-header" as="h3" content={t('Informationen')} />
                                    <List link>
                                        <List.Item>
                                            <Link to={'/presse'} language={language}><Trans>Presse</Trans></Link>
                                        </List.Item>
                                        <List.Item>
                                            <Link to={'/faq'} language={language}><Trans>FAQ</Trans></Link>
                                        </List.Item>
                                        <List.Item>
                                            <a href='mailto:hi@wewater.org'><Trans>Fragen? Schreib an hi@wewater.org</Trans></a>
                                        </List.Item>
                                    </List>
                                </Grid.Column>
                            </GridRow>
                        </Grid.Column>
                        <Grid.Column>
                            <GridRow>
                                <Grid.Column className="footer-column">
                                    <Header className="footer-nav-header" as="h3" content={t('Du willst direkt handeln? Spende jetzt!')} />
                                    <p>
                                        WeWater gUG <br />
                                        Bank für Sozialwirtschaft <br />
                                        IBAN: DE86 1002 0500 0001 6026 01 <br />
                                        BIC-/SWIFT: BFSWDE33BER <br />
                                        <br />
                                        <Trans>Gib bitte Vor- und Nachnamen sowie die Art deiner Spende (z.B. monatliche Spende oder einmalige Spende oder Projektspende) an.</Trans>
                                    </p>
                                </Grid.Column>
                            </GridRow>
                        </Grid.Column>
                    </Grid>
                </Container>
            </div>
            <div className="footer-secondary">
                <Container>
                    <div className="footer-secondary-grid">
                        <Link to={'/'} language={language} aria-label="WeWater">
                            <Logo />
                        </Link>
                        <p className="footer-trademark-link footer-link">
                            © 2021, WeWater gUG. All rights reserved.
                        </p>
                        <p className="footer-link footer-link-right">
                            <Link to={'/impressum'} language={language}><Trans>Impressum</Trans></Link>
                            <span className="footer-link-seperator">|</span>
                            <Link to={'/dataprotection'} language={language}><Trans>Datenschutz</Trans></Link>
                        </p>
                    </div>
                </Container>
            </div >
        </footer >
    );
};

export default Footer;
