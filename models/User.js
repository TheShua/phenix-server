const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	name: { type: String, unique: true },
	email: { type: String, unique: true },
	password: { type: String },
	avatar: { type: String, default: '/default/avatar.png' },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
