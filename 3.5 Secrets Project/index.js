//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming

import express from "express"
import { dirname } from "path"
import { fileURLToPath } from "url"

const app = express()
const __dirname = dirname(fileURLToPath(import.meta.url));

let isUserAuth = false;
const checkPas = (req, res, next) => {
    const password = req.body.password;
    if(password == "Good") isUserAuth = true;
    next();
}
app.use(express.urlencoded({extended: true}))
app.use(checkPas)

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
})
app.post('/check', (req, res) => {
    if(isUserAuth) res.sendFile(__dirname + "/public/secret.html")
    else res.send("<h1> TRY AGAIN </h1>")
})

app.listen("3000", () => {
    console.log("Server is running");
})