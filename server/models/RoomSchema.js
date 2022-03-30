const mongoose = require('mongoose');
const { Schema } = mongoose;
 
const RoomSchema = new Schema({
	room_id: {type: String},
	room_name: {type: String},
	room_icon: {type: String},
	owner_client_id: {type: String},
	online_users: [
		{
			client_id: {type: String},
			profile_src: {type: String},
			username: {type: String}
		}
	],
	banned_users: [String],
}, {timestamps: true})

module.exports = mongoose.model("rooms", RoomSchema)