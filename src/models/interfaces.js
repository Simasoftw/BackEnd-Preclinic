const mongoose = require('mongoose');
const schema = mongoose.Schema;

const rolSchema = schema({
 	text: String,
 	type: String,
 	state: Object,
	children: Array
});

const rol = mongoose.model('interfaces', rolSchema);
module.exports = rol;