import { graphql } from 'gatsby';
import React from 'react';
import { Container } from 'semantic-ui-react';
import Layout from '../components/Layout';
import PlainHeader from '../components/PlainOverlay/plain-header';
import SEO from '../components/seo';
import withI18next from '../components/withI18next/withI18next';

interface Props {
    pageContext: any;
    t: any;
    data: {
        site: {
            siteMetadata: {
                title: string;
                description: string;
            };
        };
    };
}

class NotFound extends React.Component<Props, any> {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            pageContext: { locale },
            t,
        } = this.props;
        const data = this.props.data;
        const siteTitle = data.site.siteMetadata.title;
        const description = data.site.siteMetadata.description;
        return (
            <Layout title={siteTitle} t={t}>
                <SEO title="NotFound" />
                <Container className="global-header-padding">
                    <PlainHeader content={HeaderContent()} />
                    <div className="main-content-sections">
                        <Container>
                            <section>

                            </section>
                        </Container>
                    </div>
                </Container>
            </Layout>
        );
    }
}

const HeaderContent = () => {
    return (
        <div>
            <h1 className="header-overlay-headline">NotFound</h1>
        </div>
    );
};

export const pageQuery = graphql`
    query {
        site {
            siteMetadata {
                title
                description
            }
        }
    }
`;
export default withI18next(['common'])(NotFound);
