import { Link } from "gatsby";
import { Trans } from "gatsby-plugin-react-i18next";
import React from "react";
import chevronLeft from "@iconify/icons-fa-solid/chevron-left";
import chevronRight from "@iconify/icons-fa-solid/chevron-right";
import { Icon } from "@iconify/react";
import {
  Button,
  Container,
  Header,
  Icon as SemanticIcon,
} from "semantic-ui-react";
import SwiperCore from "swiper";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/less/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/less";
import BlogPostCard from "../BlogPostCard/blog-post-card";
import "./blog.less";
import { useRef } from "react";
import { useCallback } from "react";

const SectionBlog = ({ slidesPerView, posts }) => {
  const sliderRef = useRef<any>(null);

  posts = posts.slice(0, 10);

  SwiperCore.use([Pagination, Autoplay]);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

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
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <h3 className={`global-subtitle text-primary`}>
                <Trans>Aktuelle News</Trans>
              </h3>
              <h2 className="global-headline">
                <Trans>Updates zu den Projekten</Trans>
              </h2>
            </div>
            <div style={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
              <button
                style={{
                  backgroundColor: "transparent",
                  border: "1px solid #000D3E",
                  borderRadius: "50%",
                  padding: "0.7rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onClick={handlePrev}
              >
                <div
                  style={{
                    height: "20px",
                    width: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon icon={chevronLeft} size={20} />
                </div>
              </button>
              <button
                style={{
                  backgroundColor: "transparent",
                  border: "1px solid #000D3E",
                  borderRadius: "50%",
                  padding: "0.7rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onClick={handleNext}
              >
                <div
                  style={{
                    height: "20px",
                    width: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon icon={chevronRight} size={20} />
                </div>
              </button>
            </div>
          </div>
        </Header>
      </Container>
      <div>
        <Swiper
          spaceBetween={25}
          slidesPerView={slidesPerView}
          autoplay={{ delay: 10000 }}
          pagination={{ clickable: true, dynamicBullets: true }}
          className="swiper-container-blog"
          ref={sliderRef}
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
            <SemanticIcon
              name="grid layout"
              className="left"
              style={{ opacity: "1" }}
            ></SemanticIcon>
            <Trans>Alle Blogeinträge</Trans>
          </Button>
        </Link>
      </Container>
    </section>
  );
};

export default SectionBlog;
