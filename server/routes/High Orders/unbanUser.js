const router = require("express").Router();
const authenticateUser = require("../../middleware/authenticate");
const roomSchema = require("../../models/RoomSchema"); 

router.put("/unban.User/:roomId", authenticateUser, async (req,res) => {
  const {roomId} = req.params
  const {requestor, unBanUser} = req.body

  try {
    roomSchema.findOne({room_id: roomId}, (err, room) => {
      if(err || !room){
        return res.status(404).send({
          err: "Invalid room code"
        })
      }

      if(requestor === undefined || requestor === null || unBanUser === undefined){
        return res.status(402).send({
          err: "Invalid arguments"
        })
      }

      if(room.owner_client_id !== requestor){
				return res.status(403).send({
					err: "user doesn't have permissions to kick user"
				})
			}

      if(!room.banned_users.includes(unBanUser.toString())){
        return res.status(404).send({
          err: "user not found in speficied room"
        })
      }

      room.banned_users = room.banned_users.filter(id => id !== unBanUser)

      room.save()

      return res.send({
        success: true,
        msg: "user unbanned"
      })
    
    })
  }catch(err){
    return res.status(400).send({
      err: "Unexpected error oroccured"
    })
  }
})

module.exports = router