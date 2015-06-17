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

  /**
  * renderHtml()
  * render html view of list todo
  *
  * @param { } 
  * @return {void}
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

  /**
  * appendTodoItem()
  * render html of todo item and add to todo list
  *
  * @param {Object} todo 
  * @return {void}
  */
  TodoList.prototype.appendTodoItem = function(todo) {
    var todoItem = new _todoItem.TodoItem(todo, this);
    this.rootElement.appendChild(todoItem.renderHtml());
  };

  /**
  * addTodo()
  * add todo item to todo list
  *
  * @param { } 
  * @return {void}
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

  /**
  * updateTodotoStorage()
  * update isComplete of todo item to localStorage
  *
  * @param {Number, Boolean} id, isCompleted 
  * @return {void}
  */
  TodoList.prototype.updateTodotoStorage = function(id, isCompleted) {
    var todo = this.getItemAt(this.indexOf(id));
    todo.isCompleted = isCompleted;

    // update data in localStorage
    this.saveTodoToStorage();
  };

  /**
  * updateTodoNametoStorage()
  * update name of todo item to localStorage
  *
  * @param {Number,String} id, name 
  * @return {void}
  */
  TodoList.prototype.updateTodoNametoStorage = function(id, name) {
    var todo = this.getItemAt(this.indexOf(id));
    todo.name = name;

    // update data in localStorage
    this.saveTodoToStorage();
  };

  /**
  * indexOf()
  * get index of todo item from id
  *
  * @param {Number} id 
  * @return {Number} index
  */
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

  /**
  * getItemAt()
  * get todo item of todo list
  *
  * @param {number} index 
  * @return {Object}
  */
  TodoList.prototype.getItemAt = function(index) {
    return this.todos[index];
  };

  /**
  * removeItemAt()
  * remove item of todos list at index
  *
  * @param {number} index 
  * @return {array}
  */
  TodoList.prototype.removeItemAt = function(index) {
    return this.todos.splice(index, 1);
  };

  return view;
})();
