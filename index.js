'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.HTTP_PORT || 3000;

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
if (process.env.NODE_ENV === 'production') {
  require('./utils/production')(app, port);
} else {
  require('./utils/localhost')(app, process.env.HTTPS_PORT || 8000, port);
}


const catRouter = require('./routes/catRouter');
const userRouter = require('./routes/userRouter');

app.use(express.static('public'));
app.use(express.static('uploads'));

app.use(express.json()); // for parsing application/json

app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
/*
app.get('/', (req, res) => {
  res.send('Hello World!');
});
 */
app.use('/cat', catRouter);
app.use('/user', userRouter);

app.get('/', (req, res) => {
  res.send('Hello Secure World!');
});


/*
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
 */