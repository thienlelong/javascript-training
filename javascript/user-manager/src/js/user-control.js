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


  function UserControl(){
    this.users = [];
    
    var user = new app.User({
      id: 1,
      username: 'thiendk',
      email: 'thiendk@gmail.com',
      password: '1234567',
      phone: '99999999',
      address: 'da nang'
    });
    this.users.push(user);
    var user1 = new app.User({
      id: 2,
      username: 'thiendk',
      email: 'thiendk@gmail.com',
      password: '1234567',
      phone: '99999999',
      address: 'da nang'
    });
    this.users.push(user1);
    this.userList = new app.UserList(this.users);
    this.userList.renderListUser(this.userList.users);
    this.userStore = new app.UserStore();
    this.userStore.createUsers(50);
  }

  app.UserControl = UserControl;

})(app);