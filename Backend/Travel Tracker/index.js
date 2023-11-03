import express from "express";
import bodyParser from "body-parser";
import pg from "pg"

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "admin",
  port: 5432
})

db.connect();

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  let codes = []
  const result = await db.query("Select * from visited_countries")
  result.rows.forEach(country => codes.push(country.country_code))
  res.render("index.ejs", {countries: codes, total: codes.length})
});

app.post('/add', async (req, res) => {
  const result = await db.query("Select country_code, country_name from countries")
  const target = result.rows.find((country) => country.country_name.toLowerCase() == req.body.country.toLowerCase())
  
  if(target) await db.query("insert into visited_countries (country_code) values ($1)", [target.country_code])
  res.redirect('/');
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
