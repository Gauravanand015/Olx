const jwt = require('jsonwebtoken');
require("dotenv").config()

const authenticate = (req,res,next)=>{
    const token = req.headers.authorization;
    try {
        if(token){
            jwt.verify(token, process.env.KEY, (err, decoded)=>{
                if(decoded){
                    req.body.email = decoded.email;
                    next()
                }else{
                    console.log(err)
                    console.log(err)
                    res.send("JWT malformed")
                }
              });
        }else{
            res.send("Token Invalid")
        }
    } catch (error) {
        console.log(error)
        res.send("Error in authenticate Middleware")
    }
}

module.exports = {
    authenticate
}