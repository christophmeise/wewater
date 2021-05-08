import './src/styles/global.less';

export { wrapRootElement } from './src/apollo/wrap-root-element';

export const shouldUpdateScroll = () => {
  document.body.scrollTop = 0;
};