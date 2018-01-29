var express = require('express');
var router = express.Router();
var mongodbClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

/* GET home page. */
router.get('/', function(req, res, next) {
  const DB_STR="mongodb://localhost:27017/myblog"; 
  mongodbClient.connect(DB_STR,function(err,db){
    if(err) {
       res.send(err)
       return;
       }
       var db = db.db("myblog");
       var c=db.collection("cats");      
       c.find().toArray(function(err,docs) {      
         if(err){
           res.send(err);
         }
    
          res.render("home/index",{data:docs});     
       });
    
  })
});



module.exports = router;
