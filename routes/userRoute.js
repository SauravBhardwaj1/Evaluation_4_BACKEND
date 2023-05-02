const express = require('express');
var jwt = require('jsonwebtoken');
const { userModel } = require('../models/auth.model');
const bcrypt = require('bcrypt');

const userRoutes = express.Router()

userRoutes.post("/register",async(req,res)=>{
    const {name,email,password,gender} = req.body

    try {
        bcrypt.hash(password, 5,async(err, hash)=> {
            const user = await userModel({name,email,gender,password:hash})
            await user.save()
            res.status(200).json({msg: "user register successfully"})
        }) 
    } catch (error) {
        res.status(400).json({err: error.message})
    }
})

userRoutes.post("/login",async(req,res)=>{
    const {email,password} = req.body
    try {
        const user = await userModel.findOne({email:email})
        if(user){
            bcrypt.compare(password, user.password, async(err, result)=>{
                // result == true
                if(result){
                    var token = jwt.sign({ userId: user._Id }, 'masai');
                    res.status(200).json({msg:"User login successfull", token: token});
                }else{
                    res.status(400).json({err:"User login failed"})
                }
            });
        }else{
            res.status(400).json({err: "User login failed"})
        }
    } catch (error) {
        res.status(400).json({err: error.message})
    }
})

module.exports={
    userRoutes
}