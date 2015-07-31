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
  var album = [{name:'southwest serenade', duration: '2:34'},
            {name:'Northern light waltz', duration: '3:21'},
            {name:'Eastern tango', duration: '17:45'}];
  $scope.album = album;
}]);


myApp.controller('DeathrayMenuController', ['$scope', function($scope) {
  $scope.menuState = false;
  $scope.toggleMenu = function() {
    $scope.menuState = !$scope.menuState;
  };
// death ray functions left as exercise to reader
}]);



myApp.controller('CartController', ['$scope', 'Items', function($scope, Items) {
  $scope.bill = {};
  $scope.items = Items.query();

  $scope.$watch(function() {
    var total = 0;
    for (var i = 0; i < $scope.items.length; i++) {
    total = total + $scope.items[i].price * $scope.items[i].quantity;
    }
    $scope.bill.totalCart = total;
    $scope.bill.discount = total > 100 ? 10 : 0;
    $scope.bill.subtotal = total - $scope.bill.discount;
    });
}]);


messages = [{
  id: 0, sender: 'jean@somecompany.com', subject: 'Hi there, old friend',
  date: 'Dec 7, 2013 12:32:00', recipients: ['greg@somecompany.com'],
  message: 'Hey, we should get together for lunch sometime and catch up.'
  +'There are many things we should collaborate on this year.'
  }, {
  id: 1, sender: 'maria@somecompany.com',
  subject: 'Where did you leave my laptop?',
  date: 'Dec 7, 2013 8:15:12', recipients: ['greg@somecompany.com'],
  message: 'I thought you were going to put it in my desk drawer.'
  +'But it does not seem to be there.'
  }, {
  id: 2, sender: 'bill@somecompany.com', subject: 'Lost python',
  date: 'Dec 6, 2013 20:35:02', recipients: ['greg@somecompany.com'],
  message: "Nobody panic, but my pet python is missing from her cage."
  }, ];
// Publish our messages for the list template


/*myApp.controller('ListController', ['$scope', function($scope) {
  console.log($scope.messages);
  $scope.messages = messages;

}]);*/
function ListController($scope) {
  $scope.messages = messages;
}

// Get the message id from the route (parsed from the URL) and use it to
// find the right message object.

/*myApp.controller('DetailController', ['$scope', '$routeParams', function($scope, $routeParams) {
  $scope.message = messages[$routeParams.id];
}]);*/

function DetailController($scope, $routeParams) {
$scope.message = messages[$routeParams.id];
}
