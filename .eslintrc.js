module.exports = {
  extends: ['prettier'],
  root: true,
  parser: 'babel-eslint',
  plugins: ['import', 'babel', 'prettier'],
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', '/']
      }
    }
  },
  rules: {
    semi: [2, 'never'],
    'no-console': ['error', { allow: ['warn', 'log', 'error'] }],
    'import/no-named-as-default': 0,
    'no-return-await': 2,
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'none',
        semi: false,
        bracketSpacing: true,
        jsxBracketSameLine: true,
        printWidth: 80,
        tabWidth: 2,
        useTabs: false,
        endOfLine: 'auto'
      }
    ]
  }
}
