const router = require("express").Router()
const authenticateUser = require("../middleware/authenticate")
const { modelName } = require("../models/UserScheme")
const UserScheme = require("../models/UserScheme")

router.post("/:client_id", authenticateUser, async (req, res) => {
	const { client_id } = req.params

	try{
		if(!client_id){
			return res.status(400).send({
				err: "Invalid arguments"
			})
		}

		UserScheme.findById(client_id, (err, model) => {
			if(err){
				return res.status(404).send({
					err: "User not found"
				})
			}

			res.send({
				username: model.username,
				profile_src: model.profile_src,
				createdAt: model.createdAt,
				client_id: model._id
			})

		})

	}catch(err){
		console.log(err);
	}
})

module.exports = router