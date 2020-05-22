const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const privatemessageSchema = new Schema({
	from_type: { type: String, enum: ['system', 'user'], default: 'system' },
	from_user: { type: Schema.Types.ObjectId, ref: 'User' },
	type: { type: String, enum: ['message', 'planner'], default: 'message' },
	to: [
		{
			target: { type: Schema.Types.ObjectId, ref: 'User', required: true },
			read: { type: Boolean, default: false },
			vote: { type: [Boolean] },
		},
	],
	created: { type: Date, default: new Date() },
	subject: { type: String, required: true },
	message: { type: String, required: true },
	sessionCheck: { type: Schema.Types.ObjectId, ref: 'PartySession' },
});

const PrivateMessage = mongoose.model('PrivateMessage', privatemessageSchema);

module.exports = PrivateMessage;
