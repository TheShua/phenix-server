const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const characterSchema = new Schema({
	user_id: { type: Schema.Types.ObjectId, ref: 'User' },
	system: { type: Schema.Types.ObjectId, ref: 'System' },
	sheet: {
		name: { type: String },
		class: [
			{
				name: {
					type: String,
					enum: [
						'barbarian',
						'bard',
						'cleric',
						'druid',
						'fighter',
						'monk',
						'paladin',
						'ranger',
						'rogue',
						'sorcerer',
						'warlock',
						'wizard',
					],
				},
				level: { type: Number },
			},
		],
		race: {
			type: String,
			enum: ['dragonborn', 'dwarf', 'elf', 'gnome', 'half-elf', 'halfling', 'half-orc', 'human', 'tiefling'],
		},
		alignment: { type: String, enum: ['LG', 'NG', 'CG', 'NG', 'N', 'CN', 'LE', 'NE', 'CE'] },
		strength: { type: Number },
		dexterity: { type: Number },
		constitution: { type: Number },
		intelligence: { type: Number },
		wisdom: { type: Number },
		charisma: { type: Number },
		saves: { type: String },
		deathSaves: [{ type: Number }],
		speed: { type: String },
		armorClass: { type: String },
		hitPointsTotal: { type: Number },
		hitPoints: { type: Number },
		hitPointsAlt: { type: Number },
		conditions: [{ type: String }],
		age: { type: Number },
		eyes: { type: String },
		skin: { type: String },
		weight: { type: Number },
		height: { type: Number },
		hair: { type: String },
	},
});

const Character = mongoose.model('Character', characterSchema);

module.exports = Character;
