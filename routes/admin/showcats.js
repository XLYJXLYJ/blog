var express = require('express');
var router = express.Router();
var mongodbClient = require('mongodb').MongoClient;

/* 从数据库获取文章内容 */
router.get('/', function(req, res, next) {
  const DB_STR="mongodb://localhost:27017/myblog";
  mongodbClient.connect(DB_STR,function(err,db){
    if(err) {
       res.send(err)
       return;
       }
       var db = db.db("myblog");
       var c=db.collection("cats");
       c.find().toArray(function (err,docs) {
         if(err){
           res.send(err);
         }else{
           res.render("admin/showcats",{data:docs});
         }
       })
  });
});

module.exports = router;