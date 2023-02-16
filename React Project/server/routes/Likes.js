const express = require("express")
const { validateToken } = require("../middlewares/AuthMiddleware")
const router = express.Router()
const {Likes} = require("../models")

router.post("/", validateToken, async (req,res) => {
    const {postId} = req.body
    const userId =  req.user.id

    const found = await Likes.findOne( { where : {PostId: postId, UserId: userId}}) // used both foreign keys{postid,userid} to determine whether the post has been liked or not. 
    
    if(!found) {
        await Likes.create({PostId: postId, UserId: userId}) // if the user has not liked the post.
        res.json( { liked : true } )
    }
    else {
        await Likes.destroy( { where : {PostId: postId, UserId: userId}})
        res.json( { liked : false } )
    }
})


module.exports = router