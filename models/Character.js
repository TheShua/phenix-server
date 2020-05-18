const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const characterSchema = new Schema({
	user_id: { type: Schema.Types.ObjectId, ref: 'User' },
	system: { type: String },
	sheet: {
		name: { type: String },
		classe: [{ name: { type: String }, level: { type: Number } }],
		race: { type: String },
		alignment: { type: String, enum: ['LG', 'NG', 'CG', 'NG', 'N', 'CN', 'LE', 'NE', 'CE'], default: 'N' },
		strength: { type: Number, default: 10 },
		dexterity: { type: Number, default: 10 },
		constitution: { type: Number, default: 10 },
		intelligence: { type: Number, default: 10 },
		wisdom: { type: Number, default: 10 },
		charisma: { type: Number, default: 10 },
		saves: { type: String },
		deathSaves: { successes: { type: Number, default: 0 }, failures: { type: Number, default: 0 } },
		exhaustion: { type: Number, default: 0 },
		inspiration: { type: Boolean, default: false },
		speed: { type: String, default: 30 },
		armorClass: { type: String, default: 10 },
		hitPointsTotal: { type: Number, default: 0 },
		hitPoints: { type: Number, default: 0 },
		hitPointsAlt: { type: Number, default: 0 },
		conditions: [{ type: String }],
		age: { type: Number, default: 20 },
		eyes: { type: String, default: 'Unknwon' },
		skin: { type: String, default: 'Unknown' },
		weight: { type: String, default: 'Unknown' },
		height: { type: String, default: 'Unknown' },
		hair: { type: String, default: 'Unknwon' },
	},
});

const Character = mongoose.model('Character', characterSchema);

module.exports = Character;
