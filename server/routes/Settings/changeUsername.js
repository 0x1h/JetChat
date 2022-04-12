const router = require("express").Router();
const authenticateUser = require("../../middleware/authenticate");
const UserScheme = require("../../models/UserSchema");

router.put("/change_username", authenticateUser,(req, res) => {
  const {requestor, new_username} = req.body

  try{

    if(new_username.length <=3 || new_username.length > 15){ 
      return res.status(403).send({
        err: "invalid length of new username"
      })
    }

    UserScheme.findById(requestor, async (err, user) => {
      const isUsernameExist = await UserScheme.findOne({username: new_username.trim()})
      if(isUsernameExist){
        return res.status(403).send({
          err: "Username is already taken"
        })
      }

      user.username = new_username.trim()
      user.save()

      return res.send({
        success: true,
        username: new_username.trim()
      }) 

    })
  }catch(err){
    console.log(err)
  }
})

module.exports = router