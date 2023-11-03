const express = require("express")
const request = require("request")
const https = require("https")

const app = express()

app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/signup.html")
})

app.post("/", (req, res) => {
    //console.log(req.body)
    const name = req.body.fName
    const lname = req.body.lName
    const email = req.body.email

    const data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields:{
                FNAME: name,
                LNAME: lname
            }
        }]
    }
    const jsonData = JSON.stringify(data)

    const url = "https://us21.api.mailchimp.com/3.0/lists/8d6c7bcda9/members"
    const options = {
        method: "POST", 
        auth: "alam:c7787a2a9610f4b99f604577979fcc9c-us21"
    }

    const request = https.request(url, options, (response)=>{
        if(response.statusCode == 200){
            console.log("success")
            res.sendFile(__dirname + "/success.html")
            response.on("data", (data)=>{
                console.log(data)
                console.log(JSON.parse(data))
            })
        }
        else{
            res.sendFile(__dirname + "/failure.html")
            console.log("failure")
        }
    })
    request.write(jsonData);
    request.end();

    const apikey = "c7787a2a9610f4b99f604577979fcc9c-us21"
    const listid = "8d6c7bcda9"
})

app.listen(8888, ()=>console.log("Server is running"))