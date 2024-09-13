const mongoose= require("mongoose");
const User = require("../models/User");
const bcrypt= require("bcrypt");
const jwt= require("jsonwebtoken");
require("dotenv").config();

exports.login= async(req,res)=>{
    try{
        const {email, pass}= req.body;
        let user= await User.findOne({email});
        if(!email || !pass){
            return res.status(400).json({
                success: false,
                message: "Some details are missing"
            })
        }
        if(!user){
            return res.status(401).json({
                success: false,
                message: "User not found"
            })
        }
        const payload= {
            email,
            role: user.role,
            id: user._id
        }
        if(await bcrypt.compare(pass, user.pass)){
            let token= jwt.sign(payload, process.env.JWT_SECRET,{
                expiresIn: "2h"
            });
            
            user= user.toObject();
            user.pass=undefined;
            user.token= token;
            
            const options= {
                expires:new Date(Date.now()+3*24*60*60*1000),
                httpOnly: true
            }
            res.cookie(`token`, token, options).status(200).json({
                success: true,
                message: "Successfully Logged In",
                token,
                user
            });

        }
        else{
            return res.status(403).json({
                success: false,
                message: "Wrong password"
            })
        }
    }
    catch(e){
        // console.log(e);
        res.status(500).json({
            success: false,
            message: e.message,
        })
    }
}

exports.signup= async(req,res)=>{
    try{
        const {name, email, pass, role}= req.body;
        const existingUser= await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success:false,
                message: "User already exists"
            })
        }
        let ePass;
        try{
            ePass=await bcrypt.hash(pass, 10);
        }
        catch(e){
            return res.status(500).json({
                success:false,
                message: "Error in hashing password"
            })
        }
        const newUser= await User.create({
            name, email, pass: ePass, role
        })
        res.status(200).json({
            success: true,
            message: "User Created Successfully"
        })
    }
    catch(e){
        console.log(e);
        res.status(500).json({
            success: false,
            message: e
        })
    }
}

exports.getEmail= async(req, res)=>{
    try{
        const id= req.user.id;
        const user= await User.find({_id: id});
        res.status(200).json({
            user, 
            success:true,
            message:"Le bhai"
        });

    }catch(e){
        res.status(500).json({
            success: false,
            message: e
        })
    }
}