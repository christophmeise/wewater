import './src/styles/global.less';

export { wrapRootElement } from './src/apollo/wrap-root-element';

export const shouldUpdateScroll = () => {
  document.body.scrollTop = 0;
};

export const onRouteUpdate = () => {
  navigator.serviceWorker.register('/sw.js').then((reg) => {
    reg.update();
  });
};

export const onServiceWorkerUpdateReady = () => {
  window.location.reload(true)
};