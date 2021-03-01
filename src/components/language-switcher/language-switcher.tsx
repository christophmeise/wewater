import { useI18next } from 'gatsby-plugin-react-i18next';
import React from 'react';
import { Flag, FlagNameValues, Menu } from 'semantic-ui-react';
import './language-switcher.less';

const LanguageSwitcher = ({ mobile }) => {

    /*     handleChangeLanguage(e, data) {
            i18n.changeLanguage(data.value);
            this.navigateToCurrentLocationWithLocal();
        } */

    function switchLanguage(language, path, changeLanguage, navigate) {
        if (language === 'de') {
            changeLanguage('en');
        } else {
            changeLanguage('de');
        }
        navigate(path);
        //this.navigateToCurrentLocationWithLocal();
    }
    /* 
        navigateToCurrentLocationWithLocal() {
            let pathSplit = location.pathname.split('/');
            pathSplit.splice(0, 1);
            let purePath;
            if (pathSplit[0] === 'en') {
                pathSplit.splice(0, 1);
                purePath = '/' + pathSplit.join('/');
            } else {
                purePath = location.pathname;
            }
            if (i18n.language != 'de') {
                navigate('/' + i18n.language + purePath + location.search);
            } else {
                navigate(purePath + location.search);
            }
        } */

    const { language, originalPath, changeLanguage, navigate, t } = useI18next();
    const languages = [
        { flag: 'us', key: 'English', text: 'English', value: 'en' },
        { flag: 'de', key: 'Deutsch', text: 'Deutsch', value: 'de' },
    ];

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
