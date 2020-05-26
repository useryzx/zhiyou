"use strict";

var mongoose = require("./connect.js");

var schema = new mongoose.Schema({
  account: String,
  psw: String,
  // 角色和权限类型
  // |0|0|查看订单|管理轮播图|管理分类|管理商品|创建普通用户|创建管理员用户|
  // 总管理员     00111111
  // 管理员       00111110
  role: Number
});
var model = mongoose.model("user", schema);
module.exports = model;