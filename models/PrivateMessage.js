const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const privatemessageSchema = new Schema({
	from_type: { type: String, enum: ['system', 'user'], default: 'system' },
	from_user: { type: Schema.Types.ObjectId, ref: 'User' },
	to: { type: [Schema.Types.ObjectId], ref: 'User', required: true },
	created: { type: Date, default: new Date() },
	read: { type: Boolean, default: false },
	subject: { type: String, required: true },
	message: { type: String, required: true },
});

const PrivateMessage = mongoose.model('PrivateMessage', privatemessageSchema);

module.exports = PrivateMessage;
