const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const proficiencySchema = new Schema({
	name: { type: String },
	description: { type: String },
});

const Proficiency = mongoose.model('Proficiency', proficiencySchema);

module.exports = Proficiency;
