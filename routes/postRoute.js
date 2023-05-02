const express = require('express');
const { postModel } = require('../models/post.model');

const postRoutes = express.Router()

postRoutes.get("/",async(req,res)=>{
    try {
        const post = await postModel.find()
        res.status(200).send(post)
    } catch (error) {
        res.status(400).send({"err": error.message})
    }
})

postRoutes.post("/add",async(req,res)=>{
    try {
        const post = await postModel.create(req.body)
        await post.save()
        res.status(200).json({msg: "New post created successfully"})
    } catch (error) {
        res.status(400).json({err:error.message})
    }
})

postRoutes.patch("/update/:id",async(req,res)=>{
    const {userId} = req.params
    const post = await postModel.findOne({_id:userId})
    try {
        if(req.body.userId!== post.userId){
            req.status(400).json({msg: "You are not authorized to access this"})
       }else{
            await postModel.findByIdAndUpdated({_id:userId},req.body)
            res.status(200).json({msg :`Post with ${userId} updated successfully`})
       }
        
    } catch (error) {
        res.status(400).json({err: error.message})
    }
})

postRoutes.delete("/delete/:id",async(req,res)=>{
    const {userId} = req.params
    const post = await postModel.findOne({_id:userId})
    try {
        if(req.body.userId!== post.userId){
            req.status(400).json({msg: "You are not authorized to access this"})
       }else{
            await postModel.findByIdAndDelete({_id:userId})
            res.status(200).json({msg :`Post with ${userId} deleted successfully`})
       }
        
    } catch (error) {
        res.status(400).json({err: error.message})
    }
})


module.exports={
    postRoutes
}