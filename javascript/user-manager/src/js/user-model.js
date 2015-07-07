var app = app || {};

;(function(app) {
  'use strict';

  /**
   * model user: user info
   *
   * @param {Object}    user object
   * @return {Void}
   */
  function User(user) {
    var _this = this;

    _this.id = user.id;
    _this.username = user.username || '';
    _this.email = user.email || '';
    _this.password = user.password || '123456';
    _this.phone = user.phone || '';
    _this.address = user.address || '';

  }

  app.User = User;

})(app);
