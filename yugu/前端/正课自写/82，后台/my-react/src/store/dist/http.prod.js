"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.get=get,exports.post=post;var _axios=_interopRequireDefault(require("axios")),_store=_interopRequireDefault(require("./store.js")),_action=require("./action.js"),_antd=require("antd");function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function get(e,t){return _store.default.dispatch((0,_action.setIsLoading)(!0)),_axios.default.get(e,{params:t}).then(function(e){return _store.default.dispatch((0,_action.setIsLoading)(!1)),e.data.err?_antd.message.error(e.data.msg):_antd.message.success(e.data.msg),Promise.resolve(e)}).catch(function(e){return _store.default.dispatch((0,_action.setIsLoading)(!1)),_antd.message.error("网络故障"),Promise.reject(e)})}function post(e,t,s){return _store.default.dispatch((0,_action.setIsLoading)(!0)),_axios.default.post(e,t,s).then(function(e){return _store.default.dispatch((0,_action.setIsLoading)(!1)),e.data.err?_antd.message.error(e.data.msg):_antd.message.success(e.data.msg),Promise.resolve(e)}).catch(function(e){return _store.default.dispatch((0,_action.setIsLoading)(!1)),_antd.message.error("网络故障"),Promise.reject(e)})}