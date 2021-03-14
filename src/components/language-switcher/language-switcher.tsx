import { useI18next } from 'gatsby-plugin-react-i18next';
import React from 'react';
import { Flag, FlagNameValues, Menu } from 'semantic-ui-react';
import './language-switcher.less';

const LanguageSwitcher = ({ mobile }) => {

    function switchLanguage(language, path, changeLanguage, navigate) {
        if (language === 'de') {
            changeLanguage('en');
        } else {
            changeLanguage('de');
        }
        navigate(path);
    }

    const { language, originalPath, changeLanguage, navigate, t } = useI18next();

    return (
        <Menu.Item onClick={switchLanguage.bind(this, language, originalPath, changeLanguage, navigate)}>
            {LanuageSwitcherMobile(language, t)}
        </Menu.Item>
    );
}

const LanuageSwitcherMobile = (language, t: any) => {
    let flagCode: FlagNameValues = 'de';
    if (language === 'en') {
        flagCode = 'us';
    }
    return (
        <span className="language-switcher-mobile">
            <Flag name={flagCode} />
            {t('current-language')}
        </span>
    );
};

export default LanguageSwitcher;
