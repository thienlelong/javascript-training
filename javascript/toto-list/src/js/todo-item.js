var todoItem = (function() {
  "use strict";

  var view = {
    Todo: Todo
  };
  var _helpers = helpers;
  var _dom = dom;

  /*
  * Todo view constructor
  * @param{Array}     : task
  * @param{Object}     : parent view
  */
  function Todo(todo, parent) {
    this.todo = todo;
    this.parentView = parent;
  }

  /*
  * Render a todo view(li element) includes data
  * @return {HTMLElement}     : a li element
  */
  Todo.prototype.renderHtml = function() {
    var todoStatus = this.todo.isCompleted;

    // Create elements for a Todo (a todo element is an item of list) and add event for them
    var todoToggle = _dom('input', {type: 'checkbox', class: 'todo-item__toggle'});
    var todoName = _dom('label', {class: 'todo-item__name'}, this.todo.name);
    var todoDelete = _dom('a', {class: 'todo-item__btn-delete'}, '<x></x>');
    var todoEdit = _dom('input', {class: 'todo-item__edit hidden'}, this.todo.name);

    // Render a Todo Element
    this.todoItem = _dom('li', {class: 'todo-item', 'data-id': this.todo.id},
      _dom('div', {class: 'todo-view'},
      todoToggle, todoName, todoDelete),
      todoEdit);

    _helpers.addHandler(todoDelete, 'click', _helpers.method(this, 'handleDestroyTask'));
    _helpers.addHandler(todoToggle, 'click', _helpers.method(this, 'handleToggleTodo'));
    // Mark if todo is completed or active
    if (todoStatus) {
      _helpers.addClass(this.todoItem, 'completed');
      this.todoItem.firstChild.firstChild.checked = true;
    }

    return this.todoItem;
  };


    /*
  * Handle checking a task with event
  */
  Todo.prototype.handleToggleTodo = function(event) {
    var target = event.target;
    var parentTarget = target.parentNode.parentNode;
    var toggleAll = document.getElementById('toggleAll');


    // Add completed class to todo dom to inform that a todo is completed
    if (target.checked) {
      _helpers.addClass(parentTarget, 'completed');
    } else {
      _helpers.removeClass(parentTarget, 'completed');
    }

    // Update status of Todo
    this.parentView.updateTodotoStorage(parentTarget.getAttribute('data-id'), target.checked);

  };

  return view;
})();