import { Link } from 'gatsby';
import React from 'react';
import { Container, Grid, GridRow, Header, Icon, List } from 'semantic-ui-react';
import { getPathWithLocale } from '../navigateWithLocale';
import Logo from './../Logo/Logo';
import './footer.less';

const Footer = () => {
    return (
        <footer>
            <div className="footer-main">
                <Container>
                    <Grid centered stackable columns="3">
                        <Grid.Column>
                            <GridRow columns="1">
                                <Grid.Column style={{ display: 'inline-block', verticalAlign: 'top' }}>
                                    <Header className="footer-nav-header" as="h3" content="Hilf uns" />
                                    <List link>
                                        <List.Item>
                                            <Link to={getPathWithLocale('/spenden')}>So kannst du spenden</Link>
                                        </List.Item>
                                        <List.Item>
                                            <Link to="/blog">So kannst du anderweitig unterstützen</Link>
                                        </List.Item>
                                        <List.Item>
                                            <Link to="/shop">Hier kannst du unsere Wasserfilter kaufen</Link>
                                        </List.Item>
                                        <List.Item>
                                            <Link to="/contact">Spendenbescheinigung</Link>
                                        </List.Item>
                                    </List>
                                </Grid.Column>
                            </GridRow>
                        </Grid.Column>
                        <Grid.Column>
                            <GridRow>
                                <Grid.Column style={{ display: 'inline-block', verticalAlign: 'top' }}>
                                    <Header className="footer-nav-header" as="h3" content="Informationen" />
                                    <List link>
                                        <List.Item>
                                            <Link to="/impressum">Pressespiegel – WeWater in den Medien</Link>
                                        </List.Item>
                                        <List.Item>
                                            <Link to="/dataprotection">Presse</Link>
                                        </List.Item>
                                        <List.Item>
                                            <Link to="/dataprotection">Partner</Link>
                                        </List.Item>
                                        <List.Item>
                                            <Link to="/dataprotection">FAQ</Link>
                                        </List.Item>
                                        <List.Item>
                                            <Link to="/dataprotection">Fragen? Schreib an hi@wewater.org</Link>
                                        </List.Item>
                                    </List>
                                </Grid.Column>
                            </GridRow>
                        </Grid.Column>
                        <Grid.Column>
                            <GridRow>
                                <Grid.Column style={{ display: 'inline-block', verticalAlign: 'top' }}>
                                    <Header className="footer-nav-header" as="h3" content="Informationen" />
                                    <p>
                                        Du willst direkt handeln? Spende jetzt!

                                        WeWater gUG
                                        Bank für Sozialwirtschaft
                                        IBAN: DE86 1002 0500 0001 6026 01
                                        BIC-/SWIFT: BFSWDE33BER

                                        Gib bitte Vor- und Nachnamen sowie den Verwendungszweck deiner Spende (z.B. monatliche Spende, einmalige Spende oder Projektspende) an.
                                    </p>
                                </Grid.Column>
                            </GridRow>
                        </Grid.Column>
                    </Grid>
                </Container>
            </div>
            <div className="footer-secondary">
                <Container>
                    <Grid inverted>
                        <Grid.Row centered columns="equal">
                            <Grid.Column>
                                <Logo />
                            </Grid.Column>
                            <Grid.Column only="tablet computer" textAlign="center" verticalAlign="middle">
                                <a
                                    className="footer-trademark-link"
                                    href="https://explorechristoph.com"
                                    target="_blank"
                                    rel="noopener"
                                >
                                    © 2021, ExploreChristoph. All rights reserved.
                                </a>
                            </Grid.Column>
                            <Grid.Column textAlign="right" verticalAlign="middle">
                                <div>
                                    <a
                                        href="https://www.facebook.com/wewater.org/"
                                        target="_blank"
                                        rel="noopener"
                                        aria-label="Facebook"
                                    >
                                        <Icon className="hover-animate" size="large" name="facebook" inverted></Icon>
                                    </a>
                                    <a
                                        href="https://www.instagram.com/wewater_org/"
                                        target="_blank"
                                        rel="noopener"
                                        aria-label="Instagram"
                                    >
                                        <Icon className="hover-animate" size="large" name="instagram" inverted></Icon>
                                    </a>
                                    <a
                                        href="https://www.youtube.com/channel/UC3zOjWWL5drSnoxzcj3-jqw"
                                        target="_blank"
                                        rel="noopener"
                                        aria-label=">outube"
                                    >
                                        <Icon className="hover-animate" size="large" name="youtube" inverted></Icon>
                                    </a>
                                </div>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </div>
        </footer>
    );
};

export default Footer;
