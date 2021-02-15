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
  time:{
    hours:Number,
    minutes:Number,
    seconds:Number
  } ,
  status: Boolean
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
        // if(foundTimerItems !== 0  && timeData.length === 0){
         
        //     foundTimerItems.forEach(function(foundTimerItem){
        //     timeData.push(foundTimerItem)
            
        //     })
            
        // }if(timeData.length === 0 && foundTimerItems.length === 0){
          

        // }else if(timeData.length < foundTimerItems.length){
        
        //   timeData.push(_.last(foundTimerItems))
          
        //   console.log("add the last item") 
        // }else if(timeData.length > foundTimerItems.length){
        //   timeData = []
        //   foundTimerItems.forEach(function(foundTimerItem){
        //   timeData.push(foundTimerItem)
          
        //   })
        //   console.log("deleted one item")
        // }
    }
  })
})

// app.get('/api', function(req, res){
//   res.json(timeData); 
// });



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
    

  } else if(formType === "timerForm"){
    const timer = new TimerItem({
      id: mongoose.Types.ObjectId(),
      title: req.body.title,
      time:{
        hours:req.body.hours,
        minutes:req.body.minutes,
        seconds:req.body.seconds
      } ,
      status: false
    })

    timer.save();
    console.log(timer)
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
        console.log(timeData)
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
  console.log("clicked from DB")
  const itemId = req.body.itemId
  console.log(itemId)
  // const collectionDB = req.body.collection
  
   TimerItem.updateOne({id:itemId}, {status:true}, function(err){
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






































