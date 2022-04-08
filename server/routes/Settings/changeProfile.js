const router = require("express").Router();
const authenticateUser = require("../../middleware/authenticate");
const { validateURL } = require("../../utils/validateURL")
const { getAverageColor } = require('fast-average-color-node');
const fetch = require("node-fetch")
const UserScheme = require("../../models/UserSchema");

router.put("/profile_change", authenticateUser, (req, res) => {
  const { requestor, profile_picture } = req.body

  try {
    if (profile_picture == null) {
      return res.status(402).send({
        err: "invalid arguments"
      })
    }

    UserScheme.findOne({ client_id: requestor }, async (err, user) => {
      if (err || user == null) {
        return res.status(404).send({
          err: "user didn't found"
        })
      }

      //checking if new profile source and old one are same
      if (profile_picture.trim() === user.profile_src) {
        return res.status(403).send({
          err: "photo is same"
        })
      }

      //checking is image url really image
      let isImage = false

      //regex checking of "http"
      const validateURLstring = validateURL(profile_picture)

      //if regex says its real than check URL
      if (validateURLstring) {
        await fetch(profile_picture)
          .then(resp => { if (resp.ok) isImage = true })
          .catch(() => isImage = false)
      }

      //generate random avatar number
      const randomNumber = Math.floor(Math.random() * 32) + 1

      // if [image and url are there set new image]
      // if [there is empty string of image set random avatar]
      // if [if image URL is incorrect back old image]     
      const setImage = (isImage && profile_picture.trim())
      ? profile_picture 
      : (!isImage && !profile_picture.trim())
      ? `/Avatars/Avatar-${randomNumber}.png`
      : user.profile_src

      let ImageRGB = ""

      //if it is image send request to generate average color
      if(isImage){
        await getAverageColor(setImage)
        .then(color => { ImageRGB = color.rgb })
        .catch(() => { ImageRGB = "rgb(136, 136, 136)" })
      }

      user.profile_src = setImage
      user.main_color = !ImageRGB.trim() ? user.main_color : ImageRGB

      user.save()

      res.send({
        success: true,
        new_data: {
          profile_src: setImage
        }
      })
    })

  } catch (e) {
    console.log(e)
  }
})

module.exports = router