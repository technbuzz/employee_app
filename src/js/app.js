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
    $scope.editEmployee = $scope.employee.filter(function(item){
      return item._id === id;
    })[0];
    console.log($scope.editEmployee);
    
  };

  $scope.update = function(){
    console.log($scope.editEmployee._id);
    $http.put('/employeeList/'+$scope.editEmployee._id, $scope.editEmployee)
      .then(function(){
        refresh();
      })
    

  }

  $scope.clear = function(){
    $scope.newEmp = "";
  };
  
}]);

