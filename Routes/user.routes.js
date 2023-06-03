const express = require("express");
const { UserModel } = require("../Model/user.model.");
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');
require("dotenv").config()
const userRouter = express.Router();

userRouter.post("/signup", async (req, res) => {
  const { email, password, confirmPassword } = req.body;
  try {
    if (password == confirmPassword) {
      const emailData = await UserModel.find({ email: email });
      if (emailData.length > 0) {
        return res.json("This email is already registered");
      } else {
        bcrypt.hash(password, 8, async(err, hash)=>{
            if(err){
                console.log(err)
                res.json("Fill All the details")
            }else{
                let userData =  new UserModel({
                    email,
                    password:hash,
                    confirmPassword:hash
                })

                await userData.save()
                res.json("User Registered")
            }
        });
      }
    } else {
      res.json("Password does not match");
    }
  } catch (error) {
    console.log(error);
    res.json("Error In SignUp Route");
  }
});

userRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body;
    const emailData = await UserModel.find({email:email});

    try {
        if(emailData.length>0){
            bcrypt.compare(password, emailData[0].password, (err, result)=>{
                if(result){
                    const token = jwt.sign({ email: emailData[0].email }, process.env.KEY);
                    res.json({
                        Message:"Login Successful",
                        "token":token
                    })
                }else{
                    console.log(err)
                    res.json({Message:"Password is wrong"})
                }
            });
        }else{
            res.json("Email is not registered")
        }
    } catch (error) {
        console.log(error);
        res.json("Error In Login Route");
    }
})

module.exports = {
  userRouter,
};
