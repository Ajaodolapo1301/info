var express = require("express");
var router = express.Router({mergeParams:true});
var db =require("../models")
var jwt = require("jsonwebtoken")
var helper = require("../helper/auth")



exports.createMessage =function(req,res,next) {
    const newMessage ={
        text:req.body.text,
        userId: req.params.id
    }
    db.Message.create(newMessage)
    .then(function(message){
    db.User.findById(req.params.id)
    .then(function(user) {
        user.message.push(message.id)
        user.save()
        .then(function(user) {
            return db.Message.findById(message._id)
            .populate("userId",{username:true, profileImageUrl:true,timestamp:true})
        }).then(function(m) {
            return res.status(200).json(m)
        }).catch(next)

    }).catch(next)
    }).catch(next)
}

