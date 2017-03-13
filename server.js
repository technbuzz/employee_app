var express = require('express');
var app = express();
var mongojs = require('mongojs');
var bodyParser = require('body-parser');


var env = process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// if (env === 'dev'){
// var db = mongojs('sosa', ['sosa']);

// } else {
// var db = mongojs('mongodb://sami:khan@ds129030.mlab.com:29030/sosa', ['sosa'], { authMechanism: 'ScramSHA1' });

var db = mongojs('mongodb://heroku_3413hb7t:hcj9rlovdbt7s5k7o5es0urmmr@ds141078.mlab.com:41078/heroku_3413hb7t', ['sosa'], { authMechanism: 'ScramSHA1' })
// }

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


// Add Country
app.get('/countryList', function(req, res){
  db.country.find(function(err, docs){
    res.json(docs);
  })
})

app.post('/countryList/', function(req, res){
  db.country.insert(req.body, function(err, docs){
    res.json(docs);
  })
})

app.delete('/countryList/:id', function(req, res){
  var id = req.params.id;
  console.log(id);

  db.country.remove({_id: mongojs.ObjectId(id)}, function(err, doc){
    res.json(doc);
  })
  
})

app.put('/countryList/:id', function(req, res){
  var id = req.params.id;
  console.log(req.body.name);
  db.country.findAndModify({query: {_id: mongojs.ObjectId(id)},
    update:{
      $set:{
        name: req.body.name
      }
    },
    new: true }, function(err, doc){
      res.json(doc);
    });
})

// Add City
app.get('/cityList', function(req, res){
  db.city.find(function(err, docs){
    res.json(docs);
  })
})

app.post('/cityList', function(req, res){
  console.log(req.body);
  db.city.insert(req.body, function(err, docs){
    res.json(docs);
  })
})

app.listen(process.env.PORT || 5000);
console.log('Server running on port 5000...');
