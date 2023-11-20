//jshint esversion:6
const express = require("express");
const app = express();
const pg = require("pg");
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
        const result = await db.query(`select * from account where email = $1`, [req.body.username]);
        if(result.rows[0].password == req.body.password) res.render("secrets.ejs")
        else res.render("login.ejs")
    }
    catch(err){
        console.log(err);
    }
})
app.post("/register", async (req, res) => {
    try{
        await db.query("insert into account (email, password) values ($1, $2)", [req.body.username, req.body.password]);
        console.log("added new account succefully");
        res.render("secrets.ejs");
    }
    catch(err){
        console.log(err)
    }
})

app.listen(port, () => {
    console.log(`app is listening on the port ${port}`)
})