import express from "express";
import bodyParser from "body-parser";
import {dirname} from "path"
import { fileURLToPath } from "url";

const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));
let bandn = ""

const bandName = (req, res, next) => {
  bandn = "<h3>"+ req.body.street + req.body.pet + "</h3>";
  next();
}
app.use(bodyParser.urlencoded({extended:true}))
app.use(bandName)

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/public/index.html")
})
app.post('/submit', (req, res) => {
  console.log(req.body)
  res.send("<h1> Your band name is: </h1>" + bandn)
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
