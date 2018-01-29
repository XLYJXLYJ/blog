var express = require('express');
var router = express.Router();
var mongodbClient = require('mongodb').MongoClient;
const DB_STR="mongodb://localhost:27017/myblog";

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('admin/index');
});

router.post('/', function(req, res, next) {
  var username = req.body.user;
  var password = req.body.password;
  mongodbClient.connect(DB_STR,function(err,db){
    if(err) {
       res.send(err)
       return;
       }
       var db = db.db("myblog");
       var c=db.collection("users");
       c.find({username:username,password:password}).toArray(function (err,docs) {
         if(err){
           res.send(err);
         }else{  
            if(docs.length){
              req.session.isLogin=true;
              res.redirect("showcats")
            }else{
              res.redirect("admin")
            }
         }
     
       })
  });
});
 
module.exports = router;