import { useI18next, useTranslation } from 'gatsby-plugin-react-i18next';
import React from 'react';

export function useTranslationHOC(Component) {
    return function WrappedComponent(props) {
        const { t } = useTranslation();
        const { navigate, language, i18n } = useI18next();
        return <Component {...props} t={t} navigate={navigate} language={language} i18n={i18n} />;
    }
}