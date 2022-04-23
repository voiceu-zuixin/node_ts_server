module.exports = {
    "env": {
        // "browser": true,
        "node":true,
        "commonjs": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest"
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
      // 让require变得不报错，意思是这条规则不生效，0表示不生效 1，表示生效
      '@typescript-eslint/no-var-requires': 0
    }
}
