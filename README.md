Description
===========
This is a test repository that shows a possible bug with `babel@6` interacting with `webpack` (and possibly `react`).

It looks like if the webpack devtool is set to `source-map` and there is a comment (either block or inline) before an `import` statement in the entry file, something breaks with the transpilation:
```
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(ReactDOM, React) {'use strict';

	var _Main = __webpack_require__(218);

	var _Main2 = _interopRequireDefault(_Main);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	ReactDOM.render(React.createElement(_Main2.default, null), document.getElementById('app')); // test
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(60), __webpack_require__(206)))undefined

/***/ },
```

returning a `Uncaught SyntaxError: Unexpected identifier` in the browser's console.

By removing the `// test` comment at the top of `App.js` or changing the devtool to `eval`, it compiles without any problem.

This didn't occur with `babel@5`.

Installed packages
------------------
    test-babel
    ├── babel-core@6.1.21
    ├── babel-loader@6.1.0
    ├── babel-preset-es2015@6.1.18
    ├── babel-preset-react@6.1.18
    ├── babel-preset-stage-0@6.1.18
    ├── react@0.14.2
    ├── react-dom@0.14.2
    ├── webpack@1.12.6
    └── webpack-dev-server@1.12.1

webpack.config.js
-----------------
    var webpack = require('webpack');

    module.exports = {
        devtool: 'source-map',

        entry: {
            main: [
                './app/App.js'
            ]
        },

        output: {
            path: '__build__',
            publicPath: '__build__',
            filename: 'build.js'
        },

        module: {
            loaders: [{
                test: /\.jsx?$/,
                exclude: /node_modules[\/\\]/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react', 'stage-0']
                }
            }]
        },

        plugins: [
            new webpack.ProvidePlugin({
                React: 'react',
                ReactDOM: 'react-dom'
            })
        ],

        resolve: {
            extensions: ['', '.js', '.jsx']
        }
    };
