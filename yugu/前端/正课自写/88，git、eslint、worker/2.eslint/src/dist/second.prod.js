'use strict'; var fs = require('fs'); fs.readFile('./index.js', function (e, o) { console.log(o.toString()), console.log(e) })
