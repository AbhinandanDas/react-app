const express = require("express");
const router = express.Router();
const {Posts , Likes} = require("../models");
const {validateToken} = require("../middlewares/AuthMiddleware")

// API endpoint to fetch all the posts from the database.
router.get('/',validateToken, async (req,res) => {
    const listOfPosts = await Posts.findAll({include: [Likes]});
    const likedPosts = await Likes.findAll( { where : { UserId: req.user.id} } )
    res.json({ listOfPosts: listOfPosts, likedPosts: likedPosts});
});
 // API endpoint for fetching data by ID.
router.get('/byId/:id',async (req,res) => {
    const id = req.params.id;
    const post = await Posts.findByPk(id);
    res.json(post);
});

//API endpoint for fetching all posts made by a user
router.get('/byuserId/:id',async (req,res) => {
    const id = req.params.id
    const listOfPosts = await Posts.findAll( {
        where: { UserId: id},
        include: [Likes]
    })
    
    res.json(listOfPosts)

})
//API endpoint to post the data into the database.
router.post("/",validateToken,async(req,res) => {
    const post = req.body;
    post.username = req.user.username;
    post.UserId = req.user.id;
    await Posts.create(post); // Posts is the model defined by us.
    res.json(post); // confirmation response.
});

// API endpoint to update the title of a post.

router.put("/title",validateToken,async (req,res) => {
    const {newTitle,id} = req.body
    await Posts.update( { title:newTitle}, { where : {id:id}})
    res.json(newTitle)
})

// API endpoint to update the title of a post.

router.put("/description",validateToken,async(req,res) => {
    const {newDescription,id} = req.body
    await Posts.update( { description: newDescription}, { where: {id:id }})
    res.json(newDescription)
})

//API endpoint to delete a post from the database.
router.delete("/:postId",validateToken,async(req,res) => {
    const postId = req.params.postId;
    await Posts.destroy({ where: { id: postId}})
    res.json("POST DELETED")    
})

module.exports = router;
