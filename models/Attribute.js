const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const attributeSchema = new Schema({
	name: { type: String },
});

const Attribute = mongoose.model('Attribute', attributeSchema);

module.exports = Attribute;
