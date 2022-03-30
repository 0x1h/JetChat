const router = require("express").Router();
const authenticateUser = require("../middleware/authenticate");
const roomSchema = require("../models/RoomSchema"); 

router.post("/ban.User/:roomId", authenticateUser, async (req, res) => {
  const {roomId} = req.params
  const {requestor, banUserId} = req.body

  try{
    if(banUserId === undefined || banUserId === null){
      return res.status(402).send({
        err: "Invalid arguments"
      })
    }

    roomSchema.findOne({room_id: roomId}, (err, room) => {
      if(err || room === null){
        return res.status(404).send({
          err: "Invalid room code"
        })
      }

      if(room.owner_client_id !== requestor){
				return res.status(403).send({
					err: "user doesn't have permissions to kick user"
				})
			}

      const deleteUser = room.online_users
			room.online_users = deleteUser.filter(e => e.client_id !== banUserId)

      if(room.banned_users.includes(banUserId.toString())){
        return res.status(201).send({
          msg: "user is already banned"
        })
      }

      room.banned_users.push(banUserId.toString())

			room.save()

      res.send({
        msg: "user banned"
      })

    })
  }catch(err){
    console.log(err)
    return res.status(401).send({
      err: "Unexpected error occures"
    })
  }
})

module.exports = router