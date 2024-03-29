module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    project: "./tsconfig.json",
    sourceType: "module",
    createDefaultProgram: true,
    tsconfigRootDir: __dirname,
  },
  extends: [
    "airbnb-base",
    "airbnb-typescript/base",
    "prettier",
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  rules: {
    "prettier/prettier": ["error", { endOfLine: "auto" }],
    "@typescript-eslint/consistent-type-imports": "error",
    "no-restricted-imports": [
      "error",
      {
        patterns: [
          {
            group: ["**/lib/**/*.js", "**/lib/**/*.cjs", "**/lib/**/*.mjs"],
            message:
              "Import libraries directly using `./path/to/lib/<libname>`",
          },
        ],
      },
    ],
  },
  ignorePatterns: ["build/"],
};
