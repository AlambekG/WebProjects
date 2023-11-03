import express from "express"
import axios from "axios"

const app = express()
express.urlencoded({extended: true});

app.use(express.static("public"))

app.get("/", async (req, res) => {
    try{
        const result = await axios.get("https://secrets-api.appbrewery.com/random");
        res.render("index.ejs", {secret: result.data.secret, user: result.data.username})
    }catch(error){
        console.log(error.response.data);
        res.status(500);
    }
})
app.listen(3000, () => {
    console.log("server is running on port 3000")
}) 