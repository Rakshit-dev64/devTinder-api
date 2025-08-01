const jwt = require("jsonwebtoken");
const User = require("../models/user")
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;

const userAuth = async(req,res,next)=>{
    try{
        const {token} = req.cookies;
        if(!token){
            return res.status(401).send("Please Login")
        }
        const decodedMessage = jwt.verify(token, JWT_SECRET);
        const {_id} = decodedMessage;
        const user = await User.findById(_id);
        if(!user){
            throw new Error("User not found");
        }
        req.user = user; // attaching the user we found in the db to req so that  it can be accessed in later middleware or route handlers.
        next();
    }catch(err){
        res.status(400).send(err.message);

    }

}

module.exports = {
    userAuth,
}