module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 2016
    },
    "rules": {
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "always"
        ],

        "no-alert": 1,
        "camelcase": 1,
        "curly": 1,
        "eqeqeq": 1,
        "no-console": 1,
        "guard-for-in": 1,
        "no-empty": 1,
        "no-param-reassign": 1,
        "no-unused-vars": 1,
    },

    "globals": {
        "jQuery": false,
        "$": false
    }
};