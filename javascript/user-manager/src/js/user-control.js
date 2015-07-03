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

    this.userStore = new app.UserStore();
    this.userStore.generateUsers(50);
    this.userList = new app.UserList(this.userStore.users);
    this.userList.renderListUser(this.userList.users);
    this.handleEvent();
  }

  UserControl.prototype.handleEvent = function (event){
    var _this = this;

    $('#btnAddUser').on('click',function (event){
      event.preventDefault();
      $('#modalWrap').load('user-modal.html', function(){
        $('#userModal').modal('show');
        _this.validateForm();
      });
    });

    /* delete user */
    $('#listAllUser').on('click','#btnRemoveUser',function (event){
      event.preventDefault();
      var $userRow = $(event.target).parentsUntil('tr').parent();
      _this.userList.handleUserDelete($userRow.attr('data-id'));
      $userRow.remove();
    });

    /* delete user */
    $('#listAllUser').on('click','#btnEditUser',function (event){
      event.preventDefault();
      var $userRow = $(event.target).parentsUntil('tr').parent();
      $('#modalWrap').load('user-modal.html', function(){
        _this.userList.loadInfoUser($userRow.attr("data-id"));
        $('#userModal').modal('show');
        _this.validateForm();
      });
    });
  };

  /**
   * Validate add-user form
   *
   * @return {Void}
   */
  UserControl.prototype.validateForm = function () {
    var _this = this;
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
          number: true
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