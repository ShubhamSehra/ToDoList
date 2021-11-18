const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const date = require(__dirname + '/date.js');
const mongoose = require('mongoose');

const app = express();
app.set("view engine","ejs");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB")

const itemsSchema = {
  name: String
};
const Item = mongoose.model("item", itemsSchema);

const item1 = new Item ({
  name: "Welcome to To DO List",
});
const item2 = new Item ({
  name: "hit + to create new one",
});
const item3 = new Item ({
  name: "<--- hit this to delete",
});

const defaultItems = [item1, item2, item3];






app.get("/", function(req, res){


  Item.find({}, function(err, foundItems){

    if (foundItems.length === 0) {

      Item.insertMany(defaultItems,function(err){
        if (err) {
          console.log(err)
        } else {
          console.log("successfully save!!")
        }
      });
      res.redirect("/")
    } else {

      res.render("list", {listTitle:day, nextItem: foundItems});
    }


  });

  let day = date();


});

app.post("/",function(req, res){

  const itemName = req.body.item;
  const item = new Item ({
    name: itemName
  });

  item.save();
  res.redirect("/");

})

app.post("/delete", function(req, res){
  const checkedItemId = req.body.checkbox

  Item.findByIdAndDelete(checkedItemId, function(err){
    if (err) {
      console.log(err)
    } else {
      console.log("Yeyyy we removed that ID SEXsfully")
    }
    res.redirect("/");
  })

});

app.get("/work", function(req,res){
  res.render("list", {listTitle:"Work", nextItem:workItems })
});

// app.post("/work", function(req, res){
//   let name = req.body.item;
//   workItems.push(name);
//   res.redirect("/work");
// })


app.listen(3000,function(req,res){
  console.log("Hello Shubham")
});
