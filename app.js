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
  name: "Welcome to your todolist"
});

const td2 = new Item ({
  name: "Hit the + button to add a new item."
});

const td3 = new Item ({
  name: "<-- Hit this to delete an item"
});

const defaultItems = [td1,td2,td3]; 

app.get("/", (req, res) => {
  
  Item.find({}, (err, dbItems) => {

    if (dbItems.length === 0){
      Item.insertMany(defaultItems, (err) => {
        if (err) {
          console.log(err)
        } else {
          console.log("The items have been added to the DB")
        }
      });
      res.redirect("/");
    } else {
       res.render("list", {listTitle: "Today", newListItems: dbItems});
    }  
  });
});

app.post("/", function(req, res){

  const itemName = req.body.newItem;

  const item = new Item ({
    name: itemName
  });

  item.save();
  res.redirect("/");

});

app.post("/delete", (req, res) => {

  const checkedItemId = req.body.checkbox;

  Item.findByIdAndRemove(checkedItemId, (err) => {
    if (!err) {
      console.log("Item has been removed")
      res.redirect("/");
    }
  })
})

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3100, function() {
  console.log("Server started on port 3100");
});
