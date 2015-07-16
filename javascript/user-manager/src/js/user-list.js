/*global _*/
var app = app || {};

;(function(app) {
  'use strict';

  /**
   * user Item constructor
   *
   * @param {Object}      user
   * @return {Void}
   */
  function UserList(users, userStore, userForm) {
    this.users = users;
    this.$listAllUser = $('#listAllUser');
    this.userStore = userStore;
    this.userForm = userForm;
  }

  /**
   * renderListUser()
   * render html list user and append to view
   *
   * @param {Array} list users
   * @return {void}
   */
  UserList.prototype.renderListUser = function(users) {
    var _this = this;

    // clear User List View
    _this.$listAllUser.empty();
    if (users.length) {
      _.forEach(users, function(user) {
        _this.appendUserNode(user);
      });
    } else {
      _this.$listAllUser.html('User not found.');
    }
  };

  /**
   * appendUserNode()
   * render user and append to list user
   *
   * @param {Oject} user item
   * @return {void}
   */
  UserList.prototype.appendUserNode = function(user) {
    var userItem = new app.UserItem(user);
    this.$listAllUser.append(userItem.renderHtml());

  };

  /**
   * handleUserAdd()
   * add user and append to list user
   *
   * @param {}
   * @return {void}
   */
  UserList.prototype.handleUserAdd = function() {
    var _this = this;

    var currentId = _this.userStore.getCurrentId();
    var message = 'Email already exist. Please enter new email.';
    var user = new app.User(this.userForm.getInfoUser());
    user.id = currentId;

    if (!_this.hasUser(user.email)) {

      // add newu to first users list and save data to localStorage
      _this.users.unshift(user);
      _this.userStore.saveUsers(_this.users, ++currentId);

      // render again page
      var users = this.users.slice((app.page - 1) * 20, app.page * 20);
      this.renderListUser(users);

      message = 'User has been add successfully';
      $('#userModal').modal('hide');
      window.alert(message);
    } else {
      $('#modalMessage').text(message);
    }
  };

  /**
   * handleUserAdd()
   * add user and append to list user
   *
   * @param {Number} user id
   * @return {void}
   */
  UserList.prototype.handleUserEdit = function(userId) {
    var _this = this;
    var message = 'Email already exist. Please enter new email.';
    var user = _this.getUser(userId);
    var userItem = new app.UserItem(user);
    var userEdit = _this.userForm.getInfoUser();

    if ((user.email === userEdit.email) ||
      (user.email !== userEdit.email && !_this.hasUser(userEdit.email))) {

      // update info user
      userItem.cloneUser(userEdit);
      _this.userStore.saveUsers(_this.users);

      message = 'User has been updated successfully';
      $('#userModal').modal('hide');
      _this.replaceUserRow(userId);
      window.alert(message);
    } else {
      $('#modalMessage').text(message);
    }
  };

  /**
   * handleUserDelete()
   * delete user item from list user
   *
   * @param {Number} user id
   * @return {void}
   */
  UserList.prototype.handleUserDelete = function(userId) {
    var _this = this;

    // remove and update users list
    _this.removeUser(userId);
    _this.userStore.saveUsers(_this.users);

    // render again page
    var users = this.users.slice((app.page - 1) * 20, app.page * 20);
    this.renderListUser(users);
  };

  /**
   * handleUserDelete()
   * delete user item from list user
   *
   * @param {Number} user id
   * @return {void}
   */

  UserList.prototype.handleUserSearch = function(username) {
    var _this = this;

    return _.filter(_this.users, function(user) {
      return user.username.toLowerCase().indexOf(username.toLowerCase()) > -1;
    });
  };


  /**
   * replaceUserRow()
   * load info user to form view edit
   *
   * @param {Number} user id
   * @return {void}
   */
  UserList.prototype.replaceUserRow = function(userId) {
    var _this = this;
    var userItem = new app.UserItem(_this.getUser(userId));
    $('tr[data-id=' + userId + ']').replaceWith(userItem.renderHtml());
  };

  /**
   * hasUser()
   * Check if user is exist in database
   *
   * @param  {Object}    user
   * @return {Boolean}
   */
  UserList.prototype.hasUser = function(email) {
    var _this = this;
    return _.some(_this.users, function(item) {
      return item.email === email;
    });
  };

  /**
   * getUser()
   * get user from user list
   *
   * @param  {Number}  user id
   * @return {Object} user
   */
  UserList.prototype.getUser = function(userId) {
    var _this = this;
    return _.find(_this.users, function(item) {
      return parseInt(item.id, 10) === parseInt(userId, 10);
    });
  };

  /**
   * getUser()
   * get user from user list
   *
   * @param  {Number}  user id
   * @return {Object} user
   */
  UserList.prototype.removeUser = function(userId) {
    var _this = this;
    _.remove(_this.users, function(user) {
      return parseInt(user.id, 10) === parseInt(userId, 10);
    });
  };

  app.UserList = UserList;

})(app);
