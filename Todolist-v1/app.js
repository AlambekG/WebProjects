const express = require("express")

const app = express()

app.set("view engine", "ejs")

app.get("/", (req, res) => {
    let date = new Date()
    let day = date.getDay()
    let today = "WeekDay"

    if(day == 6 || day == 0)
        today = "WeekEnd"
    
    //res.sendFile(__dirname + "/index.html")
    res.render("list", {kindOfDay : today})
})

// app.post("/", (req, res) => {

// })

app.listen(3000, ()=>{
    console.log("Server is running")
})