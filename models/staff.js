var mongoose = require("mongoose")
var User = require("./user")


var staffSchema = new mongoose.Schema({
    First_name:{
        type: "string",
        required: true,
    },
    Last_name: {
        type:String,
    },
    email:{
        type: String
    },
    profilePics: {
        type:String,
        default: "http://placehold.it/350/*150"
    }, 
    dob: {
        type:Date,
        default: Date.now
    },
    state_of_origin : {
        type:String
    },
date: {
    type: Date,
    default: Date.now 
}

});




let Staff = mongoose.model("Staff", staffSchema)

module.exports = Staff


