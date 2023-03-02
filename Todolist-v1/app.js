const express = require("express")
const date = require(__dirname + "/date.js")
const app = express()
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))
app.set("view engine", "ejs")

const items = ["Buy food", "Cook food", "Eat food"]
const workItems = []

app.get("/", function(req, res){
    //res.sendFile(__dirname + "/index.html")
    res.render("list", {listTitle: date.getDay(), newListItems: items});
});
app.post("/",function (req, res){
    console.log(req.body)
    const item = req.body.newItem
    if(req.body.list == "Work"){
        workItems.push(item);
        res.redirect("/work")
    }else{
        items.push(item)
        res.redirect("/")
    }
});

app.get("/work", function(res, res){
    res.render("list", {listTitle: "Work List", newListItems: workItems});
})
app.post("/work", function(req, res){
    const item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work")
})
app.get("/about", function(req, res){
    res.render("about")
})

app.listen(8888, ()=>{
    console.log("Server is running")
})