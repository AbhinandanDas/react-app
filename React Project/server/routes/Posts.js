const express = require("express");
const router = express.Router();
const {Posts} = require("../models");

// API endpoint to fetch all the posts from the database.
router.get('/',async (req,res) => {
    const listOfPosts = await Posts.findAll();
    res.json(listOfPosts);
});
 // API endpoint for fetching data by ID.
router.get('/byId/:id',async (req,res) => {
    const id = req.params.id;
    const post = await Posts.findByPk(id);
    res.json(post);
});

//API endpoint to post the data into the database.
router.post("/",async(req,res) => {
    const post = req.body;
    await Posts.create(post); // Posts is the model defined by us.
    res.json(post);
});

module.exports = router;
