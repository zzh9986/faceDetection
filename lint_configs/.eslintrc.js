module.exports = {
	"parser": "@typescript-eslint/parser",
	"parserOptions": {
		"ecmaVersion": 6,
		"sourceType": "module",
		"ecmaFeatures": {
			"jsx": true
		},
		"project": "./tsconfig.json"
	},
	"plugins": ["react", "react-hooks", "@typescript-eslint"],
	"rules": {
		"arrow-body-style":["error", "as-needed"],
		"arrow-spacing":["warn"],
		"brace-style":["warn"],
		"camelcase": ["warn"],
		"comma-dangle": ["error", "never"],
		"no-floating-decimal": ["error"],
		"no-lonely-if": ["error"],
		"prefer-const": ["error"],
		"react/prefer-es6-class": [2, "always"],
		"react/prefer-stateless-function": [0],
		"react/jsx-pascal-case": [1],
		"jsx-quotes": ["error"],
		"no-multi-spaces": ["error", { "ignoreEOLComments": false }],
		"react/jsx-tag-spacing": ["warn", {
			"beforeSelfClosing": "always"
		}],
		"react/no-string-refs": [2, { "noTemplateLiterals": true }],
		"react/jsx-wrap-multilines": ["error", {
			"declaration": "parens",
			"assignment": "parens",
			"return": "parens",
			"arrow": "parens"
		}],
		"react/self-closing-comp": ["error", { "component": true, "html": true }],
		"react/jsx-closing-bracket-location": 1,
		"react/jsx-no-bind":["error",{
			"ignoreRefs":true,
			"allowArrowFunctions":true
		}],
		"react/require-render-return":["error"],
		"react/sort-comp":[1],
		"react/no-is-mounted":["error"],
		"react/display-name":[0],
		"@typescript-eslint/camelcase":"warn",
		"@typescript-eslint/explicit-function-return-type": [
			"off",
			{
				allowExpressions: true,
				allowTypedFunctionExpressions: true
			}
		],
		"react/prop-types":[0],
		"@typescript-eslint/no-var-requires": ["off"],
		"@typescript-eslint/no-explicit-any": [1,{"ignoreRestArgs": true}],
		"@typescript-eslint/no-use-before-define": ["error", { functions: false }],
		"@typescript-eslint/explicit-member-accessibility": ["off"],
		"@typescript-eslint/interface-name-prefix": ["error", "always"],
		"no-unused-vars": "off",
		"@typescript-eslint/no-unused-vars": ["error", {
			"vars": "all",
			"args": "after-used",
			"ignoreRestSiblings": true
		}],
		"react-hooks/rules-of-hooks": "error",
		"react-hooks/exhaustive-deps": "warn"
	},
	"globals": {
		window: true
	},
	"settings":{
		"react":{
			"version":"detect"
		}
	},
	"extends": [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:@typescript-eslint/eslint-recommended",
		"prettier",
		"prettier/@typescript-eslint",
		"prettier/react"
	],
	"root": true,
	"env": {
		"browser": true,
		"node": true,
		"es6": true,
		"jest": true
	}
};
