const multer = require('multer');

const upload = multer({
  //console.log()
  limits: { fieldSize: 25 * 1024 * 1024 },
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, '../admin_panel/images');
    },
    filename(req, file, cb) {
      const filename = `${new Date().valueOf()}_${file.originalname}`;
      cb(null, filename);
    },
  }),
});

module.exports=upload;
