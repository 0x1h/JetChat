const router = require("express").Router();
const authenticateUser = require("../../middleware/authenticate");
const roomSchema = require("../../models/RoomSchema");
const { validateURL } = require("../../utils/validateURL")
const fetch = require("node-fetch")

router.post("/create", authenticateUser, async (req, res) => {
  const { room_id, room_name, room_icon, requestor } = req.body;

  try {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
      return res.status(400).send({
        err: "Invalid argumetns",
      });
    }

    let isImage = false

    const validateURLstring = validateURL(room_icon)

    if (validateURLstring) {
      await fetch(room_icon)
        .then(resp => { if (resp.ok) isImage = true })
        .catch(() => isImage = false)
    }

    const newRoom = new roomSchema({
      room_id: room_id,
      room_name: room_name,
      room_icon: !isImage ? "https://i.ibb.co/gmRgrnX/grayscale.png" : room_icon,
      owner_client_id: requestor,
      online_users: [],
      banned_users: [],
    });

    newRoom
      .save()
      .then(() => {
        res.send({
          msg: "Successfully created"
        })
      })
      .catch(() => {
        res.status(409).send({
          err: "Error occured"
        })
      })

  } catch (e) {
    console.log(e);
    res.status(409).send({
      err: "Error occured",
      msg: e
    })
  }
});

module.exports = router