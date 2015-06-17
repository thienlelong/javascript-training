/* global helpers */

var todoFilter = (function() {
  'use strict';

  var _helpers = helpers;
  var view = {
    TodoFilter: TodoFilter
  };

  function TodoFilter(todoList) {
    this.todoList =  todoList;
  }

  /**
  * toggleMenuFilter()
  * render and register events on menu filter
  *
  * @param {}
  * @return {void}
  */
  TodoFilter.prototype.toggleMenuFilter = function() {
    var todoFilter = document.getElementById('todoFilter');
    var btnFilters = document.getElementsByClassName('filter__btn');
    var btnClearComplete = document.getElementById('btnClearComplete');
    var toggleAll = document.getElementById('toggleAll');

    _helpers.addHandler(btnClearComplete, 'click', _helpers.method(this, 'clearTodoCompleted'));

    for (var i = 0; i < btnFilters.length; i++)
      _helpers.addHandler(btnFilters[i], 'click', _helpers.method(this, 'handleTodoFilter'));

    if (this.todoList.todos.length) {
      _helpers.removeClass(todoFilter, 'hidden');
      this.updateCountTodoList();
      this.toggleClearComplete();
      this.toggleAllTodo();
    } else {
      _helpers.addClass(todoFilter, 'hidden');
      _helpers.addClass(toggleAll, 'hidden');
    }
  };

  /**
  * handleTodoFilter()
  * handle event filter todo list
  *
  * @param {event} click mouse on btn filter
  * @return {void}
  */
  TodoFilter.prototype.handleTodoFilter = function(event) {
    var btnFilter = event.target;
    var btnFilters = document.getElementsByClassName('filter__btn');

    _helpers.forEach(btnFilters, function(item) {
      _helpers.removeClass(item, 'selected');
    });

    _helpers.addClass(btnFilter, 'selected');

    switch (btnFilter.id){
      case 'btnComplete':
        this.completeTodoFilter();
        break;
      case 'btnActive':
        this.activeTodoFilter();
        break;
      default:
        this.allTodoFilter();
    }

    event.stop();
  };

  /**
  * clearTodoCompleted()
  * handle event clear all todo item is completed
  *
  * @param {event} on click mouse btn clear completed
  * @return {void}
  */
  TodoFilter.prototype.clearTodoCompleted = function(event) {
    var todos = this.todoList.todos;
    for (var i = 0; i < todos.length; i++) {
      if (todos[i].isCompleted) this.todoList.removeItemAt(i);
    }

    // update data in Storage
    this.todoList.saveTodoToStorage();

    // render html
    this.todoList.renderHtml();
    this.toggleMenuFilter();
    this.updateTodoFilter();

    event.stop();
  };

  /**
  * allTodoFilter()
  * all todo list
  *
  * @param {}
  * @return {void}
  */
  TodoFilter.prototype.allTodoFilter = function() {
    var todoItems = document.getElementById('todoList').childNodes;
    _helpers.forEach(todoItems, function(item) {
      _helpers.removeClass(item, 'hidden');
    });
  };

  /**
  * activeTodoFilter()
  * filter todo list is actice
  *
  * @param {}
  * @return {void}
  */
  TodoFilter.prototype.activeTodoFilter = function() {
    var todoItems = document.getElementById('todoList').childNodes;
    _helpers.forEach(todoItems, function(item) {
      if (_helpers.hasClass(item, 'completed')) {
        _helpers.addClass(item, 'hidden');
      } else _helpers.removeClass(item, 'hidden');
    });
  };

  /**
  * completeTodoFilter()
  * filter todo list is completed
  *
  * @param {}
  * @return {void}
  */
  TodoFilter.prototype.completeTodoFilter = function() {
    var todoItems = document.getElementById('todoList').childNodes;

    _helpers.forEach(todoItems, function(item) {
      if (_helpers.hasClass(item, 'completed')) {
        _helpers.removeClass(item, 'hidden');
      } else _helpers.addClass(item, 'hidden');
    });

  };

  /**
  * updateCountTodoList()
  * update and render numbers list item is actice
  *
  * @param {}
  * @return {void}
  */
  TodoFilter.prototype.updateCountTodoList = function() {
    var count = 0;
    var countTodo = document.getElementById('countTodo');

    _helpers.forEach(this.todoList.todos, function(item) {
      if (!item.isCompleted) count++;
    });

    countTodo.innerHTML = count + (count === 1 ? ' item left' : ' items left');
  };

  /**
  * toggleClearComplete()
  *
  * @param {}
  * @return {void}
  */
  TodoFilter.prototype.toggleClearComplete = function() {
    var btnClearComplete = document.getElementById('btnClearComplete');

    for (var i = 0; i < this.todoList.todos.length; i++) {
      if (this.todoList.todos[i].isCompleted) {
        _helpers.removeClass(btnClearComplete, 'hidden');
        return true;
      }
    }

    _helpers.addClass(btnClearComplete, 'hidden');
  };

  /**
  * toggleClearComplete()
  *
  * @param {}
  * @return {void}
  */
  TodoFilter.prototype.toggleAllTodo = function() {
    var btnClearComplete = document.getElementById('toggleAll');

    for (var i = 0; i < this.todoList.todos.length; i++) {
      if (!this.todoList.todos[i].isCompleted) {
        btnClearComplete.checked = false;
        return false;
      }
    }

    btnClearComplete.checked = true;
  };

  TodoFilter.prototype.updateTodoFilter = function() {
    var btnFilterId = document.querySelector('.todo-filter__list .selected').id;

    if (btnFilterId === 'btnActive') this.activeTodoFilter();
    else if (btnFilterId === 'btnComplete') this.completeTodoFilter();
  };

  return view;
})();
