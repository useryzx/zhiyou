"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _reducer=_interopRequireDefault(require("./reducer.js")),_redux=require("redux"),_reduxThunk=_interopRequireDefault(require("redux-thunk"));function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}var store=(0,_redux.createStore)(_reducer.default,(0,_redux.applyMiddleware)(_reduxThunk.default)),_default=store;exports.default=store;