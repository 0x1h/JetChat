const router = require("express").Router();
const authenticateUser = require("../../middleware/authenticate");
const UserSchema = require("../../models/UserSchema")
const { decryptData } = require("../../utils/decryptData")
const { hashData } = require("../../utils/hashData")
const { tokenGenerator } = require("../../utils/tokenGenerator")


router.put("/change_password", authenticateUser, (req, res) => {
  const { requestor, new_password, old_password } = req.body

  try {
    if (old_password == null || new_password == null) {
      return res.status(400).send({
        err: "invalid arguments"
      })
    }

    if(new_password.length < 8){
      return res.status(403).send({
        err: "Password length must be 8 or more long character"
      })
    }

    UserSchema.findOne({client_id: requestor}, (_, user) => {
      if(old_password !== decryptData(user.password)){
        return res.status(403).send({
          err: "Password is incorrect"
        })
      }
      
      if(new_password === decryptData(user.password)){
        return res.status(403).send({
          err: "New password can't be same as old one"
        })
      }

      const generateNewToken = tokenGenerator()
      const setNewPassword = hashData(new_password)

      user.password = setNewPassword
      user.authToken = generateNewToken

      user.save()

      return res.send({
        success: true,
        authToken: generateNewToken
      })

    })

  } catch (err) {

  }
})

module.exports = router