const router = require("express").Router();
const authenticateUser = require("../../middleware/authenticate");
const roomSchema = require("../../models/RoomSchema"); 

router.put("/transferRoom/:roomId", authenticateUser,(req, res) => {
  const {roomId} = req.params
  const {requestor, transferTo} = req.body

  try{
    if(transferTo == null || !transferTo){
      return res.status(400).send({
        err: "Invalid arguments",
      });
    }

    roomSchema.findOne({room_id: roomId}, (err, room) => {
      if(err || room == null){
        return res.status(404).send({
          err: "Invalid room code"
        })
      }

      if(room.owner_client_id !== requestor){
				return res.status(403).send({
					err: "user doesn't have permissions to kick user"
				})
			}

      if(room.banned_users.includes(transferTo.toString())){
        return res.status(403).send({
          err: "remove specified user from banned list first"
        })
      }

      room.owner_client_id = transferTo
      room.save()

      return res.send({
        success: true,
        msg: "owner transfershiped to new user"
      })

    })

  }catch(err){
    res.status(402).send({
      err: "Unexpected error occured"
    })
    console.log(err);
  }
})

module.exports = router