module.exports = {
  rules: {
    "import/extensions": ["error", "never", { mjs: "ignorePackages" }],
    "@typescript-eslint/consistent-type-imports": [
      "error",
      { disallowTypeAnnotations: false },
    ],
  },
};
