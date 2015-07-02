
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
  function UserItem(user, parentView) {
    this.user = user;
    this.parentView = parentView;
    this.$listAllUser = $('#listAllUser');
  }

  /**
  * Render a user item (a row) that is included data
  *
  * @return {void}
  */
  UserItem.prototype.renderHtml = function renderUser() {
    var _this = this;
    // body...
    var userRow = $([
      '<tr data-id="', _this.user.id, '">',
      '<td class = "user-id">', _this.user.id, '</td>',
      '<td class = "user-name">', _this.user.username, '</td>',
      '<td class = "user-address">', _this.user.email, '</td>',
      '<td class = "user-email">', _this.user.phone, '</td>',
      '<td class = "user-email">', _this.user.address, '</td>',
      '<td><button type="button" class="btn btn-default btn-sm" data-toggle="modal">Edit</button></td>',
      '<td><button type="button" class="btn btn-danger btn-sm">Remove</button></td>',
      '</tr>'
    ].join(''));

    return userRow;
  };


  app.UserItem = UserItem;

})(app);