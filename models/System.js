const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const systemSchema = new Schema({
	fullName: { type: String },
	code: { type: String },
});

const System = mongoose.model('System', systemSchema);

module.exports = System;
