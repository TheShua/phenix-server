const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classSchema = new Schema({
	name: { type: String },
	description: { type: String },
	hitDice: { type: Number },
	proficiencies: [{ type: Schema.Types.ObjectId, ref: 'Proficiency' }],
	saves: [{ type: Schema.Types.ObjectId, ref: 'Attribute' }],
	skillsChoices: [{ type: Schema.Types.ObjectId, ref: 'Skill' }],
	skillsNb: { type: Number },
});

const Class = mongoose.model('Class', classSchema);

module.exports = Class;
