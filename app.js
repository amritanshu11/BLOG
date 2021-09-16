const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost:27017/blog', {useNewUrlParser: true, useUnifiedTopology: true});

const itemschema ={
    title:String,
    text:String
}
const item = mongoose.model('item',itemschema);
var posts = [];

app.get("/",function(req,res){
    item.find({},function(error,founditem){
        if(error){
            console.log(error);
        }
        else{
        res.render("home",{posts:founditem})
        }
    })
  
})
app.get('/about',function(req,res){
    res.render("about")
})
app.get('/contact',function(req,res){
    res.render("contact")
})
app.get('/compose',function(req,res){
    res.render("compose")
})
app.post("/compose",function(req,res){

 const Newitem = new item({
    title :req.body.title,
    text:req.body.text
 })
 console.log(Newitem);
 Newitem.save();
   res.redirect('/');
})



app.listen(2000,function(){
    console.log("server is running at port 2000");
})