//jshint esversion:6
const express = require("express");
const pg = require("pg");

/* Auth */
// const md5 = require("md5");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const app = express();

const port = 3000;
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"));


const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    password: "admin",
    database: "secretShare",
    port: 5432
});

db.connect();

app.get("/", (req, res) => {
    res.render("home.ejs");
})
app.get("/login", (req, res) => {
    res.render("login.ejs");
})
app.get("/register", (req, res) => {
    res.render("register.ejs");
})

app.post("/login", async (req, res) => {
    try{
        const DBresult = await db.query(`select * from account where email = $1`, [req.body.username]);
        bcrypt.compare(req.body.password, DBresult.rows[0].password, function(err, result) {
            if(result) res.render("secrets.ejs");
            else {
                console.log("Password did not match!");
                res.render("login.ejs");
            }
        });
    }
    catch(err){
        console.log(err);
    }
})
app.post("/register", (req, res) => {
    bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
        try{
            await db.query("insert into account (email, password) values ($1, $2)", [req.body.username, hash]);
            console.log("added new account succefully");
            res.render("secrets.ejs");
        }
        catch(err){
            console.log(err)
        }
    });
})

app.listen(port, () => {
    console.log(`app is listening on the port ${port}`)
})