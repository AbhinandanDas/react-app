const express = require('express');
const router = express.Router();
const {Comments} = require('../models');
const { validateToken }  = require('../middlewares/AuthMiddleware')

router.get("/:postId", async (req,res) => {
    const postId = req.params.postId;
    const comments = await Comments.findAll({ where: { PostId: postId}});
    res.json(comments);
})

router.post("/",validateToken, async (req,res) => {
    const comment = req.body; // body is the data the user wants to store in the database.
    await Comments.create(comment); // create is the sequelize(ORM) function used to store the comment in the SQL.
    res.json(comment); // response.
})

module.exports = router;