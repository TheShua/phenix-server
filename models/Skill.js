const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const skillSchema = new Schema({
	name: { type: String },
	attribute: { type: Schema.Types.ObjectId, ref: 'Attribute' },
});

const Skill = mongoose.model('Skill', skillSchema);

module.exports = Skill;
