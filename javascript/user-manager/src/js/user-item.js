/* global _*/
var app = app || {};

;(function(app) {
  'use strict';

  /**
   * user Item constructor
   *
   * @param {Object}      user
   * @param {DOMElement}  user-list view
   * @return {Void}
   */
  function UserItem(user, userList) {
    this.user = user;
  }

  /**
   * renderHtml()
   * render html user item
   *
   * @param {}
   * @return {String} html row user item
   */
  UserItem.prototype.renderHtml = function() {
    var _this = this;
    var userRow = _.template('<tr data-id=<%= id %>>\
      <td><%= username %></td>\
      <td><%= email %></td>\
      <td><%= password %></td>\
      <td><%= phone %></td>\
      <td><%= address %></td>\
      <td><button type="button" class="btn btn-default btn-xs" id="btnEditUser" data-toggle="modal">Edit</button></td>\
      <td><button type="button" class="btn btn-danger btn-xs" id="btnRemoveUser">Remove</button></td>\
      </tr>');

    return userRow(_this.user);
  };

  /**
   * cloneUser()
   * clone data from user to
   *
   * @param {}
   * @return {String} html row user item
   */
  UserItem.prototype.cloneUser = function(user) {
    var _this = this;
    _this.user.username = user.username;
    _this.user.email = user.email;
    _this.user.password = user.password;
    _this.user.phone = user.phone;
    _this.user.address = user.address;
  };

  app.UserItem = UserItem;

})(app);
