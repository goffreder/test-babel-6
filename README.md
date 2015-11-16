Description
===========

This is a test repository that shows a possible bug with `babel@6` interacting with `webpack`.

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
