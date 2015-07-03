/*global _,faker */
var app = app || {};

;(function (app) {
  // body...
  'use strict';

  var User = app.User;

  function UserStore() {
    this.localStorage = app.helper.getLocalStorage();
    this.users = JSON.parse(this.localStorage.getItem('users'));
  }

  /**
   * generateUsers()
   * create list user random from Faker anh save localStorage
   *
   * @param {Number} amount item
   * @return {void}
   */
  UserStore.prototype.generateUsers = function (number) {
    var _this = this;
    // body...
    var amount = parseInt(number);
    if (!_this.localStorage.getItem('users')) {
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
      this.saveUsers(users, ++amount);
    }
  };

  /**
   * getCurrentId()
   * get id current from localStorage
   *
   * @param {} 
   * @return {Number} id
   */
  UserStore.prototype.getCurrentId = function () {
    var _this = this;
      // body...
    var currentId = _this.localStorage.getItem('currentId');
    if (!_.isNull(currentId)) {
        return currentId;
    }
  };

  /**
   * saveUsers()
   * save list users to localStorage
   *
   * @param {Array} list user
   * @param {Number} id user 
   * @return {void}
   */
  UserStore.prototype.saveUsers = function (users, currentId) {
    var _this = this;
      // body...
    _this.localStorage.setItem('users', JSON.stringify(users));
    if (currentId) {
        _this.localStorage.setItem('currentId', currentId);
    }
  };

  app.UserStore = UserStore;
})(app);
