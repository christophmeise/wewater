import "./src/styles/global.less";

export { wrapRootElement } from "./src/apollo/wrap-root-element";

/* window.process = {
  env: {
    NODE_ENV: 'development'
  }
} */

export const shouldUpdateScroll = () => {
  document.body.scrollTop = 0;
};

// The betterplace donation iframe posts "bpScrollTop" when the user moves to the next
// form step. Since the iframe is tall, scroll the page back up to the top of the form
// (same behaviour as betterplace's own embed script).
export const onClientEntry = () => {
  window.addEventListener("message", (event) => {
    if (event.data !== "bpScrollTop") return;
    if (!/(^|\.)betterplace\.org$/.test(new URL(event.origin).hostname)) return;
    const frames = document.querySelectorAll('iframe[src*="betterplace.org"]');
    const frame = Array.from(frames).find((f) => f.contentWindow === event.source);
    if (!frame) return;
    const top = frame.getBoundingClientRect().top;
    if (top < 0) window.scrollTo(0, window.scrollY + top - 80);
  });
};
