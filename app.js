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
		origin: [process.env.FRONT_END_URL, 'http://www.dnd5eapi.co/'],
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
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/dnd', require('./routes/dnd'));
app.use('/api/characters', require('./routes/characters'));
app.use('/api/tables', require('./routes/tables'));
app.use('/api/sessions', require('./routes/sessions'));
app.use('/api/mailbox', require('./routes/mailbox'));

module.exports = app;
