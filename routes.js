const connection = require("./db-connection");
const express = require("express");
const bodyParser = require("body-parser");
const encoder = bodyParser.urlencoded();

var router = express.Router();

router.post('/signin',encoder,function(req,res) {
    var email = req.body.email;
    var pass = req.body.pass;

	console.log(req.body)

    if(email == 0){
        console.log("--------> User does not exist")
        res.sendStatus(404)
    } else {
        console.log("intra!")
        connection.query('SELECT * FROM users WHERE email = ? AND parola =?', [email, pass], function(error, results, fields) {
        if (results.length > 0) {
            console.log("aicinu ")
            res.redirect('/home');
        } else {
            console.log("aici")
            res.send('Incorrect Email and/or Password!');
            }		
        res.end();});	
        }
});

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
 router.get('/task',function(res,res){
    // console.log("Hello I'm on the start page");
     res.render('task');
 })
 router.get('/task_frame',function(res,res){
    // console.log("Hello I'm on the start page");
     res.render('task_frame');
 })
 router.get('/view_echipa',function(res,res){
    // console.log("Hello I'm on the start page");
     res.render('view_echipa');
 })

 router.get('/view_user',function(res,res){
    // console.log("Hello I'm on the start page");
     res.render('view_user');
 })
 router.post('/register', (req, res) => {
    const {
        email, pass, name
    } = req.body;
    console.log(req.body);
    connection.query(`INSERT INTO users (nume, idManager, numeUtilizator, parola, parolaHash, email, profil) VALUES (?, 0, ?, ?, ?, ?, "profil")`, [name,name, pass,pass, email],function(error, results, fields){
        if (error) {
            throw error;
        }else{
        res.render('signin');
        console.log("User created");}
    });
 });

 

module.exports = router;
