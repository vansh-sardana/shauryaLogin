const express= require("express");
const router= express.Router();



const {login, signup, getEmail}= require("../controllers/Auth");
const { auth, isStudent, isAdmin } = require("../middlewares/auth");

router.post("/login",login);
router.post("/signup", signup);

router.get("/admin", auth, isAdmin, (req, res)=>{
    res.status(200).json({
        success: true,
        message: "Welcome to the Admin Page"
    })
})

router.get("/student", auth, isStudent, (req, res)=>{
    res.status(200).json({
        success: true,
        message: "Welcome to the students Page"
    })
})

router.get("/getEmail", auth, getEmail);

module.exports = router;