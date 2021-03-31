//'use strict'; module is strict by default;
const express = require('express');
const router = express.Router();
//const multer  = require('multer');
//const upload = multer({ dest: 'uploads/' });
const userController = require('../controllers/userController');
const {body} = require('express-validator');

router.route('/')
.get(userController.user_list_get);

router.post('/',
    body('email').isEmail(),
    body('username').isLength({min: 3}),
    body('password').matches('(?=.*[A-Z]).{8,}'),
    userController.user_create);

router.route('/:id')
.get(userController.user_get_by_id)
.put(userController.user_put_update_user)
.delete(userController.user_delete_user);

module.exports = router;
