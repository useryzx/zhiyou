"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.numIncrease=numIncrease,exports.setStr=setStr,exports.setObj=setObj,exports.queryObj=queryObj;var _axios=_interopRequireDefault(require("axios"));function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function numIncrease(){return{type:"NUM_INCREASE"}}function setStr(e){return{type:"SET_STR",value:e}}function setObj(e){return{type:"SET_OBJ",value:e}}function queryObj(e){return function(t){return _axios.default.get("/data2.json").then(function(e){return t(setObj(e.data)),Promise.resolve(e)})}}