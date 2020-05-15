
const fs = require("fs");

let viewsContent = fs.readdirSync("./src/views");

// console.log(viewsContent);

const titleMap = {
    index:"首页",
    second:"二级页面"
}

let pages = {};

viewsContent.forEach(el=>{
    pages[el] = {
        entry:`src/views/${el}/main.js`,
        template: 'public/index.html',
        filename:`${el}/index.html`,
        title:titleMap[el]
    }
});

pages.index.filename = "index.html";

module.exports = pages;
