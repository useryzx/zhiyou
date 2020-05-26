"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.get = get;
exports.post = post;

var _axios = _interopRequireDefault(require("axios"));

var _store = _interopRequireDefault(require("./store.js"));

var _action = require("./action.js");

var _antd = require("antd");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function get(url, params) {
  _store["default"].dispatch((0, _action.setIsLoading)(true));

  return _axios["default"].get(url, {
    params: params
  }).then(function (res) {
    _store["default"].dispatch((0, _action.setIsLoading)(false));

    if (res.data.err) {
      _antd.message.error(res.data.msg);
    } else {
      _antd.message.success(res.data.msg);
    }

    return Promise.resolve(res);
  })["catch"](function (err) {
    _store["default"].dispatch((0, _action.setIsLoading)(false));

    _antd.message.error('网络故障');

    return Promise.reject(err);
  });
}

function post(url, params, config) {
  _store["default"].dispatch((0, _action.setIsLoading)(true));

  return _axios["default"].post(url, params, config).then(function (res) {
    _store["default"].dispatch((0, _action.setIsLoading)(false));

    if (res.data.err) {
      _antd.message.error(res.data.msg);
    } else {
      _antd.message.success(res.data.msg);
    }

    return Promise.resolve(res);
  })["catch"](function (err) {
    _store["default"].dispatch((0, _action.setIsLoading)(false));

    _antd.message.error('网络故障');

    return Promise.reject(err);
  });
}