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
    this.userStore = new app.UserStore();
  }

  /**
   * renderListUser()
   * render html list user and append to view
   *
   * @param {Array} list users
   * @return {void}
   */
  UserList.prototype.renderListUser = function (users) {
    var _this = this;
    
    // Clear User List View
    _this.$listAllUser.html('');
    if (users.length === 0) {
      _this.$listAllUser.html('User not found.');
    } else {
      _.forEach(users, function(user) {
        _this.appendUserNode(user);
      });
    }
  };

  /**
   * appendUserNode()
   * render user and append to list user
   *
   * @param {Oject} user item
   * @return {void}
   */
  UserList.prototype.appendUserNode = function (user) {
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
  UserList.prototype.handleUserAdd = function () {
    var _this = this;
    var currentId = _this.userStore.getCurrentId();
    var $userModal = $('#userModal');
    var $userForm = $('#userForm');
    var message = 'Email already exist. Please enter new email.';
    var user = new app.User({
      id: currentId,
      username: $userForm.find('#userName').val().trim(),
      email: $userForm.find('#email').val().trim(),
      password: $userForm.find('#passWord').val().trim(),
      phone: $userForm.find('#phone').val().trim(),
      address: $userForm.find('#address').val().trim(),
    });

    if(!_this.hasUser(user.email)) {
      _this.users.push(user);
      _this.userStore.saveUsers(_this.users, ++currentId);
      _this.appendUserNode(user);
      message = 'User has been add successfully';
      $userModal.modal("hide");
      alert(message);
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
  UserList.prototype.handleUserEdit = function (userId ) {
    var _this = this;
    var $userModal = $('#userModal');
    var $userForm = $('#userForm');
    var message = 'Email already exist. Please enter new email.';
    var user = _this.getUser(userId);
    var email = $userForm.find('#email').val().trim();
    if((user.email === email) || (user.email !== email && !_this.hasUser(email) )) {
      user.username = $userForm.find('#userName').val().trim();
      user.email = email;
      user.password =  $userForm.find('#passWord').val().trim();
      user.phone = $userForm.find('#phone').val().trim();
      user.address = $userForm.find('#address').val().trim();
      _this.userStore.saveUsers(_this.users);
      message = 'User has been updated successfully';
      $userModal.modal("hide");
      _this.replaceUserRow(userId);
      alert(message);
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
  UserList.prototype.handleUserDelete = function (userId) {
    var _this = this;

    _.remove(_this.users, function(user) {
      return parseInt(user.id) === parseInt(userId);
    });
    _this.userStore.saveUsers(_this.users);
  };
  
  /**
   * handleUserDelete()
   * delete user item from list user
   *
   * @param {Number} user id
   * @return {void}
   */

  UserList.prototype.handleUserSearch = function (username) {
    var _this = this;

    return _.filter(_this.users, function(user) {
      return user.username.toLowerCase().indexOf(username.toLowerCase()) > -1;
    });

  };

  /**
   * loadInfoUser()
   * load info user to form view edit
   *
   * @param {Number} user id
   * @return {void}
   */  
  UserList.prototype.loadInfoUser = function (userId) {
    var _this = this;
    var $userForm = $('#userForm');
    var user = _this.getUser(userId);

    $userForm.find('#userId').val(user.id);
    $userForm.find('#userName').val(user.username);
    $userForm.find('#passWord').val(user.password);
    $userForm.find('#email').val(user.email);
    $userForm.find('#phone').val(user.phone);
    $userForm.find('#address').val(user.address);
  };

  /**
   * loadInfoUser()
   * load info user to form view edit
   *
   * @param {Number} user id
   * @return {void}
   */  
  UserList.prototype.replaceUserRow = function (userId) {
    var _this = this;
    var user = _this.getUser(userId);
    var userItem = new app.UserItem(user);
    $('tr[data-id=' + userId + ']').replaceWith(userItem.renderHtml());
  };

  /**
   * hasUser()
   * Check if user is exist in database
   *
   * @param  {Object}    user
   * @return {Boolean}
   */
  UserList.prototype.hasUser = function (email) {
    var _this = this;
    return !_.every(_this.users, function(item) {
      return item.email !== email;
    });
  };

  /**
   * getUser()
   * get user from user list
   *
   * @param  {Number}  user id
   * @return {Object} user
   */
  UserList.prototype.getUser = function (userId) {
    var _this = this;
    return _.find(_this.users, function(item) {
      return parseInt(item.id) === parseInt(userId);
    });
  };

  app.UserList = UserList;

})(app);