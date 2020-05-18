const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tableSchema = new Schema({
	dm_id: { type: Schema.Types.ObjectId, ref: 'User' },
	player_id: [{ type: Schema.Types.ObjectId, ref: 'User' }],
	name: { type: String },
	scope: { type: String, enum: ['public', 'private'] },
});

const Table = mongoose.model('Table', tableSchema);

module.exports = Table;
