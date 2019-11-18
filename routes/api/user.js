const router = require("express").Router()
const User = require("../../models/user")
const auth = require("../../middleware/auth")
var { check, validationResult} = require("express-validator")


// @ GET API/auth
// @desc  user route
 //@access private
router.get("/", auth, async (req, res) => {
  try {
      const user = await User.findById(req.user.id).select("-password")
      res.status(200).json(user)
  } catch (error) {
      console.error(error.message)
      res.status(400).json(error)
  }
})




// @ POST API/auth
// @desc  LOGIN ROUTE
// @access PUBLIC
router.post("/login",  [
    check("email", "email is required").isEmail(),
    check("password", "password is required").exists()

], async function (req, res) {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
    return    res.status(400).json({errors: errors.array()})
    }
     const  { email, password} = req.body
      
    try {
        // if no user
     let user =  await User.findOne({email})
         if (!user) {
          return  res.status(400).json({errors:[{msg: "invalid credentials"}]})
        }

        user.comparePassword( password, function(err, ismatched) {
                if (ismatched) {
                    res.status(200).json(user.toAuthJSON())
                } else {
                    res.status(400).json({errors: [{msg:"invalid credentials"  }]})
                }
            })

    } catch (error) {
        console.log(error)
        res.status(500).send("server error")
    }
})















module.exports= router