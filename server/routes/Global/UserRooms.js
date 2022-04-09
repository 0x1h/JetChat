const router = require("express").Router();
const authenticateUser = require("../../middleware/authenticate");
const roomSchema = require("../../models/RoomSchema");

router.post("/rooms", authenticateUser, (req, res) => {
  const {requestor} = req.body

  roomSchema.find({owner_client_id: requestor}, (err, rooms) => {
    if(err || rooms == null){
      return res.status(404).send({
        err: "user doesn't have any rooms"
      })
    }

    const filterObjects = rooms.map((room) => {
      return {
        room_name: room.room_name,
        room_id: room.room_id,
        room_icon: room.room_icon
      }
    })

    res.send(filterObjects)
  })
})

module.exports = router