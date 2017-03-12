app.controller('countryCtrl', ['$scope', '$http', function ($scope, $http) {
  $scope.title = "Country";
  
  var refresh = function(){
    $http.get('/countryList')
      .then(function (response) {
        $scope.countries = response.data;
      })
  }

  refresh();

  $scope.addCountry = function(){
    $http.post('/countryList', $scope.newCountry)
    .then(function(response){
      refresh();
    })
  }

  $scope.remove = function (id) {
    console.log(id);
    $http.delete('/countryList/' + id)
      .then(function () {
        refresh();
      })
  };

  $scope.edit = function(id){
    $scope.editCountry = $scope.countries.filter(function(item){
      return item._id === id;
    })[0];
  }

  $scope.update = function(id){
    console.log(id);
    $http.put('/countryList/'+id, $scope.editCountry)
      .then(function(){
        refresh();
      })
  }

}])