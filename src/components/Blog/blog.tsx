import { Link } from "gatsby";
import { Trans } from "gatsby-plugin-react-i18next";
import React from "react";
import { Button, Container, Header, Icon } from "semantic-ui-react";
import SwiperCore from "swiper";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/less/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/less";
import BlogPostCard from "../BlogPostCard/blog-post-card";
import "./blog.less";

const SectionBlog = ({ slidesPerView, posts }) => {
  posts = posts.slice(0, 10);

  SwiperCore.use([Pagination, Autoplay]);

  return (
    <section className="bg-secondary main-section-no-margin">
      <Container>
        <Header
          data-sal="slide-up"
          data-sal-delay="0"
          data-sal-duration="300"
          data-sal-easing="ease"
          textAlign="left"
          className="global-flex-column global-no-margin"
        >
          <h3 className={`global-subtitle text-primary`}>
            <Trans>Aktuelle News</Trans>
          </h3>
          <h2 className="global-headline">
            <Trans>Updates zu den Projekten</Trans>
          </h2>
        </Header>
      </Container>
      <div>
        <Swiper
          spaceBetween={25}
          slidesPerView={slidesPerView}
          autoplay={{ delay: 10000 }}
          pagination={{ clickable: true, dynamicBullets: true }}
          className="swiper-container-blog"
        >
          {posts.map((post) => {
            return (
              <SwiperSlide key={post.node.id}>
                <BlogPostCard
                  key={post.node.id}
                  post={post.node}
                ></BlogPostCard>
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
        <Link to="/blog">
          <Button
            secondary={true}
            basic
            inverted={false}
            size="medium"
            className="rounded shadow hover-animate"
          >
            <Icon
              name="grid layout"
              className="left"
              style={{ opacity: "1" }}
            ></Icon>
            <Trans>Alle Blogeinträge</Trans>
          </Button>
        </Link>
      </Container>
    </section>
  );
};

export default SectionBlog;
