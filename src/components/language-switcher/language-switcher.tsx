import { useI18next } from 'gatsby-plugin-react-i18next';
import React from 'react';
import { Dropdown, FlagNameValues, Menu } from 'semantic-ui-react';
import './language-switcher.less';

const LanguageSwitcher = ({ mobile, t }) => {
    return (
        <Menu.Item>
            {LanuageSwitcherMobile(t)}
        </Menu.Item>
    );
}

const LanuageSwitcherMobile = (t: any) => {
    const { language, originalPath, changeLanguage, navigate } = useI18next();

    function switchLanguage(event, lang) {
        if (event.target.innerText === 'Deutsch') {
            changeLanguage('de');
        } else if (event.target.innerText === 'English') {
            changeLanguage('en');
        } else {
            changeLanguage('fr');
        }
        navigate(originalPath);
    }

    let flagCode: FlagNameValues = 'de';
    let languageName = 'Deutsch';
    if (language === 'en') {
        flagCode = 'us';
        languageName = 'English'
    } else if (language === 'fr') {
        flagCode = 'fr';
        languageName = 'Français';
    }
    const countryOptions = [
        { key: 'de', value: 'de', flag: 'de', text: 'Deutsch' },
        { key: 'us', value: 'us', flag: 'us', text: 'English' },
        { key: 'fr', value: 'fr', flag: 'fr', text: 'Français' }
    ]
    return (
        <span className="language-switcher-mobile">

            <Dropdown
                inline
                options={countryOptions}
                defaultValue={flagCode}
                closeOnChange
                onChange={($event) => switchLanguage($event, language)}
            />
        </span>
    );
};

export default LanguageSwitcher;
