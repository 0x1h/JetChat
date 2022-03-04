const router = require("express").Router();
const authenticateUser = require("../middleware/authenticate");
const roomSchema = require("../models/RoomSchema"); 

router.post("/join/:room_id", authenticateUser, async (req, res) => {
	const {room_id} = req.params 
	
	try{
		if(room_id === undefined || room_id === null || room_id === ""){
			return res.status(400).send({
				err: "Invalid arguments"
			})
		}  
		
		roomSchema.findOne({room_id: room_id}, (err, room) => {
			if(err || room === null){
				return res.status(404).send({
					err: "room not found"
				})
			}

			res.send({
				room_id: room.room_id,
				room_name: room.room_name,
				owner_id: room.owner_client_id,
				banned_users: room.banned_users,
				room_icon: room.room_icon
			})
		})
	}
	catch(e){
		console.log(e)
	}
})

module.exports = router