const con = require("./db-connection");
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
 router.get('/home_manager',function(res,res){
    // console.log("Hello I'm on the start page");
     res.render('home_manager');
 })
 router.get('/task_form',function(res,res){
    // console.log("Hello I'm on the start page");
     res.render('task_form');
 })
 router.get('/task_frame',function(res,res){
    // console.log("Hello I'm on the start page");
     res.render('task_frame');
 })
 router.get('/view_echipa',function(res,res){
    // console.log("Hello I'm on the start page");
     res.render('view_echipa');
 })

 router.post('/register', (req, res) => {
    const {
        email, re_pass, name
    } = req.body;
    con.query(`INSERT INTO users (nume, idManager, numeUtilizator, parola, parolaHash, email, profil) VALUES (?, 0, ?, ?, ?, ?, "profil")`, [name, name, re_pass, re_pass, email]),
    (err) => {
        if (err) {
            throw err;
        }
        return res.json("User created");
    }
 });

module.exports = router;
