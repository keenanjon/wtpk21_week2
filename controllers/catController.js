// Controller
'use strict';

const catModel = require('../models/catModel');

const cats = catModel.cats;

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
  console.log('post cat', req.body);
  const cat = req.body;
  const catid = await catModel.insertCat(cat);
  cat.id = catid;
  //res.send(`post cat: ${req.body.name}`);
  res.json(cat);
};

module.exports = {
  cat_list_get,
  cat_get_by_id,
  cat_post_new_cat,
};
