// deleteUploadFile

const fs = require("fs");
const path = require("path");

module.exports = function(filename){
    const fp = path.join(__dirname,"../public/images",filename);
    fs.unlinkSync(fp);
}

