const UserScheme = require("../models/UserScheme");
const router = require("express").Router();
const { hashData } = require("../utils/hashData");
const { tokenGenerator } = require("../utils/tokenGenerator");
const { verify } = require("hcaptcha");

router.post("/signup", async (req, res) => {
  const { username, profile_src, password, isVerified } = req.body;
  let captchaFailHandler = false
  
  try {
    
    if (!username.trim() || !password.trim()) {
      return res.status(403).send({
        err: "invalid argument",
      });
    }

    UserScheme.findOne({ username: username.toLowerCase() }, (err, user) => {
      if (user) {
        return res.status(406).send({
          err: "User already exists",
        }); 
      }

      verify(process.env.CAPTCHA_SECRET, isVerified)
      .then((resp) => {
        if (!resp.success) {
          return res.status(403).send({
            err: "captcha failed",
          });
        }
  
        captchaFailHandler = true
      })
      .catch(err => {   
        return
      })

      const enc_pass = hashData(password);
      const authToken = tokenGenerator();

      const newUser = UserScheme({
        username: username.toLowerCase(),
        profile_src: profile_src,
        password: enc_pass,
        authToken: authToken,
      });

      newUser
        .save()
        .then((save) => {
          res.send({
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
