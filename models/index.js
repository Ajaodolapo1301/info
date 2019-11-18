var mongoose = require ("mongoose")
var config =  require("../config/secret")
mongoose.set("debug",true)
// mongoose.connect("mongodb://localhost/newbackend" || "mongodb+srv://Ajaodlp:dollypearl1301@devconnectcluster-vb1jl.mongodb.net/test?retryWrites=true&w=majority" 
mongoose.connect(config.database ,{ useNewUrlParser: true, useCreateIndex:true })

mongoose.Promise = Promise 

module.exports.User =require("./user")


