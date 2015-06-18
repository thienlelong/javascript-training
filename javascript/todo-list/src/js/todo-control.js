/* global helpers, model, todoList, todoFilter */

;(function() {
  'use strict';

  var _helpers = helpers;
  var _model = model;
  var _todoList = todoList;
  var _todoFilter = todoFilter;

  /**
  * todoControl()
  * controller app
  *
  * @param {Array}
  * @return {void}
  */
  function TodoControl(todos, appElement) {

    this.todoApp = appElement;
    var toggleAll = document.getElementById('toggleAll');
    var newTodo = document.getElementById('todoNew');

    // handle event when user enter a task
    _helpers.addHandler(newTodo, 'keyup', _helpers.method(this, 'handleAddNewTodo'));
    _helpers.addHandler(toggleAll, 'click', _helpers.method(this, 'handleToggleAllTodo'));

    this.todoList = new _todoList.TodoList(this.getListTodo(todos));
    this.todoFilter = new _todoFilter.TodoFilter(this.todoList);

    // render list view and display clear button
    this.todoList.renderHtml();
    this.todoFilter.toggleMenuFilter();

    return this;
  }

  /**
  * handleAddNewTodo()
  * handle event add new todo
  *
  * @param {event} enter keyup
  * @return {void}
  */
  TodoControl.prototype.handleAddNewTodo = function(event) {
    var _target = event.target;
    var currentId = _helpers.getLocalStorage().currentId;
    if (typeof currentId === 'undefined') {
      currentId = 0;
    }

    currentId = parseInt(currentId, 10);

    // user press 'Enter'
    if (event.keyCode === 13 && _target.value !== '') {
      currentId++;
      this.todoList.todos.push(new _model.Todo(_target.value, false, currentId));
      this.todoList.addTodo();
      _helpers.getLocalStorage().setItem('currentId', currentId);
      _target.value = '';

      this.todoFilter.toggleMenuFilter();
      this.todoFilter.updateTodoFilter();
    }

    event.stop();
  };

  /**
  * handleAddNewTodo()
  * handle event add new todo
  *
  * @param {event} enter keyup
  * @return {void}
  */
  TodoControl.prototype.handleToggleAllTodo = function(event) {

    var todos = this.todoList.todos;
    for (var i = 0; i < todos.length; i++) {
      this.todoList.updateTodotoStorage(todos[i].id, event.target.checked);
    }

    this.todoList.renderHtml();
    this.todoFilter.toggleMenuFilter();
    this.todoFilter.updateTodoFilter();

  };
  /**
  * getListTodo()
  * if the browser hasn't todos, or couldn't parse to Object from Json,
  * get the todos to initialize
  *
  * @param {Array} todos
  * @return {Array}
  */
  TodoControl.prototype.getListTodo = function(todos) {
    var currentTodos = [];
    var savedTodos = _helpers.getLocalStorage().todos;

    if (typeof savedTodos !== 'undefined') {
      savedTodos = JSON.parse(savedTodos);
      var len = savedTodos.length;
      for (var i = 0; i < len; i++) {
        currentTodos.push(new _model.Todo(savedTodos[i].name, savedTodos[i].isCompleted, savedTodos[i].id));
      }

    } else {
      currentTodos = todos;
    }

    return currentTodos;
  };

  new TodoControl([], document.getElementById('todoApp'));
})();
