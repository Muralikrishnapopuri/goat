const express = require("express");
const router = express.Router();
const User = require("../models/User");

//Get all users

router.get("/users",async (req , res)=>{
    try{

        const users = await User.find();
        res.status(200).json({status:"success",data:users,count:users.length});
    }catch(error){
          res.status(500).json({status:"error",message:error.message});
    }

});

router.post("/register",async (req,res)=>{
    try{
const user =await User.create(req.body);
res.status(201).json({message:"success",data:user});
    }catch(error){
        res.status(500).json({status:"error",message:error.message});
    }
});

router.delete("/delete/:id", async (req,res)=>{
    const id = req.params.id;
    try{
      const user = await User.findByIdAndDelete(id);
      if(!user){
       res.status(404).json({message:"User not found"});
      }
      res.status(200).json({message:`user Delete Successfully:${user.name}`})
    }catch(error){
        res.status(500).json({message:"Server erro whiole deleting user",error:error.message})
    }
})

router.put("/update/:id", async (req,res)=>{
    const id = req.params.id;
    const body = req.body;
try{
    const user = await User.findByIdAndUpdate(id,body,{new:true,runvalidators:true});
    if(!user){
        res.status(404).json({message:"User not found",error:error.message});

    }
    res.status(200).json({message:"user udated sucessfully",data:user})

}catch(error){
    res.status(404).json({message:"Db error while updating an user",error:error.message});
}
  
});


router.put
module.exports = router;

