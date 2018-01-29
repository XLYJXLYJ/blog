var express = require('express');
var router = express.Router();
var mongodbClient = require('mongodb').MongoClient;


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('admin/addcats');
});
router.post('/add', function(req, res, next) {
   var title = req.body.addcats;
   var context = req.body.addcontext;
   const DB_STR="mongodb://localhost:27017/myblog";
   mongodbClient.connect(DB_STR,function(err,db){
     if(err) {
        res.send(err)
        return;
        }
        var db = db.db("myblog");
        var c=db.collection("cats");
        c.insert({title,context},function (err,result) {
          if(err){
            res.send(err);
          }else{
            res.send("添加成功 <a href='/admin/showcats'>返回</a>");
          }
      
        })
   });
});

module.exports = router;  