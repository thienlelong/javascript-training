var app = app || {};

;(function (app) {
  'use strict';

  /**
   * User Item constructor
   *
   * @param {Object}      user
   * @return {Void}
   */
  function UserList(users) {
    this.users = users;
    this.$listAllUser = $('#listAllUser');

  }

  /**
   * Appen list of users to User List View
   *
   * @return {Void}
   */
  UserList.prototype.renderListUser = function (users) {
    var _this = this;
    // Clear User List View
    _this.$listAllUser.html('');
    _.forEach(users, function(user) {
      _this.appendUserItem(user);
    });
  };

  /**
   * Add a user item to list view
   *
   * @param {Object}     user data model
   * @return {Void}
   */
  UserList.prototype.appendUserItem = function (user) {
    var userItem = new app.UserItem(user, this);

    this.$listAllUser.append(userItem.renderHtml());

  };


  app.UserList = UserList;

})(app);