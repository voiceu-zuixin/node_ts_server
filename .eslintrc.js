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
        "plugin:prettier/recommended",
        // "plugin:node/recommended"
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
      '@typescript-eslint/no-var-requires': 0,

      //  测试node的导入，猜测的，并不能解决，eslint只是检查格式，require是因为ts不支持
      // "node/exports-style": ["error", "module.exports"],

      // 变量未用，不报警告
      "@typescript-eslint/no-unused-vars": 0
      // "@typescript-eslint/no-unused-vars": ["error"]
    }
}
