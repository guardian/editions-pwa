module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: ['react-hooks'],
    extends: [
        'plugin:react/recommended',
        'plugin:prettier/recommended',
        '@guardian/eslint-config-typescript',
    ],
    settings: {
        react: {
            version: (() => {
                const mallardPackage = require('./projects/Mallard/package.json')
                return mallardPackage.dependencies.react.substring(1)
            })(),
        },
    },
    rules: {
        'prettier/prettier': 'error',
        '@typescript-eslint/explicit-member-accessibility': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        'react/prop-types': 'off',
        '@typescript-eslint/consistent-type-assertions': 'error',
        '@typescript-eslint/camelcase': 'off',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'error',
        'react/display-name': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
    },
    overrides: [
        {
            files: ['*.d.ts'],
            rules: {
                '@typescript-eslint/no-explicit-any': 'off',
            },
        },
        {
            files: ['*.js'],
            rules: { '@typescript-eslint/no-var-requires': 'off' },
        },
        {
            /* Using a '?' mark below so that it matches regardless of case-insensitive
             * filesystem (MacOS...)" */
            files: ['projects/?allard/src/**/*'],
            rules: { '@typescript-eslint/no-unused-vars': 'error' },
        },
    ],
}
