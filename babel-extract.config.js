module.exports = {
    presets: ['babel-preset-gatsby'],
    plugins: [
        [
            'i18next-extract',
            {
                locales: ['de', 'en', 'fr'],
                keySeparator: null,
                nsSeparator: null,
                keyAsDefaultValue: ['en'],
                useI18nextDefaultValue: ['en'],
                discardOldKeys: true,
                keyAsDefaultValue: true,
                outputPath: 'src/locales/{{locale}}/{{ns}}.json',
                customTransComponents: [['gatsby-plugin-react-i18next', 'Trans']]
            }
        ]
    ],
    overrides: [
        {
            test: [`**/*.ts`, `**/*.tsx`],
            plugins: [[`@babel/plugin-transform-typescript`, { isTSX: true }]]
        }
    ]
};