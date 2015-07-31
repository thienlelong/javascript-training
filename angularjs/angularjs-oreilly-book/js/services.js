
myApp.factory('Items', function() {
    var items = {};
    items.query = function() {
// In real apps, we'd pull this data from the server...
  return [
    {title: 'Paint pots', quantity: 10, price: 11},
    {title: 'Polka dots', quantity: 17, price: 12.95},
    {title: 'Pebbles', quantity: 9, price: 6.95}
    ];
  };
  return items;
});