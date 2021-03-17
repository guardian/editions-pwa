module.exports = {
    parser: "@typescript-eslint/parser",
    extends: [
        "plugin:react/recommended",
        "plugin:jsx-a11y/recommended",
        "plugin:prettier/recommended",
        "@guardian/eslint-config-typescript",
    ],
    plugins: ["prettier"],
    parserOptions: {
        // Allows for the parsing of modern ECMAScript features
        ecmaVersion: 2018,
        // Allows for the use of imports
        sourceType: "module",
        ecmaFeatures: {
            // Allows for the parsing of JSX
            jsx: true,
        },
        tsconfigRootDir: __dirname,
        project: ["./tsconfig.json"],
    },
    ignorePatterns: [".eslintrc.js"],
    rules: {
        "prettier/prettier": "error",
        // Triple-equals equality in JS
        eqeqeq: "error",
        // Avoid let when variable is never re-assigned
        "prefer-const": "error",
        "no-trailing-spaces": "error",
        indent: [
            "error",
            4,
            {
                SwitchCase: 1,
            },
        ],
        "max-len": [
            "error",
            {
                code: 100,
                ignoreStrings: true,
                ignoreTemplateLiterals: true,
                ignoreUrls: true,
            },
        ],
        // Enforce TypeScript naming conventions
        // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/naming-convention.md
        "@typescript-eslint/naming-convention": [
            "error",

            /**
             * Normal functions are 'camelCase', React components are 'PascalCase'
             * Example:
             *   function getName(id: string) {}
             *   function HelloWorld(props: Props) {}
             */
            {
                selector: "function",
                format: ["camelCase", "PascalCase"],
            },

            /** Normal variables are 'camelCase', React components are 'PascalCase',
             * constants are 'UPPER_CASE'
             * Example:
             *   const fullName: string = ''
             *   const HelloWorld: FC<Props> = props => {}
             *   const IMAGE_WIDTH: number = 8
             */
            {
                selector: "variable",
                format: ["camelCase", "UPPER_CASE", "PascalCase"],
            },

            /** All types, including enum members, are 'PascalCase'
             * Example:
             *   interface ComponentProps {}
             *   type SpamAndEggs = 'spam' | 'eggs'
             *   enum SpamAndEggs { Spam, Eggs }
             */
            {
                selector: ["typeLike", "enumMember"],
                format: ["PascalCase"],
            },
        ],
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/explicit-function-return-type": "error",
        // This check seems to be flaky, and complains about things that TS is happy about
        "react/prop-types": "off",
        "import/no-unresolved": "off",
        // JSX no longer requires React in scope as of React 17
        // https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html#eslint
        "react/jsx-uses-react": "off",
        "react/react-in-jsx-scope": "off",
        indent: "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/no-unsafe-assignment":"off",
        "@typescript-eslint/no-unsafe-member-access": "off",
        "@typescript-eslint/no-unsafe-return": "off",
        "@typescript-eslint/no-floating-promises": "off",
        "@typescript-eslint/no-unsafe-call": "off",
        "@typescript-eslint/ban-types": "off",
        "@typescript-eslint/no-empty-function": "off",
        "@typescript-eslint/no-unsafe-assignment": "off",
        "@typescript-eslint/require-await": "off",
        "@typescript-eslint/restrict-template-expressions": "off",
        "@typescript-eslint/no-var-requires": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/naming-convention": "off",
        "@typescript-eslint/no-unnecessary-condition": "off",
        "@typescript-eslint/prefer-nullish-coalescing": "off",
        "@typescript-eslint/prefer-optional-chain": "off",
        "@typescript-eslint/restrict-plus-operands": "off",
        "@typescript-eslint/no-misused-promises": "off",
        "@typescript-eslint/ban-ts-ignore": "off",
        "@typescript-eslint/await-thenable": "off",
        "@typescript-eslint/ban-ts-ignore": "off",
        "@typescript-eslint/prefer-regexp-exe": "off",
        "@typescript-eslint/prefer-regexp-exec": "off",
        "import/no-named-as-default-member": "off",
        "import/no-named-as-default": "off",
        "react-hooks/exhaustive-deps": "off",
        "react/display-name": "off",
        "jsx-a11y/accessible-emoji": "off",
        "eslint-comments/require-description": "off",
        "eslint-comments/no-unused-disable": "off",
        "import/no-default-export": "off",
        "import/default": "off",
        "import/namespace": "off",
        "max-len": "off",
        "eqeqeq": "off",
        "no-fallthrough": "off",
        "no-async-promise-executor": "off"
    },
    settings: {
        react: {
            // Tells eslint-plugin-react to automatically detect the version of React to use
            version: "detect",
        },
    },
    root: true,
};
