var express = require('express');
var router = express.Router();
const http = require('http');

/* GET home page. */
// router.get('/api/laugh', function (req, res) {
//   let ready = http.request(`http://v.juhe.cn/joke/content/list.php?key=${req.query.key}&page=${req.query.page}&pagesize=${req.query.pagesize}&sort=${req.query.sott}&time=${req.query.time}`, 
//   pres => {
//     let data = Buffer.alloc(0);
//     pres.on("data", d => {
//       data = data + d;
//     });
//     pres.on("end", () => {
//       res.json(JSON.parse(data));
//     })
//   });
//   ready.end();
// })

module.exports = router;
