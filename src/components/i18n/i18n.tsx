import i18n from 'i18next';
export const defaultLocale = 'en';
export const defaultNamespace = 'common';

export const options = {
    fallbackLng: defaultLocale,
    ns: [defaultNamespace, 'contact', 'faq'],
    defaultNS: defaultNamespace,
    returnObjects: true,
    debug: process.env.NODE_ENV === 'development',

    interpolation: {
        escapeValue: false, // not needed for react!!
    },

    react: {
        wait: true,
        useSuspense: false,
    },

    initImmediate: false, // Important for SSR to work
};
export default () => {
    i18n.init(options);

    return i18n;
};
