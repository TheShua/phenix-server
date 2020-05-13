const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sessionSchema = new Schema({
	table_id: { type: Schema.Types.ObjectId, ref: 'Table' },
	date: { type: Date },
	name: { type: String },
	review: { type: String },
});

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;
