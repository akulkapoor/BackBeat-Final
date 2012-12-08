var mongoose = require('mongoose');
var config = require("../config");
mongoose.connect(config.development.dbUrl);

var userSchema = new mongoose.Schema({
	fbID: String,
	name: String,
	email: {type:String, lowercase: true},
	bands: [String]
});

module.exports = mongoose.model('User',userSchema)