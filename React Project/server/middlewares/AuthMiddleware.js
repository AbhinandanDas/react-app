//This middleware will validate the JWT and verify whether the user is present in the database,
//if user is present, then the comment will be stored in the database.
//if the user credentials are not valid then return some error message inside json.
const { verify } = require("jsonwebtoken")

const validateToken = (req,res,next) => { // next is a function that is called if you want the request to move forward.
    const accessToken = req.header("accessToken");
    if(!accessToken){ // if user has not even logged in but trying to comment.
        return res.json({ error: "User not logged in!" });
    }

    try {
        const validToken = verify(accessToken,"important"); // if user has logged in, check the token whether it is the same as the one that gets created or not.
        req.user = validToken;
        if(validToken) {
            return next(); // if the token is valid then continue to the API endpoint.
        }
    }
    catch(err) {
        return res.json({ error:err })
    }

}

module.exports = { validateToken }