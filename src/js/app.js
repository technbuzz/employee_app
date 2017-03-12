var app = angular.module('myApp',['ngRoute']);

app.config(function($routeProvider){
  $routeProvider
    .when('/',{
      templateUrl: 'pages/home.html',
      controller: 'employeeCtrl'
    })
    .when('/addCountry',{
      templateUrl: 'pages/addCountry.html',
      controller: 'countryCtrl'
    })
    .when('/addCity',{
      templateUrl: 'pages/addCity.html',
      controller: 'cityCtrl'
    })
});


app.controller('employeeCtrl', ['$scope','$http', function($scope, $http){

  var refresh = function () {
    $http
      .get('/employeeList')
      .then(function (response) {
        console.log('I got what I requested', response);
        $scope.employee = response.data;
      });
  }

  refresh();
  // $scope.employee = [
  //   {name: 'Sami', department: 'CS', phone_number: 3339199791, age: 28}, 
  //   {name: 'Khan', department: 'DDD', phone_number: 3339880791, age:32},
  //   {name: 'Jemie', department: 'LJLJ', phone_number: 8349874895, age: 23}
  // ];



  $scope.addEmployee = function(){
    console.log($scope.newEmp);
    $http
      .post('/employeeList', $scope.newEmp)
      .then(function(response){
        console.log(response);
        refresh();
      })
  };


  $scope.remove = function(id){
    console.log(id);
    $http.delete('/employeeList/' + id)
      .then(function(){
        refresh();
      })
  };

  $scope.edit = function(id){
    console.log(id);
    $http.get('/employeeList/' + id)
      .then(function(response){
        $scope.newEmp = response.data;
        console.log(response.data);
        
      });
  };

  $scope.update = function(){
    console.log($scope.newEmp._id);
    $http.put('/employeeList/'+$scope.newEmp._id, $scope.newEmp)
      .then(function(){
        refresh();
      })


  }

  $scope.clear = function(){
    $scope.newEmp = "";
  };
  
}]);

