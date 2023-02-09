const express = require("express");
const router = express.Router();
const {Users}  = require("../models");
const bcrypt  = require("bcrypt");

const { sign }  = require("jsonwebtoken");

router.post("/", async (req,res) => {
    const { username,password } = req.body; // the body object is destructured so that username and password can be
                                        // stores separately and password can be encrypted using a library called
                                        // bcrypt.
    bcrypt.hash(password,10).then((hash) => {
        Users.create({
            username: username,
            password: hash,
        });
        res.json("success");
    });

});

router.post("/login", async (req,res) => { // user enter their credentials(username,password), application is 
    const {username,password} = req.body; // directs to the /login endpoint where the username and password 
    const user = await Users.findOne({where:{username: username}})// are verified.

    if(!user){ // if the username is not found in the database.
        return res.json( {error: "Username does not exist!"})
    }
    else
        bcrypt.compare(password, user.password).then((match) => { // compare the password entered by the user to the password in the user database.
            if(!match) { // if password does not match then prompt the user an error message.
                return res.json( {error: "Entered password is incorrect!, please check the username and re-enter the password"})
            }
            else{    
            const accessToken = sign(
                { username: user.username, id: user.id },
                "importantsecret",
                );     // payload is the data that is being secured.
                return res.json(accessToken)
            }
        })
})

module.exports = router;