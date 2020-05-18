const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	name: { type: String },
	email: { type: String },
	password: { type: String },
	avatar: { type: String, default: './default/avatar.png' },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
