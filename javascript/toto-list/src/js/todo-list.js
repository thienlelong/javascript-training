/* global helpers, todoItem */

var todoList = (function() {
  'use strict';

  var view = {
    TodoList: TodoList
  };
  var _helpers = helpers;
  var _todoItem = todoItem;

  /*
  * todo List View constructor
  * @param{Array}     : tasks
  */
  function TodoList(todos) {
    this.todos = todos;
    this.rootElement = document.getElementById('todoList');
  }

  /*
  * render a new Todo list with its elements
  * @return{void}
  */
  TodoList.prototype.renderHtml = function() {
    var todosLength = this.todos.length;
    this.rootElement.innerHTML = '';

    if (todosLength > 0) {

      // save todo to localStorage
      for (var i = 0; i < todosLength; i++) {
        this.appendTodoItem(this.todos[i]);
      }

      // display toggle checkbox if has any todo
      var _toggleAll = document.getElementById('toggleAll');
      _helpers.removeClass(_toggleAll, 'hidden');

      // apdate data in Storage
      this.saveTodoToStorage();
    }
  };

  /*
  * append a TodoView to TodoListView
  * @return{void}
  */
  TodoList.prototype.appendTodoItem = function(todo) {
    var todoItem = new _todoItem.TodoItem(todo, this);
    this.rootElement.appendChild(todoItem.renderHtml());
  };

  /*
  * add a Todo
  * @return{void}
  */
  TodoList.prototype.addTodo = function() {
    var lastTodo = this.todos[this.todos.length - 1];
    this.appendTodoItem(lastTodo);

    // display toggler checkbox if has any todo
    if (this.todos.length > 0) {
      var _toggleAll = document.getElementById('toggleAll');
      _helpers.removeClass(_toggleAll, 'hidden');
    }

    // save todo to localStorage
    this.saveTodoToStorage();
  };

  /*
  * save a task to local Storage
  */
  TodoList.prototype.saveTodoToStorage = function() {
    _helpers.getLocalStorage().setItem('todos', JSON.stringify(this.todos));
  };

  /*
   * update status of a task
   * @return {void}
   */
  TodoList.prototype.updateTodotoStorage = function(id, isCompleted) {
    var todo = this.getItemAt(this.indexOf(id));
    todo.isCompleted = isCompleted;

    // update data in localStorage
    this.saveTodoToStorage();
  };

  /*
   * update status of a task
   * @return {void}
   */
  TodoList.prototype.updateTodoNametoStorage = function(id, name) {
    var todo = this.getItemAt(this.indexOf(id));
    todo.name = name;

    // update data in localStorage
    this.saveTodoToStorage();
  };

  TodoList.prototype.indexOf = function(id) {
    var result = -1;

    // parse id to integer
    var realId = parseInt(id, 10);

    if (isNaN(realId)) {
      return result;
    }

    // find position of task by Id
    var len = this.todos.length;
    for (var i = 0; i < len; i++) {
      if (this.getItemAt(i).id === realId) {
        result = i;
        return result;
      }
    }

  };

  TodoList.prototype.getItemAt = function(index) {
    return this.todos[index];
  };

  TodoList.prototype.removeItemAt = function(index) {
    return this.todos.splice(index, 1);
  };

  return view;
})();
