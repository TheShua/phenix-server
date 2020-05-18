const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const partySessionSchema = new Schema({
	table_id: { type: Schema.Types.ObjectId, ref: 'Table' },
	date_start: { type: Date },
	date_end: { type: Date },
	suggestions: [{ start: { type: Date }, end: { type: Date } }],
	name: { type: String },
	review: { type: String },
});

const PartySession = mongoose.model('PartySession', partySessionSchema);

module.exports = PartySession;
