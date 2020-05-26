"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _redux = require("redux");

function isLoading() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  if (action.type === 'SET_IS_LOADING') {
    state = action.value;
  }

  return state;
} // 用户信息


function userInfo() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  if (action.type === 'SET_USER_INFO') {
    state = Object.assign({}, state, action.value);
  }

  return state;
}

var _default = (0, _redux.combineReducers)({
  isLoading: isLoading,
  userInfo: userInfo
});

exports["default"] = _default;