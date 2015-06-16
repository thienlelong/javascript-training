/* global helpers, model, todoList, todoFilter */

;(function() {
  'use strict';

  var _helpers = helpers;
  var _model = model;
  var _todoList = todoList;
  var _todoFilter = todoFilter;

  /*
  * todo controller
  * @constructor
  * @param{Array}     : tasks
  */
  function TodoControl(todos, appElement) {

    this.todoApp = appElement;
    var toggleAll = document.getElementById('toggleAll');
    var newTodo = document.getElementById('todoNew');

    // handle event when user enter a task
    _helpers.addHandler(newTodo, 'keyup', _helpers.method(this, 'handelAddNewTodo'));

    this.todoList = new _todoList.TodoList(this.getListTodo(todos));
    this.todoFilter = new _todoFilter.TodoFilter(this.todoList);

    // render list view and display clear button
    this.todoList.renderHtml();
    this.todoFilter.tongleMenuFilter(this.todoList);

    return this;
  }

  TodoControl.prototype.handelAddNewTodo = function(event) {
    var _target = event.target;
    var currentId = _helpers.getLocalStorage().currentId;
    var btnComplete = document.getElementById('btnComplete');
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
      this.todoFilter.tongleMenuFilter(this.todoList);
      if (_helpers.hasClass(btnComplete, 'selected'))
        this.todoFilter.handelCompleteTodoFilter();
    }

    event.stop();
  };

  TodoControl.prototype.getListTodo = function(todos) {
    var currentTodos = [];

    // get todos from localStorage
    var savedTodos = _helpers.getLocalStorage().todos;

    /*if the browser hasn't todos, or couldn't parse to Object from Json,
      get the todos to initialize
    */
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
