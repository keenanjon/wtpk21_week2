'use strict';

const catModel = require('../models/catModel');

const cats = catModel.cats;
const {validationResult} = require('express-validator');

const cat_list_get = async (req, res) => {
  console.log('get all cats from controllers', req.query);
  if (req.query.sort === 'age') {
    const catsSort = await catModel.getAllCatsSort('age');
    res.json(catsSort);
    return;
  } else if (req.query.sort === 'name') {
    const catsSort = await catModel.getAllCatsSort('name');
    res.json(catsSort);
    return;
  }

  const cats = await catModel.getAllCats();
  res.json(cats);
};

const cat_get_by_id = (req, res) => {
  console.log('get one cat by id', req.params);
  res.json(cats.find(cat => cat.id === req.params.id));
};

const cat_post_new_cat = async (req, res) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  console.log('post cat', req.body, req.file);
  const cat = req.body;
  cat.filename = req.file.filename;
  const catid = await catModel.insertCat(cat);
  cat.id = catid;
  //res.send(`post cat: ${req.body.name}`);
  res.json(cat);
};

const cat_put_update_cat = async (req, res) => {
  console.log('put cat', req.body);
  const cat = req.body;
  cat.id = req.params.id;
  const success = await catModel.updateCat(cat);
  res.send(`cat updated ${success}`);
};

const cat_put_update_cat2 = async (req, res) => {
  console.log('update cat using html form', req.body);
  const cat = req.body;
  const success = await catModel.updateCat(cat);
  res.send(`cat updated ${success}`);
};

const cat_delete_cat = async (req, res) => {
  console.log('delete cat', req.params.id);
  const success = await catModel.deleteCat(req.params.id);
  res.send(`cat deleted ${success}`);
};

module.exports = {
  cat_list_get,
  cat_get_by_id,
  cat_post_new_cat,
  cat_put_update_cat,
  cat_put_update_cat2,
  cat_delete_cat,
};