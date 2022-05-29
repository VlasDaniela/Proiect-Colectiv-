const {connection, makeDb} = require("./db-connection.js");
const express = require("express");
const bodyParser = require("body-parser");
const { response } = require("express");
const { route } = require("express/lib/application");
const encoder = bodyParser.urlencoded();


var router = express.Router();
const db = makeDb()

router.post('/signin',encoder,function(req,res) {
    
    var email = req.body.email;
    var pass = req.body.pass;
    var IdManager = req.body.IdManager

	console.log(req.body)

    if(email == 0){
        console.log("--------> User does not exist")
        res.sendStatus(404)
    } else {
        console.log("intra!")
        connection.query('SELECT * FROM users WHERE email = ? AND parola =?', [email, pass], function(error, results, fields) {
        console.log(results);
        if (results.length > 0) {
            console.log("aicinu ")
            //connection.query('SELECT IdManager FROM users WHERE email = ? AND parola = ?',[email,pass],function(error,result,fields){
                //console.log(fields[0].IdManager);
                console.log(results[0].IdManager);
                if( results[0].IdManager != 0){
                    
                    console.log("Diferit de 0");
                    return res.redirect('/home_manager');
                }else{
                    return res.redirect('/view_user');}
            //});
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
 router.get('/task_form',function(res,res){
    // console.log("Hello I'm on the start page");
     res.render('task_form');
 })
 router.get('/task',async (req,res) => {
    try{
        const rows = await db.query(`SELECT * FROM tasks ORDER BY IdTask`)
        return res.render('task',{ tasks: rows })
    }catch(e){
        console.log(e)
    }
});
 router.get('/task_frame',function(res,res){
    // console.log("Hello I'm on the start page");
     res.render('task_frame');
 })
 router.get('/view_echipa',function(res,res){
    // console.log("Hello I'm on the start page");
     res.render('view_echipa');
 })
 router.get('/skills',function(res,res){
    // console.log("Hello I'm on the start page");
     res.render('skills');
 })


 router.post('/register', (req, res) => {
    
    var email = req.body.email;
    var re_pass = req.body.re_pass;
    var name = req.body.name;

    console.log(req.body);

    connection.query(`SELECT * FROM users WHERE email =?`,[email], function (error, results, fields) {
        if (!error){
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


    console.log(req.body);

        connection.query(`INSERT INTO tasks (Nume, Descriere, Data_start, Data_final, Stare , Atribuit) VALUES (?, ?, ?, ?, "incomplet", "neatribuita")`, [task_name, descriere, start_date, end_date], function ( error , results, fields) {
            if (error) {
                console.log("NUPREA");
                throw error;
            }
            console.log("OK");
            return res.redirect('/task_form');
            // return res.json("Task created");
        });
    });
router.post('/skills',(req,res)=>{

    var skill = req.body.skill;
    var nivel = req.body.nivel;

    console.log(req.body);

    connection.query(`INSERT INTO skills (Descriere , Dificultate) VALUES (?,? )`,[skill, nivel], function(error,results,fields){
        if (error) {
            console.log("NUPREA");
            throw error;
        }
        console.log("OK22");
        return res.render('/skills');
    });
});

router.get('/home_manager',async (req,res) => {
    try{
        const rows = await db.query(`SELECT * FROM tasks ORDER BY IdTask`)
        const rows2 = await db.query(`SELECT * FROM users ORDER BY IdUser`)
        //console.log(rows);
        return res.render('home_manager',{ tasks: rows, users:rows2 })
    }catch(e){
        console.log(e)
    }
});

router.get('/home_manager/:IdUser',async (req,res) => {
    try{
        const rows = await db.query(`SELECT a.* FROM tasks a INNER JOIN user_task b on a.IdTask=b.IdTask WHERE IdUser=${req.params.IdUser}`)
        console.log(rows);
        const rows2 = await db.query(`SELECT * FROM users ORDER BY IdUser`)

        return res.render('home_manager',{ tasks: rows, users:rows2 })
    }catch(e){
        console.log(e)
    }
});

router.get('/view_user',async (req,res) => {
    try{
        const rows = await db.query(`SELECT * FROM users ORDER BY IdUser`)
        //console.log(rows);
        return res.render('view_user',{ users: rows })
    }catch(e){
        console.log(e)
    }
});
router.get('/task/:IdUser',async (req,res) => {
    try{
        const rows = await db.query(`SELECT a.* FROM tasks a INNER JOIN user_task b on a.IdTask=b.IdTask WHERE IdUser=${req.params.IdUser}`)
        console.log(rows);
        const rows2 = await db.query(`SELECT * FROM users ORDER BY IdUser`)
        return res.render('home_manager',{ tasks: rows,users:rows2 })
    }catch(e){
        console.log(e)
    }
});


module.exports = router;
