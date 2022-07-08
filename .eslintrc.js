module.exports = {
    root: true,
    env: {
        node: true
    },
    parserOptions: {
        parser: '@typescript-eslint/parser'
    },
    // plugins: [
    //     '@typescript-eslint',
    // ],
    extends: ['plugin:vue/essential', '@vue/typescript'],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        "indent": ["error", 4, {
            "SwitchCase": 1,
            "VariableDeclarator": 1,
            "outerIIFEBody": 1,
            "MemberExpression": 1,
            "FunctionDeclaration": {
                "parameters": 1,
                "body": 1
            },
            'FunctionExpression': {
                'parameters': 1,
                'body': 1
            },
            'CallExpression': {
                'arguments': 1
            },
            'ArrayExpression': 1,
            'ObjectExpression': 1,
            'ImportDeclaration': 1,
            'flatTernaryExpressions': false,
            'ignoreComments': false
        }],
        'eol-last': 'off',
        'eqeqeq': 0,

    }
}
