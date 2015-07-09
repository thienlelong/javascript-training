/*global _*/
var app = app || {};

;(function(app) {
  'use strict';

  /**
   * user control constructor
   *
   * @param {}
   * @return {Void}
   */


  function UserControl() {

    this.userForm = new app.UserForm();
    this.userStore = new app.UserStore();
    this.userStore.generateUsers(50);
    this.userList = new app.UserList(this.userStore.users, this.userStore, this.userForm);
    var users = this.userList.users.slice(0, 20);
    this.userList.renderListUser(users);
    this.handleEvents();
    this.paginationUsers();
  }

  /**
   * handleEvents()
   * handle all event
   *
   * @return {Void}
   */
  UserControl.prototype.handleEvents = function(event) {
    var _this = this;

    // add new user
    $('#btnAddUser').on('click', this.addNewUser.bind(_this));

    // remove user
    $('#listAllUser').on('click', '#btnRemoveUser', this.removeUser.bind(this));

    // edit user
    $('#listAllUser').on('click', '#btnEditUser', this.editUser.bind(this));

    // search user
    $('#btnSearch').on('click', this.searchUser.bind(this));

    // general user
    $('#btnGenerateUsers').on('click', this.generateusers.bind(this));

  };

  /**
   * pagination
   *
   * @return {Void}
   */
  UserControl.prototype.paginationUsers = function() {
    var _this = this;
    var amountUsers = _this.userList.users.length;
    var totalPages = (amountUsers % 20) ? amountUsers / 20 + 1 : amountUsers / 20;

    // fixme: shouldn't use a global here
    app.page = 1;
    $('#pagination').twbsPagination({
      totalPages: totalPages,
      onPageClick: function(event, page) {
        app.page = page;
        var users = _this.userList.users.slice((page - 1) * 20, page * 20);
        _this.userList.renderListUser(users);
      }
    });
  };

  /**
   * add New User
   *
   * @return {Void}
   */
  UserControl.prototype.addNewUser = function(event) {
    var _this = this;
    event.preventDefault();
    $('#modalWrap').load('user-modal.html', function() {
      $('#userModal').modal('show');
      _this.validateForm();
    });
  };

  /**
   * remove User
   *
   * @return {Void}
   */
  UserControl.prototype.removeUser = function(event) {
    event.preventDefault();
    var _this = this;

    if (window.confirm('Are you sure you want to delete user?')) {
      var $userRow = $(event.target).parentsUntil('tr').parent();
      _this.userList.handleUserDelete($userRow.attr('data-id'));
    }
  };

  /**
   * edit User
   *
   * @return {Void}
   */
  UserControl.prototype.editUser = function(event) {
    event.preventDefault();
    var _this = this;
    var $userRow = $(event.target).parentsUntil('tr').parent();

    $('#modalWrap').load('user-modal.html', function() {
      $('#titleModal').text('Update user');
      var user = _this.userList.getUser($userRow.attr('data-id'));
      _this.userForm.loadInfoUser(user);
      $('#userModal').modal('show');
      _this.validateForm();
    });
  };

  /**
   * search User
   *
   * @return {Void}
   */
  UserControl.prototype.searchUser = function(event) {
    event.preventDefault();
    var _this = this;
    var username = $('#userSearch').val().trim();

    if (username) {
      var users = _this.userList.handleUserSearch(username);
      _this.userList.renderListUser(users);
    }
  };

  /**
   * search User
   *
   * @return {Void}
   */
  UserControl.prototype.generateusers = function(event) {
    event.preventDefault();
    var _this = this;
    var amount = parseInt($('#amountUsers').val());

    if (!_.isNaN(amount)) {
      app.helper.getLocalStorage().clear();
      _this.userStore.generateUsers(amount);
      $(location).attr('href', window.location.origin + '/user-list.html');
    } else {
      $('#generateMessage').text('Please Enter Number');
    }
  };

  /**
   * validate add-user form
   *
   * @return {Void}
   */
  UserControl.prototype.validateForm = function() {
    var _this = this;

    // validate phone number
    jQuery.validator.addMethod('phoneNumber', function(phoneNumber, element) {
      var phoneMatch = /^\+?\(?([0-9]{3,4})\)?[-. ]?([0-9]{3,4})[-. ]?([0-9]{4})$/;
      return this.optional(element) ||
              phoneNumber.length > 9 && phoneNumber.match(phoneMatch);
    }, 'Please enter a valid phone number');

    var $userAddForm = $('#userForm');
    $userAddForm.validate({
      onfocusout: function(element) {
        $(element).valid();
      },

      // define rules for input validation
      rules: {
        username: {
          required: true
        },
        email: {
          required: true,
          email: true
        },
        phone: {
          required: true,
          phoneNumber: true
        },
        password: {
          required: true
        }
      },

      // specify the validation error messages
      messages: {
        email: {
          email: 'Please enter a valid email address'
        }
      },

      submitHandler: function(form) {
        var userId = parseInt(form.userid.value, 10);
        if (userId) {
          _this.userList.handleUserEdit(userId);
        } else {
          _this.userList.handleUserAdd();
        }
      }
    });
  };

  app.UserControl = UserControl;

})(app);
