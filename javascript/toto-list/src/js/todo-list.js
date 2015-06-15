var todoList = (function() {
  'use strict';

  var view = {
    TodoList: TodoList
  };
  var _helpers = helpers;

  /*
  * Todo List View constructor
  * @param{Array}     : tasks
  */
  function TodoList(todos) {
    this.todos = todos;
    this.rootElement = document.getElementById('todoList');
  }

  /*
  * Render a new Todo list with its elements
  * @return{void}
  */
  TodoList.prototype.renderHtml = function() {
    var todosLength = this.todos.length;
    this.rootElement.innerHTML = '';

    if (todosLength > 0) {

      // Remove filter and render one , then add to app view
      var _parent = this.rootElement.parentNode;
    
      // Save todo to localStorage
      for (var i = 0; i < todosLength; i++) {
        this.appendTodoItem(this.todos[i]);
      }

      // Display toggler checkbox if has any todo
        var _toggleAll = document.getElementById('toggleAll');
        _helpers.removeClass(_toggleAll, 'hidden');
      

      // Update data in Storage
      this.saveTodoToStorage();
    }
  };

   /*
  * Append a TodoView to TodoListView
  * @return{void}
  */
  TodoList.prototype.appendTodoItem = function(todo) {
    var todo = new todoItem.Todo(todo, this);
    this.rootElement.appendChild(todo.renderHtml());
  };

  /*
  * Add a Todo
  * @return{void}
  */
  TodoList.prototype.addTodo = function() {
    var lastTodo = this.todos[this.todos.length - 1];
    this.appendTodoItem(lastTodo);

    // Remove filter and render one, then add to app view
    var _parent = this.rootElement.parentNode;

    // Display toggler checkbox if has any todo
    if (this.todos.length > 0) {
      var _toggleAll = document.getElementById('toggleAll');
      _helpers.removeClass(_toggleAll, 'hidden');
    }

    // Save todo to localStorage
    this.saveTodoToStorage();
  };


  /*
  * Save a task to local Storage
  */
  TodoList.prototype.saveTodoToStorage = function() {
    _helpers.getLocalStorage().setItem('todos', JSON.stringify(this.todos));
  };

  /*
   * Update status of a task
   * @return {void}
   */
  TodoList.prototype.updateTodotoStorage = function(id, isCompleted) {
    console.log(this.todos);
    var todo = this.todos[3]
    todo.isCompleted = isCompleted;

    // Update data in localStorage
    this.saveTodoToStorage();
  };
  return view;
})();