require('dotenv').config();
require('./config/dbConnection');

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(
	cors({
		origin: process.env.FRONT_END_URL,
		credentials: true,
	})
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
	session({
		store: new MongoStore({ mongooseConnection: mongoose.connection }),
		secret: process.env.SESSION_SECRET,
		resave: true,
		saveUninitialized: true,
	})
);

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));

module.exports = app;
