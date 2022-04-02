const router = require("express").Router();
const authenticateUser = require("../../middleware/authenticate");
const roomSchema = require("../../models/RoomSchema"); 

router.put("/delete/:room_id", authenticateUser,async (req, res) => {
	const {requestor} = req.body
	const {room_id} = req.params

	try{
		roomSchema.findOne({room_id: room_id}, async (err, room) => {
			if(err || room === null){
				return res.status(404).send({
					err: "Room doesn't exist"
				})
			}
	
	
			if(room.owner_client_id !== requestor){
				return res.status(400).send({
					err: "requestor doesn't have permissions"
				})
			}
	
			await roomSchema.deleteOne({room_id: room_id})
			return res.send({
				success: true,
				msg: "room has deleted successfully"
			})

	
		})
	}catch(err){
		res.status(404).send({
			err: "error occured"
		})
	}
})

module.exports = router