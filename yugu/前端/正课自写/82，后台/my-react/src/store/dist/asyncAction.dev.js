"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.queryLogin = queryLogin;
exports.queryIsLogin = queryIsLogin;

var _http = require("./http.js");

var _action = require("./action.js");

function queryLogin(params) {
  return function (dispatch) {
    return (0, _http.post)('/user/login', params).then(function (res) {
      dispatch((0, _action.setUserInfo)(res.data.userInfo));
      return Promise.resolve(res);
    });
  };
}

function queryIsLogin() {
  return function (dispatch) {
    return (0, _http.get)('/user/islogin').then(function (res) {
      console.log(res);
      dispatch((0, _action.setUserInfo)(res.data.userInfo));
      return Promise.resolve(res);
    });
  };
}