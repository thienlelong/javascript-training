myApp.controller('StartUpController', ['$scope', function($scope) {

  $scope.computeNeeded = function() {
    $scope.needed = $scope.startingEstimate * 10;
  };
  $scope.requestFunding = function() {
    window.alert('Sorry, please get more customers first.');
  };
  $scope.reset = function() {
    $scope.startingEstimate = 0;
  }

}]);

myApp.controller('AlbumController', ['$scope', function($scope) {
  var album = [{name:'Southwest Serenade', duration: '2:34'},
            {name:'Northern Light Waltz', duration: '3:21'},
            {name:'Eastern Tango', duration: '17:45'}];
  $scope.album = album;
}]);


myApp.controller('DeathrayMenuController', ['$scope', function($scope) {
  $scope.menuState = false;
  $scope.toggleMenu = function() {
    $scope.menuState = !$scope.menuState;
  };
// death ray functions left as exercise to reader
}]);



myApp.controller('CartController', ['$scope', function($scope) {
  $scope.bill = {};
  $scope.items = [
    {title: 'Paint pots', quantity: 8, price: 3.95},
    {title: 'Polka dots', quantity: 17, price: 12.95},
    {title: 'Pebbles', quantity: 5, price: 6.95}
  ];
  $scope.bill.discount = 10;
  $scope.totalCart = function() {
    var total = 0;
    for (var i = 0, len = $scope.items.length; i < len; i++) {
      total = total + $scope.items[i].price * $scope.items[i].quantity;
    }
    return total;
  };
  $scope.subtotal = function() {
    return $scope.totalCart() - $scope.bill.discount;
  };
  function calculateDiscount(newValue, oldValue, scope) {
    $scope.bill.discount = ((newValue - oldValue) > 100) ? $scope.bill.discount * 10 : $scope.bill.discount;
  }
  $scope.$watch($scope.totalCart, calculateDiscount);
}]);
