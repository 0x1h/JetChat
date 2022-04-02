const UserScheme = require("../../models/UserSchema");
const router = require("express").Router();
const { hashData } = require("../../utils/hashData");
const { tokenGenerator } = require("../../utils/tokenGenerator");
const {validateURL} = require("../../utils/validateURL")
const fetch = require("node-fetch")
const { verify } = require("hcaptcha");


router.post("/signup", async (req, res) => {
  const { username, profile_src, password, isVerified } = req.body;
  
  try {
    
    if (!username || !password) {
      return res.status(403).send({
        err: "invalid argument",
      });
    }

    if(!username.trim() || !password.trim()){
      return res.status(403).send({
        err: "invalid argument",
      });
    }

    UserScheme.findOne({ username: username.toLowerCase() }, async (err, user) => {
      if (user) {
        return res.status(406).send({
          err: "User already exists",
        }); 
      }

      const verifyAccept = await verify(process.env.CAPTCHA_SECRET, isVerified)
      if(!verifyAccept.success){
        return res.status(403).send({
          err: "captcha failed",
        });
      }

      let isImage = false

      const validateURLstring = validateURL(profile_src)

      if(validateURLstring){
        await fetch(profile_src)
        .then(resp => {if(resp.ok) isImage = true})
        .catch(() => isImage = false)
      }

      console.log("iamge validate:",isImage);

      const enc_pass = hashData(password);  
      const authToken = tokenGenerator();

      const randomNumber = Math.floor(Math.random() * 32) + 1

      const newUser = UserScheme({
        username: username.toLowerCase(),
        profile_src: isImage ? profile_src : `/Avatars/Avatar-${randomNumber}.png`,
        password: enc_pass,
        authToken: authToken,
      });

      newUser
        .save()
        .then((save) => {
          return res.send({
            username: save.username,
            profile_src: save.profile_src,
            client_id: save._id,
            authToken: save.authToken,
            createdAt: save.createdAt
          });
        })
        .catch((err) => {
          console.log(err);
        });
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
