var express = require("express");
var { check, validationResult} = require("express-validator")
var router = express.Router();
var db = require("../../models")
const gravatar = require("gravatar")
const User = require("../../models/user")
const auth = require("../../middleware/auth")


// Registration
router.post("/register",  [
    check("name", "name is required").not().isEmpty(),
    check("email", "email is required").isEmail(),
    check("password", "password is required and with 6 or more character").isLength({min: 6})

], async function (req, res) {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
    return    res.status(400).json({errors: errors.array()})    
    }
    
console.error(errors)    


     const  { name, email, password} = req.body
      
    try {
        // check  if User already exist
     let user =  await User.findOne({email})
         if (user) {
          return  res.status(400).json({errors:[{msg: "user already exist"}]})
        }

        const avatar = gravatar.url(email,{
            s:"200",
            r: "pg",
            d:"mm"
        })

       user =  await new User({
        name, 
        email, 
        avatar,
        password
       })
      
    

        await user.save() 
        res.json(user.toAuthJSON())

    } catch (error) {
        console.log(error)
        res.status(500).send("server error")
    }
})













module.exports = router
