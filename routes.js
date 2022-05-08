<<<<<<< Updated upstream
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

=======
var express = require("express");

var router = express.Router();

router.get('/',function(res,res){
   // console.log("Hello I'm on the start page");
    res.render('index');
})
router.get('/register',function(res,res){
    // console.log("Hello I'm on the start page");
     res.render('register');
 })
 router.get('/signin',function(res,res){
    // console.log("Hello I'm on the start page");
     res.render('signin');
 })
 router.get('/home',function(res,res){
    // console.log("Hello I'm on the start page");
     res.render('home');
 })
 router.get('/view_user',function(res,res){
    // console.log("Hello I'm on the start page");
     res.render('view_user');
 })
 router.get('/task',function(res,res){
    // console.log("Hello I'm on the start page");
     res.render('task');
 })
>>>>>>> Stashed changes
module.exports = router;