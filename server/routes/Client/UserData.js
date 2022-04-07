const router = require("express").Router()
const authenticateUser = require("../../middleware/authenticate")
const UserScheme = require("../../models/UserSchema")

router.post("/:client_id", authenticateUser, async (req, res) => {
	const { client_id } = req.params

	try{
		if(!client_id){
			return res.status(400).send({
				err: "Invalid arguments"
			})
		}
 
		UserScheme.findById(client_id, async (err, model) => {
			if(err || model == null){
				return res.status(404).send({
					err: "User not found" 
				})
			}

			res.send({
				username: model.username,
				profile_src: model.profile_src,
				createdAt: model.createdAt,
				client_id: model._id,
				main_color: model.main_color
			})

		})

	}catch(err){
		console.log(err);
	}
})

module.exports = router