var express = require("express");

var router = express.Router();

router.get("/",function(res,res){
   // console.log("Hello I'm on the start page");
    res.render("index");
})
router.get("/views/register",function(res,res){
    // console.log("Hello I'm on the start page");
     res.render("register");
 })

module.exports = router;