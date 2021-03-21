// Controller
'use strict';
const catModel = require('../models/catModel');

const cats = catModel.cats;

const cat_list_get = (req, res) => {
  console.log('get all cats from controllers', req.query);
  if(req.query.sort === 'age') {
    const catsSort = cats.slice().sort((catA, catB) => catA.age - catB.age);
    res.json(catsSort);
    return;
  }
  res.json(cats);
};

const cat_get_by_id = (req, res) => {
    console.log('get one cat by id', req.params);
    res.json(cats.find(cat => cat.id === req.params.id));
};

const cat_post_new_cat = (req, res) => {
  console.log('post cat',req.body);
  res.send(`post cat: ${req.body.name}`);
};

module.exports = {
  cat_list_get,
  cat_get_by_id,
  cat_post_new_cat,
};