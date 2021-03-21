// Model (usually gets data from database, in this case data is hard coded)
'use strict';

const pool = require('../database/db');
const promisePool = pool.promise();

const getAllCats = async () => {
  try {
    // TODO: do the LEFT (or INNER) JOIN to get owner name too.
    const [rows] = await promisePool.query('SELECT * FROM wop_cat');
    console.log('something back from db?', rows);
    return rows;
  } catch (e) {
    console.error('error', e.message);
  }
};

const getAllCatsSort = async (order) => {
  try {
    // TODO: do the LEFT (or INNER) JOIN to get owner name too.
    const [rows] = await promisePool.query(`SELECT * FROM wop_cat ORDER BY ${order}`);
    return rows;
  } catch (e) {
    console.error('error', e.message);
  }
};

const insertCat = async (cat) => {
  const [row] = await promisePool.execute('INSERT INTO wop_cat (name, age, weight, owner, filename) VALUES (?, ?, ?, ?, \'foo.jpg\')', [cat.name, cat.age, cat.weight, cat.owner]);
  console.log('insert row', row);
  return row.insertId;
};

module.exports = {
  getAllCats,
  getAllCatsSort,
  insertCat,
};
