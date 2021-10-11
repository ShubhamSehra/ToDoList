const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();
app.set("view engine","ejs");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

let items = ["Resume", "Food"];

app.get("/", function(req, res){
  let today = new Date();
  let options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };
  let day = today.toLocaleDateString("en-US", options);

  res.render("list", {dayAndTime:day, nextItem: items});
});

app.post("/",function(req, res){
  let name = req.body.item;
  items.push(name);
  res.redirect("/");
})



app.listen(3000,function(req,res){
  console.log("Hello Shubham")
});
