var mongoose = require("mongoose")
var bcrypt = require("bcryptjs")
var jwt = require("jsonwebtoken")
var config = require("../config/secret")

var userSchema = new mongoose.Schema({
    email:{
        type: "string",
        required: true,
        unique:true
    },

    name:{
        type:"string",
        required: true,
    },

    password:{
        type: "string",
        required: true,
    },
    avatar:{
        type: "string"
    },
    date: {
        type: Date,
        default: Date.now
    }

    
});

userSchema.pre("save" , function(next) {
var user = this;
    if (!user.isModified ("password")) return next()       
bcrypt.hash(user.password, 10)
.then(function(hashedPassword) {
    user.password = hashedPassword
    next()
})
},function(err){
    return next(err)
},

userSchema.methods.comparePassword = function(candidatePassword,next) {
    bcrypt.compare(candidatePassword,this.password,function (err,isMatch) {
        if (err) return next(err)
        next (null,isMatch)
       });
})




userSchema.methods.generatejwt = function generatejwt() {
    var user= this
    return jwt.sign(
        {
            email: this.email, 
            user:{
                id:user.id
            }

        },
         config.jwtsecret,
        {expiresIn: 360000}
    )
}

userSchema.methods.toAuthJSON = function toAuthJSON () {
    return {
        // email:this.email,
        token: this.generatejwt()
    }
}




  var User = mongoose.model("User", userSchema);
module.exports = User