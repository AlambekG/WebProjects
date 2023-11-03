import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "admin",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentUserId = 1;

async function checkVisisted() {
  try{
    const result = await db.query("SELECT country_code FROM visited_countries where user_id = $1", 
    [currentUserId]);
    let countries = [];
    result.rows.forEach((country) => {
      countries.push(country.country_code);
    });
    return countries;
  }
  catch(err){
    console.error(err)
    return [];
  }
}

app.get("/", async (req, res) => {
  const users = (await db.query("select * from users")).rows
  const countries = await checkVisisted();
  const currentUser = users.find(user => user.id == currentUserId)
  let color = ""
  if(currentUser) color = currentUser.color
  res.render("index.ejs", {
    countries: countries,
    total: countries.length,
    users: users,
    color: color,
  });
});

app.post("/add", async (req, res) => {
  const input = req.body["country"];
  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [input.toLowerCase()]
    );

    const data = result.rows[0];
    const countryCode = data.country_code;
    try {
      await db.query(
        "INSERT INTO visited_countries (country_code, user_id) VALUES ($1, $2)",
        [countryCode, currentUserId]
      );
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/user", async (req, res) => {
  if(req.body.add == "new") res.render("new.ejs");
  else{
    currentUserId = req.body.user;
    res.redirect("/")
  }
});

app.post("/new", async (req, res) => {
  //Hint: The RETURNING keyword can return the data that was inserted.
  console.log(req.body)
  const result = await db.query("insert into users (name, color) values ($1, $2) RETURNING id;", [req.body.name, req.body.color])
  currentUserId = result.rows[0].id
  res.redirect("/")
  //https://www.postgresql.org/docs/current/dml-returning.html
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});