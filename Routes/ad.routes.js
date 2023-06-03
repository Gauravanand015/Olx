const express = require("express");
const adRouter = express.Router();
const multer  = require('multer');
const { authenticate } = require("../Middleware/authenticate");
const { AdModel } = require("../Model/ad.model");
const axios = require("axios")
const upload = multer({ dest: 'uploads/' })

adRouter.get("/allData",async(req,res)=>{
    let getAll = await AdModel.find()
    res.send(getAll)
})

adRouter.post("/classified",upload.single('avatar'),authenticate,async(req,res)=>{
    const image = req.file.avatar;
    const {name,description,category,location,postedAt,price} = req.body
    try {
        let newData = new AdModel({
            name,
            description,
            category,
            image:image,
            location,
            postedAt,
            price
        })
        await newData.save();
        res.send("Data Posted")

    } catch (error) {
        console.log(error);
        res.send("Error while posting file")
    }
})

adRouter.get("/byCategory/?",async(req,res)=>{
    let query = req.query.category;
    let data = await AdModel.find();
    // res.send(data)
    let x = data.filter((elem)=>{
        if(elem.category === query){
            return elem
        }
    })
    res.send(x)
})

adRouter.delete("/delete/:id",async(req,res)=>{
    try {
        const data = await AdModel.findByIdAndDelete({_id:req.params.id})
        res.json("Data Deleted")
    } catch (error) {
        console.log(error)
        res.json("Error while deleting data")
    }
})

adRouter.get("/sort",async(req,res)=>{
    const data = await AdModel.find().sort({postedAt:1})
    res.json("Data Sorted")
})


module.exports = {
    adRouter
}