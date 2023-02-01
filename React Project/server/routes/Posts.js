const express = require("express");
const router = express.Router();
const {Posts} = require("../models");

router.get('/',async (req,res) => {
    const listOfPosts = await Posts.findAll();
    res.json(listOfPosts);
});

router.post("/",async(req,res) => {
    const post = req.body;
    await Posts.create(post); // Posts is the model defined by us.
    res.json(post);
});

module.exports = router;
