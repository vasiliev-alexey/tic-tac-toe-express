module.exports = {
  env: {
    browser: true,
    es2021: true,
    "jest/globals": true,
  },
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "jest"],
  extends: ["airbnb-base", "prettier", "plugin:@typescript-eslint/recommended"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {
    "no-console": "off",
    "max-len": [
      "error",
      {
        code: 120,
        ignoreComments: true,
      },
    ],
    "import/prefer-default-export": "off",
    "import/no-extraneous-dependencies": [
      "off",
      { devDependencies: ["**/*.test.js"] },
    ],
    "import/no-unresolved": "off", // https://github.com/typescript-eslint/typescript-eslint/issues/1624
    "import/extensions": ["warn", "never", { json: "off" }], // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/extensions.md
  },
};
