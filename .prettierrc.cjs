/** @type {import("prettier").Config} */
module.exports = {
  plugins: [
    'prettier-plugin-svelte',
    'prettier-plugin-packagejson',
    'prettier-plugin-tailwindcss'
  ],
  overrides: [
    {
      files: '*.svelte',
      options: {
        parser: 'svelte'
      }
    }
  ],
  tabWidth: 2,
  useTabs: false,
  semi: false,
  singleQuote: true,
  quoteProps: 'as-needed',
  trailingComma: 'none',
  bracketSpacing: true,
  bracketSameLine: true,
  arrowParens: 'always'
}
