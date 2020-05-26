"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _store = _interopRequireDefault(require("./store.js"));

var _action = _interopRequireDefault(require("./action.js"));

var _antd = require("antd");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function mget(url, params) {
  _store["default"].dispatch((0, _action["default"])(true));

  return _axios["default"].get(url, {
    params: params
  }).then(function (res) {
    _store["default"].dispatch((0, _action["default"])(false));

    if (res.err) {
      _antd.message.error(res.msg);
    } else {
      _antd.message.success(res.msg);
    }

    return Promise.resolve(res);
  })["catch"](function (err) {
    _store["default"].dispatch((0, _action["default"])(false));

    _antd.message.error('网络故障');
  });
}

function mpost(url, params, config) {
  _store["default"].dispatch((0, _action["default"])(true));

  return _axios["default"].post(url, params, config).then(function (res) {
    _store["default"].dispatch((0, _action["default"])(false));

    if (res.err) {
      _antd.message.error(res.msg);
    } else {
      _antd.message.success(res.msg);
    }

    return Promise.resolve(res);
  })["catch"](function (err) {
    _store["default"].dispatch((0, _action["default"])(false));

    _antd.message.error('网络故障');
  });
}

var _default = {
  get: get,
  post: post
};
exports["default"] = _default;