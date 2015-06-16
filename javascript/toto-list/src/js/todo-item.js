/* global dom, helpers */

var todoItem = (function() {
  'use strict';

  var view = {
    TodoItem: TodoItem
  };
  var _helpers = helpers;
  var _dom = dom;
  var _todoFilter = todoFilter;

  /*
  * todo view constructor
  * @param{Array}     : task
  * @param{Object}     : parent view
  */
  function TodoItem(todo, parent) {
    this.todo = todo;
    this.todoList = parent;
    this.todoFilter = new _todoFilter.TodoFilter(this.todoList);
  }

  /*
  * render a todo view(li element) includes data
  * @return {HTMLElement}     : a li element
  */
  TodoItem.prototype.renderHtml = function() {
    var todoStatus = this.todo.isCompleted;

    // create elements for a Todo (a todo element is an item of list) and add event for them
    var todoToggle = _dom('input', {type: 'checkbox', class: 'todo-item__toggle'});
    var todoName = _dom('label', {class: 'todo-item__name'}, this.todo.name);
    var todoDelete = _dom('a', {class: 'todo-item__btn-delete'}, 'x');
    var todoEdit = _dom('input', {class: 'todo-item__edit hidden'}, this.todo.name);

    // render a Todo Element
    this.todoItem = _dom('li', {class: 'todo-item', 'data-id': this.todo.id},
      _dom('div', {class: 'todo-view'},
      todoToggle, todoName, todoDelete),
      todoEdit);

    _helpers.addHandler(todoDelete, 'click', _helpers.method(this, 'handleDeleteTodo'));
    _helpers.addHandler(todoToggle, 'click', _helpers.method(this, 'handleToggleTodo'));
    _helpers.addHandler(todoName, 'dblclick', _helpers.method(this, 'handleEditTodo'));

    _helpers.addHandler(todoEdit, 'keyup', _helpers.method(this, 'handleUpdateTodo'));
    _helpers.addHandler(todoEdit, 'blur', _helpers.method(this, 'handleLeaveEditTodo'));

    // mark if todo is completed or active
    if (todoStatus) {
      _helpers.addClass(this.todoItem, 'completed');
      this.todoItem.firstChild.firstChild.checked = true;
    }

    return this.todoItem;
  };

  /*
  * handle checking a task with event
  */
  TodoItem.prototype.handleToggleTodo = function(event) {
    var target = event.target;
    var parentTarget = target.parentNode.parentNode;
    var btnFilterId = document.querySelector('.todo-filter__list .selected').id;

    // add completed class to todo dom to inform that a todo is completed
    if (target.checked) {
      _helpers.addClass(parentTarget, 'completed');
      if(btnFilterId === "btnActive") _helpers.addClass(parentTarget, 'hidden');
    } else {
      _helpers.removeClass(parentTarget, 'completed');
      if(btnFilterId === "btnComplete") _helpers.addClass(parentTarget, 'hidden');
    }

    // update status of Todo
    this.todoList.updateTodotoStorage(parentTarget.getAttribute('data-id'), target.checked);
    this.todoFilter.updateCountTodoList();
  };

  /*
  * handle delete a task with event
  */
  TodoItem.prototype.handleDeleteTodo = function(event) {
    var target = event.target;
    var parentTarget = target.parentNode.parentNode;
    var index = this.todoList.indexOf(parentTarget.getAttribute('data-id'));

    this.todoList.removeItemAt(index);

    // update data in Storage
    this.todoList.saveTodoToStorage();
    _helpers.removeNode(parentTarget);

    this.todoFilter.updateCountTodoList();
    event.stop();

  };

  /*
  * handle edit a task with event
  */
  TodoItem.prototype.handleEditTodo = function(event) {

    var parentTarget = event.target.parentNode.parentNode;
    var nameTodo = parentTarget.firstChild;
    var nameTodoEdit = parentTarget.lastChild;

    _helpers.addClass(nameTodo, 'hidden');
    _helpers.removeClass(nameTodoEdit, 'hidden');
    nameTodoEdit.focus();
    nameTodoEdit.value = nameTodo.childNodes[1].textContent;

    event.stop();
  };

  /*
  * handle update a task with event
  */
  TodoItem.prototype.handleUpdateTodo = function(event) {

    var parentTarget = event.target.parentNode;

    var nameTodo = parentTarget.firstChild;
    var nameTodoEdit = parentTarget.lastChild;

    if (event.keyCode === 13 && nameTodoEdit.value !== '') {

      _helpers.addClass(nameTodoEdit, 'hidden');
      _helpers.removeClass(nameTodo, 'hidden');
      nameTodo.childNodes[1].textContent = nameTodoEdit.value;

      // update Name of todo to Storage
      this.todoList.updateTodoNametoStorage(parentTarget.getAttribute('data-id'), nameTodoEdit.value);
    }

    event.stop();
  };

  /*
  * handle update a task with event
  */
  TodoItem.prototype.handleLeaveEditTodo = function(event) {
    var parentTarget = event.target.parentNode;
    var nameTodo = parentTarget.firstChild;
    var nameTodoEdit = parentTarget.lastChild;

    _helpers.addClass(nameTodoEdit, 'hidden');
    _helpers.removeClass(nameTodo, 'hidden');

  };

  return view;
})();
