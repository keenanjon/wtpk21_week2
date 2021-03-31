//'use strict'; module is strict by default 😉
const express = require('express');
const router = express.Router();
const multer = require('multer');
const catController = require('../controllers/catController');
const {body} = require('express-validator');

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype ==='image/png' ||
      file.mimetype === 'image/gif') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const testFile = (req, res, next) => {
  if (req.file) {
    next();
  } else {
    res.status(400).json({errors: 'file is not image'});
  }
};

const upload = multer({dest: 'uploads/', fileFilter});

router.route('/').
    get(catController.cat_list_get);

router.put('/',
    body('name').isLength({min: 1}).escape().blacklist(';'),
    body('age').isLength({min: 1}).isNumeric(),
    body('weight').isLength({min: 1}).isNumeric(),
    body('owner').isLength({min: 1}).isNumeric(),
    catController.cat_update2);

router.post('/',
        upload.single('filename'),
        testFile,
        body('name').isLength({min:1}).escape().blacklist(';'),
        body('age').isLength({min:1}).isNumeric(),
        body('weight').isLength({min:1}).isNumeric(),
        body('owner').isLength({min:1}).isNumeric(),
        catController.cat_post_new_cat);
router.put('/:id',
    body('name').isLength({min: 1}).escape().blacklist(';'),
    body('age').isLength({min: 1}).isNumeric(),
    body('weight').isLength({min: 1}).isNumeric(),
    body('owner').isLength({min: 1}).isNumeric(),
    catController.cat_update);

router.route('/:id').
    get(catController.cat_get_by_id).
    delete(catController.cat_delete_cat);

module.exports = router;