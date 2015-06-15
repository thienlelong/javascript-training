!(function() {
  'use strict';

  var _helpers = helpers;
  var _model = model;
  var _todoList = todoList;
  var _todoAction = todoAction;
 
  /*
  * Todo controller
  * @constructor
  * @param{Array}     : tasks
  */
  function TodoControl(todos, appElement) {

    this.todoApp = appElement;
    var _this = this;
    var toggleAll = document.querySelector('#toggleAll');
    var newTodo = document.querySelector('#todoNew');

    // Handle event when user enter a task
    _helpers.addHandler(newTodo, 'keyup', _helpers.method(this, 'handelAddNewTodo'));
    
    this.todoList = new _todoList.TodoList(this.getListTodo(todos));

    // Render list view and display clear button
    this.todoList.renderHtml();

    return this;
  }

  TodoControl.prototype.handelAddNewTodo = function(event) {
    var _target = event.target;
    var currentId = _helpers.getLocalStorage().currentId;
    if (typeof currentId === 'undefined') {
      currentId = 0;
    }
    currentId = parseInt(currentId, 10);

    // User press 'Enter'
    if (event.keyCode === 13 && _target.value !== '') {
      currentId++;
      this.todoList.todos.push(new _model.Todo(_target.value, false, currentId));
      this.todoList.addTodo();
      _helpers.getLocalStorage().setItem('currentId', currentId);
      _target.value = '';
    }

    event.stop();
  }

  TodoControl.prototype.getListTodo = function(todos) {
    var currentTodos = [];

    // Get todos from localStorage
    var savedTodos = _helpers.getLocalStorage().todos;
    
    /*If the browser hasn't todos, or couldn't parse to Object from Json,
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
  }


  new TodoControl([], document.querySelector('#todoApp'));
})();