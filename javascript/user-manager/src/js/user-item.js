
var app = app || {};

;(function (app) {
  'use strict';

  /**
   * User Item constructor
   *
   * @param {Object}      user
   * @param {DOMElement}  user-list view
   * @return {Void}
   */
  function UserItem(user) {
    this.user = user;
    this.$listAllUser = $('#listAllUser');
  }

  /**
   * renderHtml()
   * render html user item
   *
   * @param {}
   * @return {String} html row user item
   */
  UserItem.prototype.renderHtml = function () {
    var _this = this;
    // body...
    var userRow = $([
      '<tr data-id="', _this.user.id, '">',
      '<td class = "user-name">', _this.user.username, '</td>',
      '<td class = "user-address">', _this.user.email, '</td>',
      '<td class = "user-email">', _this.user.phone, '</td>',
      '<td class = "user-email">', _this.user.address, '</td>',
      '<td><button type="button" class="btn btn-default btn-xs" id="btnEditUser" data-toggle="modal">Edit</button></td>',
      '<td><button type="button" class="btn btn-danger btn-xs" id="btnRemoveUser">Remove</button></td>',
      '</tr>'
    ].join(''));

    return userRow;
  };
  
  app.UserItem = UserItem;

})(app);