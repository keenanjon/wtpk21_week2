//'use strict'; module is strict by default;
const express = require('express');
const router = express.Router();
const catController = require('../controllers/catController');


router.route('/')
.get(catController.cat_list_get)
.post(catController.cat_post_new_cat);

router.route('/:id')
.get(catController.cat_get_by_id)
.put((req, res)=> {
  console.log('put cat', req.params);
  res.send('put cat');
})
.delete((req, res) => {
  console.log('delete cat', req.params);
  res.send('delete cat');
});

module.exports = router;