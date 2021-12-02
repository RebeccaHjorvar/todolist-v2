//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const date = require(__dirname + "/date.js");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewUrlParser: true});

const itemsSchema = mongoose.Schema ({
  name: String
});

const Item = mongoose.model("Item", itemsSchema);

const td1 = new Item ({
  name: "Buy food"
});

const td2 = new Item ({
  name: "Cook food"
});

const td3 = new Item ({
  name: "Eat food"
});

const defaultItems = [td1,td2,td3];

Item.insertMany(defaultItems, (err) => {
  if (err) {
    console.log(err)
  } else {
    console.log("The items have been added to the DB")
  }
});
app.get("/", function(req, res) {
  
  res.render("list", {listTitle: "Today", newListItems: items});

});

app.post("/", function(req, res){

  const item = req.body.newItem;

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3100, function() {
  console.log("Server started on port 3100");
});