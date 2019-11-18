const router = require("express").Router()
const auth = require("../../middleware/auth")
const Staff = require("../../models/staff")
var { check, validationResult} = require("express-validator")




// @ Staff API/staff/
// @dess  create a staff
 //@access Private
router.post("/", [auth, [
    check("First_name", "First_name field is required").not().isEmpty(),
    check("Last_name", "Last_name field is required").not().isEmpty(),
    check("dob", "dob field is required").not().isEmpty(),
    check("state_of_origin", "state_of_origin field is required").not().isEmpty(),
]
],  async (req, res)=>{
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).json({errors:errors.array()})
    }


    const { First_name, email, Last_name, profilepics, dob, state_of_origin,} = req.body

    try {   
        const newStaff= new Staff({
         First_name,
          Last_name,
       profilepics,
           dob, 
           email,
           state_of_origin
     })
        const staff = await newStaff.save()
        res.json(staff) 
     } catch (error) {
         console.error(error.message)
         res.status(500).send("server error")
     } 
 })

 




// @ Get API/staff/
// @dess  get all Staff
 //@access Private
 router.get("/", auth, async(req,res)=>{
    try {
        const staffs = await Staff.find().sort({date:-1})
        res.json(staffs )

    } catch (error) {
        console.error(error)
        res.status(500).send("server error")
    }
 })


// Update staff
router.put("/:id" ,auth, async (req, res)=>{

    try {
        const staff= await Staff.findByIdAndUpdate(req.params.id, req.body, {new:true})  
        if (!staff) {
            return res.status(404).json({msg:" no staff found"})
        }
        res.json(Staff)
    } catch (error) {
        console.error(error)
        res.status(500).send("server error")
    }
})


// @ Get API/staff
// @dess  get a single staff
 //@access Private
 router.get("/:id", auth, async(req,res)=>{
    try {
        const staff = await Staff.findById(req.params.id).sort({date:-1})
        if (!staff) {
        return res.status(404).json({msg:" no staff found"})
        }
        res.json(staff)

    } catch (error) {
        console.error(error)
        if (error.kind === "ObjectId") {
            return res.status(404).json({msg:" no staff found"})
        }
        res.status(500).send("server error")
    }
 })


// @ DELETE API/staff/:id
// @desc  delete a single Staff
 //@access Private
 router.delete("/:id", auth, async (req,res)=>{
    try {
      const staff= await Staff.findById(req.params.id)
        if (!staff) {
        return  res.status(400).json({msg: "staff not found"})
        }
        await staff.remove()
        res.json({msg: "staff has been removed successfully"})

    } catch (error) {
        console.error(error)
        if (error.kind ==="ObjectId") {
            res.status(400).json({msg: " post not found"})
        }
        res.status(500).send("server error")
    }
 })





 
module.exports = router
