import { graphql, Link, useStaticQuery } from 'gatsby';
import React from 'react';
import { Button, Container, Header, Icon } from 'semantic-ui-react';
import SwiperCore, { Autoplay, Pagination } from 'swiper';
import 'swiper/components/pagination/pagination.less';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.less';
import BlogPostCard from '../BlogPostCard/blog-post-card';
import './blog.less';

const SectionBlog = ({ slidesPerView }) => {
    const data = useStaticQuery(
        graphql`
            query LatestBlogQuery {
                site {
                    siteMetadata {
                        title
                    }
                }
                german: allWpPost(
                    sort: { fields: date, order: DESC }
                ) {
                    ...GetBlogposts
                }
            }
        `,
    );


    let posts = data.german.edges;

    posts = posts
        .filter((post) => new Date(post.node.date) <= new Date())

    posts = posts.slice(0, 10);

    SwiperCore.use([Pagination, Autoplay]);

    return (
        <section className="bg-secondary main-section" style={{ padding: '3rem 0rem' }}>
            <Container>
                <Header
                    data-sal="slide-up"
                    data-sal-delay="0"
                    data-sal-duration="300"
                    data-sal-easing="ease"
                    textAlign='left'
                    className="global-flex-column global-no-margin"
                >
                    <h3 className={`global-subtitle text-primary`}>Aktuelle News</h3>
                    <h2 className="global-headline">Updates zu den Projekten</h2>
                </Header>
            </Container>
            <div>
                <Swiper
                    spaceBetween={25}
                    slidesPerView={slidesPerView}
                    /* autoplay={{ delay: 10000 }} */
                    pagination={{ clickable: true, dynamicBullets: true }}
                    onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)}
                >
                    {posts.map((post) => {
                        return (
                            <SwiperSlide key={post.node.id}>
                                <BlogPostCard key={post.node.id} post={post.node}></BlogPostCard>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>

            <Container
                textAlign="center"
                className="main-button-container"
                data-sal="slide-up"
                data-sal-delay="0"
                data-sal-duration="300"
                data-sal-easing="ease"
            >
                <Link to='/blog'>
                    <Button
                        secondary={true}
                        basic
                        inverted={false}
                        size="medium"
                        className="rounded shadow hover-animate"
                    >
                        <Icon name="grid layout" className="left" style={{ opacity: '1' }}></Icon>
                            Alle Blogeinträge
                        </Button>
                </Link>
            </Container>
        </section >
    );
};

export default SectionBlog;
