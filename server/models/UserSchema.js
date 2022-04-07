const mongoose = require('mongoose');
const { Schema } = mongoose;
 
const UserScheme = new Schema({
	username: {type: String}, 
	profile_src: {type: String},
	password: {type: String},
	authToken: {type: String},
	main_color: {type: String}
}, {timestamps: true})

module.exports = mongoose.model("user", UserScheme)