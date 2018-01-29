var express = require('express');
var router = express.Router();
var mongodbClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;


//显示编辑分类
router.get('/', function(req, res, next) {
  res.render('admin/editcats');
});

router.get('/edit', function(req, res, next) {
  const DB_STR="mongodb://localhost:27017/myblog"; 
  mongodbClient.connect(DB_STR,function(err,db){
    if(err) {
       res.send(err)
       return;
       }
       var db = db.db("myblog");
       var c=db.collection("cats");
       var id=req.query.id;
       c.find({_id:ObjectId(id)}).toArray(function(err,docs) {
         if(err){
           res.send(err);
         }
          res.render("admin/editcats",{data:docs[0]});     
       });
    
  })
});
//完成编辑分类
router.post('/edit', function(req, res, next) {
  var title = req.body.title;
  var context = req.body.context;
  var id = req.body.id;
  console.log(id);
   const DB_STR="mongodb://localhost:27017/myblog"; 
   mongodbClient.connect(DB_STR,function(err,db){
     if(err) {
       res.send(err)
        return;
        }
        var db = db.db("myblog");
        var c=db.collection("cats");
        c.update({_id:ObjectId(id)},{$set:{"title":title,"context":context}},function(err,result) {
          if(err){
            res.send(err);
          }
          res.send("更新成功 <a href='/admin/showcats'>返回展示列表</a>");   
        }
      )
   })
});

//删除分类
router.get('/delete', function(req, res, next) {
   var id = req.query.id;
   const DB_STR="mongodb://localhost:27017/myblog"; 
   mongodbClient.connect(DB_STR,function(err,db){
     if(err) {
       res.send(err)
        return;
        }
        var db = db.db("myblog");
        var c=db.collection("cats");
        c.remove({_id:ObjectId(id)},function(err,result) {      
          if(err){
            res.send(err);
          }
          res.send("删除成功 <a href='/admin/showcats'>返回展示列表</a>");   
        }
      )
   })
});

module.exports = router;