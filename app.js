const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash")
const ejs = require("ejs")
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));


mongoose.connect("mongodb://localhost:27017/timerAppDB", {useNewUrlParser: true, useUnifiedTopology: true});




const listItemSchema = new mongoose.Schema({
  id: String,
  title: {type:String,
          required:true
  },
  content: String
})
const ListItem = mongoose.model("ListItem", listItemSchema);



const timerItemSchema = new mongoose.Schema({
  id: String,
  title: {type:String,
          required:true
  },
  time: Number
})
const TimerItem = mongoose.model("TimerItem", timerItemSchema);


app.get("/", function(req, res){
  ListItem.find({}, function(err, foundListItems){
    if(err){
      console.log(err)
    }else{
      res.render("list", {foundListItems:foundListItems})
    }
  })
  
})

app.get("/list", function(req, res){
  res.redirect("/")
})


app.get("/timer", function(req, res){
  TimerItem.find({}, function(err, foundTimerItems){
    if(err){
      console.log(err)
    }else{
      res.render("timer", {foundTimerItems:foundTimerItems})
    }
  })
})


app.post("/", function(req, res){
  let formType = req.body.formType
  

  
  if(formType === "noteForm"){
    const list = new ListItem({
      id: mongoose.Types.ObjectId(),
      title: req.body.title,
      content: req.body.content
    })

    list.save();
    res.redirect("/")
    console.log(list.id)

  } else if(formType === "timerForm"){
    const timer = new TimerItem({
      id: mongoose.Types.ObjectId(),
      title: req.body.title,
      time: req.body.time
    })

    timer.save();
    res.redirect("/timer")
    console.log(timer.id)
  } 
})


app.post("/delete", function(req, res){
  const itemId = req.body.itemId
  const collectionDB = req.body.collection
  
  if(collectionDB === "timer"){
    TimerItem.deleteOne({id:itemId}, function(err){
      if(err){
        console.log(err)
      }else{
        res.redirect("/timer")
      }
    })
  }else if(collectionDB ==="list"){
    ListItem.deleteOne({id:itemId}, function(err){
      if(err){
        console.log(err)
      }else{
        res.redirect("/")
      }
    })
  }
})









const port = 3000
app.listen(port, function(){
    console.log("server started on port " + port)
})






































