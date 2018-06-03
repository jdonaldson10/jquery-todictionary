module.exports = {
  extends: 'airbnb-base',
  env: {
    browser: true,
    jquery: true
  },
  rules: {
    // Temp overrides as lib is being refactored + build step added
    'comma-dangle': 'off',
    'no-var': 'off',
    'no-fallthrough': 'off',
    'no-param-reassign': 'off',
    'vars-on-top': 'off',
    'prefer-const': 'off',
    'prefer-template': 'off',
    'prefer-arrow-callback': 'off',
    'max-len': ['error', 100, 2, {
       ignoreUrls: true,
       ignoreComments: true,
       ignoreRegExpLiterals: true,
       ignoreStrings: true,
       ignoreTemplateLiterals: true
    }],    
  }
};