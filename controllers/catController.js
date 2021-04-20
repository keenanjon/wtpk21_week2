'use strict';
// catController
const catModel = require('../models/catModel');
const {validationResult} = require('express-validator');
const {makeThumbnail} = require('../utils/resize');
const {getCoordinates} = require('../utils/imageMeta');

const cats = catModel.cats;

const cat_list_get = async (req, res) => {
  try {
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
  } catch (e) {
    res.status(400).json({error: e.message});
  }
};

const cat_get_by_id = async (req, res) => {
  try {
    console.log('get cat by id', req.params.id);
    const [cat] = await catModel.getCatById(req.params.id);
    res.json(cat);
  } catch (e) {
    res.status(400).json({error: e.message});
  }
};

const cat_create = async (req, res) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }
  try {
    // hae koordinaatit
    const coords = await getCoordinates(req.file.path);
    // console.log('coords', coords);
    req.body.coords = coords;
    //here we will create a cat with data comming from req...
    console.log('catController cat_create', req.body, req.file);
    const id = await catModel.insertCat(req);
    const cat = await catModel.getCat(id);
    res.send(cat);
  } catch (e) {
    res.status(400).json({error: e.message});
  }
};


const cat_put_update_cat = async (req, res) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  console.log('put cat', req.body);
  const cat = req.body;
  cat.id = req.params.id;
  const success = await catModel.updateCat(cat);
  res.send(`cat updated ${success}`)
};
const cat_put_update_cat2 = async (req, res) => {
  console.log('update cat using html form', req.body);
  const cat = req.body;
  const success = await catModel.updateCat(cat);
  res.send(`cat updated ${success}`);
};
/*
const cat_update = async (req, res) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }
  const updateOk = await catModel.updateCat(req.params.id, req);
  res.send(`updated... ${updateOk}`);
};
 */

const cat_delete = async (req, res) => {
  try {
    const deleteOk = await catModel.deleteCat(req.params.id);
    res.send(`cat terminated... ${updateOk}`);
  } catch (e) {
    res.status(400).json({error: e.message});
  }
};

const make_thumbnail = async (req, res, next) => {
  try {
    const thumbnail = await makeThumbnail(req.file.path, req.file.filename);
    if (thumbnail) {
      next();
    }
  } catch (e) {
    res.status(400).json({error: e.message});
  }
};

module.exports = {
  cat_list_get,
  cat_get_by_id,
  cat_create,
  cat_put_update_cat,
  cat_put_update_cat2,
  cat_delete,
  make_thumbnail,
};