const connection = require("./db-connection");
var express = require("express");
//const { connection } = require("mongoose");

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
 router.post('/register', (req, res) => {
    
    var email = req.body.email;
    var re_pass = req.body.re_pass;
    var name = req.body.name;

    console.log(req.body);

    connection.query(`SELECT * FROM users WHERE email =?`,[email], function (error, results, fields) {
        if (error){
            console.log("111")
            connection.query(`INSERT INTO users (nume, idManager, numeUtilizator, parola, parolaHash, email, profil) VALUES (?, 0, ?, ?, ?, ?, "profil")`, [name, name, re_pass, re_pass, email], function ( error , results, fields) {
            if (error) {
                console.log("2222");
                throw error;
            }
            console.log("3333");
            res.render('home');
            return res.json("User created");
        });
        } else {
        console.log("4444");
        console.log("Already exists!");
    
    }
    });
 });

module.exports = router;
