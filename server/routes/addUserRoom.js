const router = require("express").Router();
const authenticateUser = require("../middleware/authenticate");
const roomSchema = require("../models/RoomSchema"); 

router.put("/update_user/add/:room_id", authenticateUser,async (req, res) => {
	const {requestor, username, profile_src} = req.body
	const {room_id} = req.params

	try {	
		if(room_id === null || room_id === undefined){
			return res.status(400).send({
				err: "invalid arguements"
			})
		}

		roomSchema.findOne({room_id: room_id}, (err, room) => {
			if(err || room === null){
				res.status(404).send({
					err: "room not found"
				})
			}

			const newUser = room.online_users.push({
				client_id: requestor,
				profile_src: profile_src,
				username: username
			})
			

			room.active_users = newUser

			room.save()

			res.send({
				msg: "successfully saved"
			})

		})

	}catch(e){
		console.log(e)
	}
})

module.exports = router