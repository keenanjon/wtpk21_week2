
'use strict';
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;
/*
const port = process.env.HTTP_PORT || 3000;
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
if (process.env.NODE_ENV === 'production') {
  require('./utils/production')(app, port);
} else {
  require('./utils/localhost')(app, process.env.HTTPS_PORT || 8000, port);
}
 */

const rootRoute = require('./routes/rootRoute');
const catRoute = require('./routes/catRoute');
const userRoute = require('./routes/userRoute');
const passport = require('./utils/pass');
const authRoute = require('./routes/authRoute');

app.use(cors());

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static('week2_public_html'));
app.use(express.static('uploads'));
app.use('/thumbnails', express.static('thumbnails'));

// routes
app.use('/auth', authRoute);
app.use('/cat', passport.authenticate('jwt', {session: false}), catRoute);
app.use('/user', passport.authenticate('jwt', {session: false}), userRoute);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));