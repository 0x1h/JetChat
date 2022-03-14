const router = require("express").Router();
const authenticateUser = require("../middleware/authenticate");
const roomSchema = require("../models/RoomSchema"); 


router.put("/update_user/remove/:room_id", authenticateUser, async (req, res) => {
	const {room_id} = req.params
	const {requestor} = req.body

	try{

		roomSchema.findOne({room_id: room_id}, async (err, room) => {
			
			if(err || room === null){
				return res.status(404).send({
					err: "invalid room"
				})

			}
			if(room.owner_client_id === requestor){
				await roomSchema.deleteOne({room_id: room_id})
				return res.send({
					msg: "room will be deleted"
				})
			}

			const deleteUser = room.online_users.filter(e => e.client_id !== requestor)
			room.online_users = deleteUser

			res.send({
				msg: "user left"
			})

		})
	}catch(e){
		console.log(e);
	}
})

module.exports = router