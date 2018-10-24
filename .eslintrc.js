module.exports = {
	root: true,

	env: {
		node: true
	},

	extends: [ 'plugin:vue/essential', '@vue/standard', '@vue/typescript' ],

	rules: {
		'no-console': 'off',
		'no-debugger': 'off',
		'graphql/template-strings': [
          'error',
          {
            env: 'literal',
            projectName: 'app'
          },
          {
            env: 'literal',
            projectName: 'app'
          }
        ]
	},

	parserOptions: {
		parser: 'typescript-eslint-parser'
	},

	plugins: [ 'graphql' ]
};
