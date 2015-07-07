/*global _*/
var app = app || {};

;(function (app) {
  'use strict';

  /**
   * User control constructor
   *
   * @param {}      
   * @return {Void}
   */


  function UserControl(){

    this.userStore = new app.UserStore();
    this.userStore.generateUsers(50);
    this.userList = new app.UserList(this.userStore.users);
    var users = this.userList.users.slice(0, 20);
    this.userList.renderListUser(users);
    this.handleEvents();
  }

  /**
   * handleEvents()
   * handle all event
   *
   * @return {Void}
   */
  UserControl.prototype.handleEvents = function (event) {
    var _this = this;

    // add new user
    $('#btnAddUser').on('click',function (event){
      event.preventDefault();
      $('#modalWrap').load('user-modal.html', function(){
        $('#userModal').modal('show');
        _this.validateForm();
      });
    });

    // remove user
    $('#listAllUser').on('click','#btnRemoveUser',function (event) {
      event.preventDefault();
      if (window.confirm('Are you sure you want to delete user?')) {
        var $userRow = $(event.target).parentsUntil('tr').parent();
        _this.userList.handleUserDelete($userRow.attr('data-id'));
      }

    });

    // edit user
    $('#listAllUser').on('click','#btnEditUser',function (event) {
      event.preventDefault();
      var $userRow = $(event.target).parentsUntil('tr').parent();
      $('#modalWrap').load('user-modal.html', function() {
        $('#titleModal').text('Update user');
        _this.userList.loadInfoUser($userRow.attr("data-id"));
        $('#userModal').modal('show');
        _this.validateForm();
      });
    });

    // search user
    $('#btnSearch').on('click',function (event) {
      event.preventDefault();
      var $username = $('#userSearch').val().trim();
      var users = _this.userList.handleUserSearch($username);
      _this.userList.renderListUser(users);
    });

    // general user
    $('#btnGenerateUsers').on('click',function (event) {
      event.preventDefault();
      var $amount = parseInt($('#amountUsers').val());
      if (!_.isNaN($amount)) {
        app.helper.getLocalStorage().clear();
        this.userStore = new app.UserStore();
        _this.userStore.generateUsers($amount);
        $(location).attr('href', window.location.origin + '/user-list.html');
      } else {
        $('#generateMessage').text('Please Enter Number');
      }
      
    });

    // pagination list user
    var amountUsers = _this.userList.users.length;
    var totalPages = (amountUsers%20 === 0) ? amountUsers/20 : amountUsers/20 + 1  ;
    app.page = 1;

    $('#pagination').twbsPagination({
        totalPages: totalPages,
        onPageClick: function (event, page) {
          app.page = page;
          var users = _this.userList.users.slice((page - 1) * 20 ,page * 20);
          _this.userList.renderListUser(users);
        }
    });

    
  };

  /**
   * Validate add-user form
   *
   * @return {Void}
   */
  UserControl.prototype.validateForm = function () {
    var _this = this;

    // validate phone number
    jQuery.validator.addMethod("phoneNumber", function (phoneNumber, element) {
      var phoneMatch = /^\+?\(?([0-9]{3,4})\)?[-. ]?([0-9]{3,4})[-. ]?([0-9]{4})$/;
      return this.optional(element) || 
              phoneNumber.length > 9 && phoneNumber.match(phoneMatch);
      }, "Please enter a valid phone number");

    var $userAddForm = $('#userForm');
    $userAddForm.validate({
      onfocusout: function (element) {
        $(element).valid();
      },

      // Define rules for input validation
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

      // Specify the validation error messages
      messages: {
        email: {
          email: 'Please enter a valid email address'
        }
      },
      submitHandler: function(form) {
        var userId = parseInt(form.userid.value);
        if(userId) {
          _this.userList.handleUserEdit(userId);
        } else {
          _this.userList.handleUserAdd(); 
        }
      }
    });

  };

  app.UserControl = UserControl;

})(app);