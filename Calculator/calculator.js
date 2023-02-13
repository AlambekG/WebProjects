const express = require("express")
const bodyParser = require("body-parser")

const app = express()
app.use(bodyParser.urlencoded({extended: true}))

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html")
})
app.post("/", function(req, res){
    console.log(req.body)
    let num1 = Number(req.body.num1)
    let num2 = Number(req.body.num2)
    let result = num1 + num2
    res.send("Result of calculation is: " + result)
})

app.get("/bmicalculator", (req, res) => {
    res.sendFile(__dirname + "/bmiCalculator.html")
})
app.post("/bmicalculator", (req, res) => {
    console.log(req.body)
    let weight = parseFloat(req.body.weight)
    let height = parseFloat(req.body.height)
    res.send("Your BMI is: " + (weight / Math.pow(height, 2)))
})
app.listen(8888, () => console.log("Started on port 3000"))