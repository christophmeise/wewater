// i18next-extract-mark-ns-start page_presse
import imageIcon from '@iconify/icons-fa-solid/image';
import drawText24Regular from '@iconify/icons-fluent/draw-text-24-regular';
import { Icon } from '@iconify/react';
import { graphql } from 'gatsby';
import { GatsbyImage } from "gatsby-plugin-image";
import React from 'react';
import { Trans } from 'react-i18next';
import { Button, Container, Grid, GridColumn, Header } from 'semantic-ui-react';
import { BlogPostCardSimple } from '../components/BlogPostCard/blog-post-card';
import HeaderOverlay from '../components/HeaderOverlay/header-overlay';
import Layout from '../components/Layout/Layout';
import SEO from '../components/seo';
import { useTranslationHOC } from '../components/useTranslationHOC/useTranslationHOC';
import './presse.less';

interface Props {
    t: any;
    data: any;
}

class PressePage extends React.Component<Props, any> {
    constructor(props) {
        super(props);
    }

    render() {
        const { t, data } = this.props;

        const pageData = data.pageContent?.edges[0]?.node?.content;
        const sources = data.ansprechpartner.childImageSharp.gatsbyImageData;
        const headerImage = data.headerImage.childImageSharp.gatsbyImageData;

        let posts = data.blogposts?.edges;

        return (
            <Layout>
                <SEO title={t('PresseSEOTitle')} description={t('PresseSEODescription')} />
                <HeaderOverlay content={<OverlayContent t={t} inverted={true} />} darken={true} inverted={false} sources={headerImage} width={16} />
                <Container className="global-header-padding">
                    <div className="main-content-sections">
                        <Grid columns="2" stackable>
                            <GridColumn width="8">
                                <section className="presse-section">
                                    <h2><Trans>Presse</Trans></h2>
                                    <p>
                                        <Trans>Möchtest du mehr über unsere ehrenamtliche Arbeit erfahren? Bist du Medienschaffender und möchtest über uns berichten, brauchst Hintergrundinformationen oder hast einen Projektvorschlag?
                                        Hier findest du Kontaktmöglichkeiten, Ansprechpartner, Pressemitteilungen sowie weitere Pressematerialien wie Logos und Fotos.
                                                </Trans>
                                    </p>
                                    <br />
                                    <a href="https://www.dropbox.com/sh/hnpshh4sw3x30dq/AACy2I-sBYeIIZi4xv5huEEya?dl=0" target="_blank">
                                        <Button
                                            secondary
                                            basic
                                            inverted={false}
                                            size="medium"
                                            className="rounded shadow hover-animate presse-btn-icon"
                                        >
                                            <Icon icon={drawText24Regular} />
                                            <Trans>Logos</Trans>
                                        </Button>
                                    </a>
                                    <a href="https://www.dropbox.com/sh/nddqbymudy3x7xb/AAAkAePDC9RviQs-kPpPYwU-a?dl=0" target="_blank">
                                        <Button
                                            secondary
                                            basic
                                            inverted={false}
                                            size="medium"
                                            className="rounded shadow hover-animate presse-btn-icon"
                                        >
                                            <Icon icon={imageIcon} />
                                            <Trans>Bildmaterial</Trans>
                                        </Button>
                                    </a>
                                </section>
                                <section>
                                    <Header
                                        data-sal="slide-up"
                                        data-sal-delay="0"
                                        data-sal-duration="300"
                                        data-sal-easing="ease"
                                        textAlign='left'
                                        className="global-flex-column global-no-margin"
                                    >
                                        <h3 className={`global-subtitle text-primary`}><Trans>WeWater in den Medien</Trans></h3>
                                        <h2 className="global-headline"><Trans>Pressemitteilungen</Trans></h2>
                                    </Header>
                                    {posts
                                        .filter((post) => post.node.title.length > 0)
                                        .map(({ node: post }) => {
                                            return (
                                                <div key={post.id} className="blog-post-card-wrapper" data-sal="slide-up" data-sal-delay="0" data-sal-duration="300" data-sal-easing="ease">
                                                    <BlogPostCardSimple post={post}></BlogPostCardSimple>
                                                </div>
                                            );
                                        })}
                                </section>
                            </GridColumn>
                            <GridColumn width="8">
                                <section className="presse-section">
                                    <Grid columns="2" stackable>
                                        <GridColumn>
                                            <GatsbyImage
                                                image={sources}
                                                className="img-fluid rounded shadow"
                                                alt="Ansprechpartner" />
                                        </GridColumn>
                                        <GridColumn>
                                            <h3><Trans>Ansprechpartner</Trans></h3>
                                            <p><Trans>Medienanfragen bitte an</Trans></p>
                                            <strong>Thilo Kunz</strong>
                                            <p>thilo.kunz[at]wewater.org</p>
                                        </GridColumn>
                                    </Grid>

                                </section>
                                <section>
                                    <p dangerouslySetInnerHTML={{ __html: pageData }}></p>
                                </section>
                            </GridColumn>
                        </Grid>
                    </div>
                </Container>
            </Layout>
        );
    }
}

class OverlayContent extends React.Component<any, any> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        const { inverted, t } = this.props;

        return (
            <div className="header-overlay-headline-container">
                <h1
                    className={`header-overlay-headline ${inverted ? 'header-overlay-headline-inverted' : ''}`}
                    style={{ marginBottom: '1.5rem' }}
                >
                    <Trans>Presse und WeWater in den Medien</Trans>
                </h1>
            </div>
        );
    }
}

export const pageQuery = graphql`query ($language: String!) {
  locales: allLocale(filter: {language: {eq: $language}}) {
    ...GetTranslations
  }
  blogposts: allWpPost(
    filter: {categories: {nodes: {elemMatch: {name: {in: ["Presse", "Press"]}}}}, language: {slug: {eq: $language}}}
    sort: {fields: date, order: DESC}
  ) {
    ...GetBlogposts
  }
  ansprechpartner: file(relativePath: {eq: "images/team/thilo.jpg"}) {
    childImageSharp {
      gatsbyImageData(width: 600, quality: 100, layout: CONSTRAINED)
    }
  }
  headerImage: file(relativePath: {eq: "images/presse/banner1.jpg"}) {
    childImageSharp {
      gatsbyImageData(quality: 100, layout: FULL_WIDTH)
    }
  }
  pageContent: allWpPage(
    filter: {title: {in: ["Pressespiegel – WeWater in den Medien", "Press – WeWater in Media"]}, language: {slug: {eq: $language}}}
  ) {
    edges {
      node {
        id
        title
        content
        language {
          code
        }
      }
    }
  }
}
`;

export default useTranslationHOC(PressePage);
