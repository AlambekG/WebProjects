const express = require("express")
const https = require("https")

const bodyParser = require("body-parser")

const app = express()



app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
   res.sendFile(__dirname + "/index.html")
})

app.post("/", (req, res) => {
    const query = req.body.cityName;
    const apikey = "fff718277f2ae1cc54f310d9ca85092e"
    const unit = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&APPID=" + apikey + "&units=" + unit
    https.get(url, (response) => {
        console.log(response)
        console.log(response.statusCode)
        response.on("data", (data) => {
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const description = weatherData.weather[0].description
            const icon = "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png"

            res.write(`<h1> the temperature in ${query} is: ${temp} and ${description} </h1>`)
            res.write("<img src=" + icon + "></img>")
            res.send()
        })
    })
})
app.listen(8888, ()=>{
    console.log("server is  running on port 8888")
})