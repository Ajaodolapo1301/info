var express =require("express")
var bodyParser = require("body-parser")
var cors = require("cors")
var app=express()
var authRoute = require("./routes/api/auth")
var userRoute = require("./routes/api/user")
var staffRoute = require("./routes/api/staff")
var fileUpload = require("express-fileupload")
const path = require("path")
const config  = require("./config/secret")
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(fileUpload())






app.use(express.json({extended:false}))

app.use("/api/auth", authRoute)
app.use("/api/user", userRoute)
app.use("/api/staff", staffRoute)

// serve static

if(process.env.NODE_ENV === "production"){
    app.use(express.static("client/build"))

    app.get("*", (req,res)=>{
        res.sendFile(path.resolve(__dirname,"client", "build", "index.html"))
    })

} 
const PORT = process.env.PORT || 5000

app.listen(PORT|| 5000 ,function() {
    console.log(`server running like bolt ${PORT}`)
})
