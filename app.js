const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash")
const ejs = require("ejs");
const { json } = require("body-parser");

let timeData = [];

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/timerAppDB", {useNewUrlParser: true, useUnifiedTopology: true});









const listItemSchema = new mongoose.Schema({
  id: String,
  title:String,
  content: String
})
const ListItem = mongoose.model("ListItem", listItemSchema);

const timerItemSchema = new mongoose.Schema({
  id: String,
  title:String,
      
  time:{
    hours:Number,
    minutes:Number,
    seconds:Number,
  },
  status: Boolean,
  startingTime: String
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
      
      
      res.render("timer", {foundTimerItems: (foundTimerItems)}) 
    }
  })
})




app.post("/", function(req, res){
  let formType = req.body.formType
  

  
  if(formType === "noteForm"){
    const list = new ListItem({
      id: mongoose.Types.ObjectId(),
      title: _.upperCase(req.body.title),
      content: _.capitalize(req.body.content)
    })

    list.save();
    
    res.redirect("/")
    

  } else if(formType === "timerForm"){
    const timer = new TimerItem({
      id: mongoose.Types.ObjectId(),
      title: (_.capitalize(req.body.title)).substr(0, 45),
      time:{
        hours:req.body.hours,
        minutes:req.body.minutes,
        seconds:req.body.seconds,
        startingTime: ""
      } ,
      status: false
    })

    timer.save();
    
    res.redirect("/timer")
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
        timeData.filter(function(item){
          return item !== itemId
          
        })
        
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


app.post("/start", function(req, res){
  
  const itemId = req.body.itemId
  var startingTime = req.body.startingTime
  
  
  // const collectionDB = req.body.collection
  
   TimerItem.updateOne({id:itemId}, {status:true, startingTime:startingTime}, function(err){
      if(err){
        console.log(err)
      }else{
        res.redirect("/timer")    
      }
    })
  
})














const port = 3000
app.listen(port, function(){
    console.log("server started on port " + port)
})






































