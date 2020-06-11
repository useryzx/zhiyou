const multer  = require('multer');

var upload = multer({
    dest: 'public/images' 
});

module.exports = {
    single:upload.single('img'),
    multiple:upload.array('img', 9)
}