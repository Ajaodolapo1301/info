var jwt= require("jsonwebtoken")
var config = require("../config/secret")


            module.exports = function (req, res,  next) {
                // get token from header
                const token = req.header("x-auth-token")
                
                if (!token) {
                 return   res.status(401).json({msg:"please log in, no token found" })
                } 

                try {
                    // verify token
                    const decoded= jwt.verify(token, config.jwtsecret)
                    req.user = decoded.user
                    next()
                    
                } catch (error) {
                    res.status(401).json({msg:"not authorized"})
                }


            }





