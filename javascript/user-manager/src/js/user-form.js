var app = app || {}

;(function(app) {
  'use strict';
  function UserForm() {
  }

  /**
   * loadInfoUser()
   * load info user to form view edit
   *
   * @param {Number} user id
   * @return {void}
   */
  UserForm.prototype.loadInfoUser = function(user) {
    var $userForm = $('#userForm');

    $userForm.find('#userId').val(user.id);
    $userForm.find('#userName').val(user.username);
    $userForm.find('#passWord').val(user.password);
    $userForm.find('#email').val(user.email);
    $userForm.find('#phone').val(user.phone);
    $userForm.find('#address').val(user.address);
  };

  /**
   * getInfoUser()
   * load info user to form view edit
   *
   * @param {Number} user id
   * @return {void}
   */
  UserForm.prototype.getInfoUser = function() {
    var $userForm = $('#userForm');
    var user = {};

    user.username = $userForm.find('#userName').val().trim();
    user.email = $userForm.find('#email').val().trim();
    user.password =  $userForm.find('#passWord').val().trim();
    user.phone = $userForm.find('#phone').val().trim();
    user.address = $userForm.find('#address').val().trim();

    return user;
  };

  app.UserForm = UserForm;

})(app);
