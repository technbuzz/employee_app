app.controller('cityCtrl', ['$scope', '$http', function ($scope, $http) {
  $scope.title = "City";

  var getCountries = function(){
    $http.get('/countryList')
      .then(function(response){
        $scope.countries =response.data
      })
  }

  getCountries();

  var refresh = function () {
    $http.get('/cityList')
      .then(function (response) {
        $scope.cities = response.data;
      })
  }

  refresh();

  $scope.addCity = function () {
    console.log($scope.newCity)
    $http.post('/cityList', $scope.newCity)
      .then(function (response) {
        refresh();
      })
  }

  // $scope.remove = function (id) {
  //   console.log(id);
  //   $http.delete('/countryList/' + id)
  //     .then(function () {
  //       refresh();
  //     })
  // };

  // $scope.edit = function (id) {
  //   $scope.editCountry = $scope.countries.filter(function (item) {
  //     return item._id === id;
  //   })[0];
  // }

  // $scope.update = function (id) {
  //   console.log(id);
  //   $http.put('/countryList/' + id, $scope.editCountry)
  //     .then(function () {
  //       refresh();
  //     })
  // }

}])