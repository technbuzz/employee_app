var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('sosa',['sosa']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + "/src"));
app.use(bodyParser.json());

app.get('/employeeList', function(req,res){
  console.log('I received a GET request');

  // var employee = [
  //   { name: 'Sami', department: 'CS', phone_number: 3339199791, age: 28 },
  //   { name: 'Khan', department: 'DDD', phone_number: 3339880791, age: 32 },
  //   { name: 'Jemie', department: 'LJLJ', phone_number: 8349874895, age: 23 }
  // ];

  // res.json(employee);

  db.sosa.find(function(err, docs){
    console.log(docs);
    res.json(docs)
  })
  
});

app.post('/employeeList', function(req,res){
  console.log(req.body);
  db.sosa.insert(req.body, function(err, docs){
    res.json(docs);
  })
});

app.delete('/employeeList/:id', function(req,res){
  var id = req.params.id;
  console.log(id);
  
  db.sosa.remove({_id: mongojs.ObjectId(id)}, function(err, doc){
    res.json(doc);
  })
});

app.get('/employeeList/:id', function(req, res){
  var id = req.params.id;
  console.log(id);
  db.sosa.findOne({_id: mongojs.ObjectId(id)}, function(err,doc){
    res.json(doc);
  })
});

app.put('/employeeList/:id', function(req, res){
  var id = req.params.id;
  console.log(req.body.name);
  db.sosa.findAndModify({query: {_id: mongojs.ObjectId(id)},
    update: { 
      $set: { 
        name: req.body.name, 
        department: req.body.department, 
        phone_number: req.body.phone_number, 
        age: req.body.age, 
      }
    },
    new: true}, function(err, doc){
      res.json(doc);
    })// findAndModify
  
})// app.put


app.listen(3000);
console.log('Server running on port 3000...');