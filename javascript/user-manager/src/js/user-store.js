/*global _,faker */
var app = app || {};

;(function (app) {
    // body...
    'use strict';

    var User = app.User;

    function UserStore() {
      this.users = JSON.parse(localStorage.getItem('users'));
    }

    // create random 50 users anf save to localStorage
    UserStore.prototype.createUsers = function (amount) {
      // body...
      console.log("df");
      var amount = parseInt(amount);
      if (!localStorage.getItem('users')) {
        var users = _.range(amount).map(function(count) {
          return new User({
            id: ++ count,
            username: faker.name.findName(),
            email: faker.internet.email(),
            password: '123456',
            phone: faker.phone.phoneNumber(),
            address: faker.address.streetAddress()
          });
        });
        console.log("df");
        this.saveUser(users, ++amount);
      }
    };

    /**
     * get value id current
     * return {value id}
     */
    UserStore.prototype.getCurrentId = function () {
        // body...
        var currentId = localStorage.getItem('currentId');
        if (!_.isNull(currentId)) {
            return currentId;
        }
    };

    /**
     * save user into localstorage
     * @param  {[user]}
     * @param  {[id]}
     */
    UserStore.prototype.saveUser = function (users, currentId) {
        // body...
        localStorage.setItem('users', JSON.stringify(users));

        if (currentId) {
            localStorage.setItem('currentId', currentId);
        }
    };

    app.UserStore = UserStore;
})(app);
