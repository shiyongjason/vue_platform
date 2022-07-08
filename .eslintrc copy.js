module.exports = {
    "root": true,
    "env": {
        node: true
    },
    'extends': [
        'plugin:vue/essential',
        'eslint:recommended',
        '@vue/typescript/recommended'
    ],
    // "parserOptions": {
    //     ecmaVersion: 2020
    // },
    "rules": {
        'no-console': 'off',
        'no-debugger': 'off',
        'no-useless-escape': 'off',
        'quote-props': ["error", "consistent"],
        "indent": ['error', 4, {
            SwitchCase: 1,
            VariableDeclarator: 1,
            outerIIFEBody: 1,
            MemberExpression: 1,
            FunctionDeclaration: {
                parameters: 1,
                body: 1
            },
            FunctionExpression: {
                parameters: 1,
                body: 1
            },
            CallExpression: {
                arguments: 1
            },
            ArrayExpression: 1,
            ObjectExpression: 1,
            ImportDeclaration: 1,
            flatTernaryExpressions: false,
            ignoreComments: false
        }],
        'eol-last': 'off',
        "eqeqeq": 0,
        "@typescript-eslint/no-explicit-any": ["off"]
        // 'vue/multi-word-component-names': "off"
    }
}
