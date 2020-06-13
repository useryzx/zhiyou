"use strict";

var fs = require('fs');

fs.readFile('./index.js', function (err, data) {
  console.log(data.toString());
});