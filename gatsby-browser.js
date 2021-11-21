import './src/styles/global.less';

export { wrapRootElement } from './src/apollo/wrap-root-element';

/* window.process = {
  env: {
    NODE_ENV: 'development'
  }
} */

export const shouldUpdateScroll = () => {
  document.body.scrollTop = 0;
};