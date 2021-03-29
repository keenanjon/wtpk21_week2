// Model (usually gets data from database, in this case data is hard coded)
'use strict';

const pool = require('../database/db');
const promisePool = pool.promise();

const getAllUsers = async () => {
  try {
    // TODO: do the LEFT (or INNER) JOIN to get owner name too.
    const [rows] = await promisePool.query('SELECT * FROM wop_user');
    console.log('something back from db?', rows);
    return rows;
  } catch (e) {
    console.error('error', e.message);
  }
};

const getAllUsersSort = async (order) => {
  try {
    // TODO: do the LEFT (or INNER) JOIN to get owner name too.
    const [rows] = await promisePool.query(`SELECT * FROM wop_user ORDER BY ${order}`);
    return rows;
  } catch (e) {
    console.error('error', e.message);
  }
};

const insertUser = async (user) => {
  const [row] = await promisePool.execute('INSERT INTO wop_user (name, email, password) VALUES (?, ?, ?)', [user.name, user.email, user.password]);
  console.log('insert row', row);
  return row.insertId;
};

const updateUser = async (user) => {
  const [row] = await promisePool.execute('UPDATE wop_user SET name=?, email=?, password=? WHERE user_id=?', [user.name, user.email, user.password, user.id]);
  console.log('update row', row);
  return true;
};

const deleteUser = async (id) => {
  const [row] = await promisePool.execute('DELETE FROM wop_user WHERE user_id=?', [id]);
  console.log('delete row', row);
  return true;
};


module.exports = {
  getAllUsers,
  getAllUsersSort,
  insertUser,
  updateUser,
  deleteUser,

};
