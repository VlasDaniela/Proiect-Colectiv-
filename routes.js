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
            return res.redirect('/home');
        } else {
            console.log("aici")
            return res.send('Incorrect Email and/or Password!');
            }		
        });	
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
            return res.render('home');
            // return res.json("User created");
        });
        } else {
        console.log("4444");
        console.log("Already exists!");
    
    }
    });
 });

router.post('/task_form' ,(req,res) => {

    var task_name = req.body.task_name;
    var start_date= req.body.start_date;
    var end_date= req.body.end_date;
    var descriere= req.body.descriere;
//    var stare= req.body.stare;

    // const {
    //     task_name, start_date, end_date, descriere, status
    //     } = req.body;

    console.log(req.body);

    connection.query(`INSERT INTO tasks (Nume, Descriere, Data_start, Data_final, Stare , Atribuit) VALUES (?, ?, ?, ?, "incomplet", "neatribuita")`, [task_name, descriere, start_date, end_date], function ( error , results, fields) {
        if (error) {
            console.log("NUPREA");
            throw error;
        }
        console.log("OK");
        return res.redirect('/home_manager');
        // return res.json("Task created");
    });

});



module.exports = router;
