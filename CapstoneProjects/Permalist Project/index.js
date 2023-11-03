import express from "express";
import bodyParser from "body-parser";
import pg from "pg"

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  password: "admin",
  database: "todoList",
  port: 5432
});

db.connect();

app.get("/", async (req, res) => {
  const result = await db.query("select * from items order by id")
  res.render("index.ejs", {
    listTitle: "Today",
    listItems: result.rows,
  });
});

app.post("/add", async (req, res) => {
  const item = req.body.newItem;
  await db.query("insert into items (title) values ($1)", [item]);
  res.redirect("/");
});

app.post("/edit", async (req, res) => {
  const id = req.body.updatedItemId;
  const newTitle = req.body.updatedItemTitle;
  console.log(id, newTitle)
  await db.query("update items set title = $1 where id = $2", [newTitle, id])
  res.redirect("/");
});

app.post("/delete", async (req, res) => {
  await db.query("delete from items where id = $1", [req.body.deleteItemId])
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
