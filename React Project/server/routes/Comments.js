const express = require('express');
const router = express.Router();
const {Comments} = require('../models');
const { validateToken }  = require('../middlewares/AuthMiddleware')

// fetching the comments.
router.get("/:postId", async (req,res) => {
    const postId = req.params.postId;
    const comments = await Comments.findAll({ where: { PostId: postId}});
    res.json(comments);
})

// adding the comment to the database.
router.post("/",validateToken, async (req,res) => {
    const comment = req.body; // body is the data the user wants to store in the database.
    const username = req.user.username; //username is stored inside the req.user object. See middleware/AuthMiddleware.js to understand.
    comment.username = username;
    const newComment = await Comments.create(comment); // create is the sequelize(ORM) function used to store the comment in the SQL.
    // wait for the full result of the 'create operation' so the comment id gets stored in the variable. 
    res.json(newComment); // response.
})

router.delete("/:commentId",validateToken, async (req,res) => {
    const commentId = req.params.commentId

    await Comments.destroy({where: {
        id: commentId,
    }})
    res.json("Comment Deleted")
})

module.exports = router;