import { useI18next } from 'gatsby-plugin-react-i18next';
import React from 'react';
import { Dropdown, FlagNameValues, Menu } from 'semantic-ui-react';
import './language-switcher.less';

const LanguageSwitcher = ({ mobile, t, translations }) => {
    return (
        <Menu.Item>
            {LanuageSwitcherMobile(t, translations)}
        </Menu.Item>
    );
}

const LanuageSwitcherMobile = (t: any, translations?: any) => {
    const { language, originalPath, changeLanguage, navigate } = useI18next();

    function switchLanguage(event, lang, translations?) {
        let langCode = 'de';
        if (event.target.innerText === 'Deutsch') {
            langCode = 'de'
        } else if (event.target.innerText === 'English') {
            langCode = 'en'
        } else {
            langCode = 'fr'
        }
        if (translations != null) {
            const match = translations.filter(translation => translation?.language?.slug === langCode);
            if (match[0]?.slug != null) {
                changeLanguage(langCode, '/' + originalPath.split('/')[1] + '/' + match[0].slug);
            } else {
                changeLanguage(langCode, originalPath);

            }
        } else {
            changeLanguage(langCode, originalPath);
        }


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
                onChange={($event) => switchLanguage($event, language, translations)}
            />
        </span>
    );
};

export default LanguageSwitcher;
