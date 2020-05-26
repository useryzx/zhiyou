"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setIsLoading = setIsLoading;
exports.setUserInfo = setUserInfo;

function setIsLoading(v) {
  return {
    type: 'SET_IS_LOADING',
    value: v
  };
}

function setUserInfo(v) {
  return {
    type: 'SET_USER_INFO',
    value: v
  };
}