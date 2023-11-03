import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

const MyUsername = "Alambek";
const MyPassword = "Helokitty";
const MyAPIKey = "44611b03-1db5-4ec3-8bdd-dd21f6e60a70";
const MyBearerToken = "ebe23bfc-44db-4f06-a1fa-23eae337a169";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  try{
    const result = await axios.get(API_URL + "random");
    res.render("index.ejs", {content: JSON.stringify(result.data) });
  } catch(error){
    res.status(404).send(error.message);
  }
});

app.get("/basicAuth", async (req, res) => {
  try{
    const result = await axios.get(API_URL + "all?page=2", {
      auth: {
        username: MyUsername,
        password: MyPassword
      }
    })
    res.render("index.ejs", {content: JSON.stringify(result.data)})
  } catch(error){
    res.status(404).send(error.message);
  }
});

app.get("/apiKey", async (req, res) => {
  try{
    const result = await axios.get(API_URL + "filter", {
      params: {
        apiKey: MyAPIKey,
        score: 7
      }
    });
    res.render("index.ejs", {content: JSON.stringify(result.data)})
  } catch(error){
    res.status(404).send(error.message);
  }
});

app.get("/bearerToken", async (req, res) => {
  try{
    const result = await axios.get(API_URL + "secrets/42", {
      headers: {
        Authorization: `Bearer ${MyBearerToken}` 
      }
    });
    res.render("index.ejs", {content: JSON.stringify(result.data)})
  } catch(error){
    res.status(404).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
