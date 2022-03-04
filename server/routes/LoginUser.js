const UserSchema  = require("../models/UserSchema")
const router = require("express").Router()
const { decryptData } = require("../utils/decryptData")

router.post("/login", async (req, res) => {
	const {username, password} = req.body

	try{
		if(!username || !password){
			return res.status(400).send({
				err: "Invalid argumetns"
			})
		}
 
		UserSchema.findOne({username: username}, (err, model) => {
			if(err || model === null){
				return res.status(404).send({
					err: "User not found"
				})
			}

			if(decryptData(model.password) !== password){
				return res.status(403).send({
					err: "Password is incorrect"
				})
			}

			res.send({
				username: model.username,
				profile_src: model.profile_src,
				createdAt: model.createdAt,
				client_id: model._id,
				authToken: model.authToken 
			})

		})
	}
	catch(err){
		console.log(err);
	}
})

module.exports = router