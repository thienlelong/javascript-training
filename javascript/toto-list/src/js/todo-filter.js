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

  /*
  * display menu filter Filter
  */

  TodoFilter.prototype.tongleMenuFilter = function() {
    var todoFilter = document.getElementById('todoFilter');
    var btnFilters = document.getElementsByClassName('filter__btn');
    var btnClearComplete = document.getElementById('btnClearComplete');

    _helpers.addHandler(btnClearComplete, 'click', _helpers.method(this, 'clearTodoCompleted'));

    for (var i = 0; i < btnFilters.length; i++)
      _helpers.addHandler(btnFilters[i], 'click', _helpers.method(this, 'handelTodoFilter'));

    if (this.todoList.todos.length) {
      _helpers.removeClass(todoFilter, 'hidden');
      this.updateCountTodoList();
    }
  };

  /*
  * handle todo filter
  */
  TodoFilter.prototype.handelTodoFilter = function(event) {
    var btnFilter = event.target;
    var btnFilters = document.getElementsByClassName('filter__btn');

    _helpers.forEach(btnFilters, function (item) {
      _helpers.removeClass(item, 'selected');
    });

    _helpers.addClass(btnFilter, 'selected');

    switch (btnFilter.id){
      case 'btnComplete':
        this.handelCompleteTodoFilter();
        break;
      case 'btnActive':
        this.handelActiveTodoFilter();
        break;
      default:
        this.handelAllTodoFilter();
    }

    event.stop();
  };

  TodoFilter.prototype.clearTodoCompleted = function(event) {
    var todos = this.todoList.todos;
    for (var i = 0; i < todos.length; i++) {
      if (todos[i].isCompleted) 
        this.todoList.removeItemAt(i);
    }
    
    // update data in Storage
    this.todoList.saveTodoToStorage();
    this.todoList.renderHtml();

    event.stop();
  };

  TodoFilter.prototype.handelAllTodoFilter = function() {
    var todoItems = document.getElementById('todoList').childNodes;
    _helpers.forEach(todoItems, function (item) {
      _helpers.removeClass(item, 'hidden');
    });
  };

  TodoFilter.prototype.handelActiveTodoFilter = function() {
    var todoItems = document.getElementById('todoList').childNodes;
    _helpers.forEach(todoItems, function (item) {
      if (_helpers.hasClass(item, 'completed')) {
        _helpers.addClass(item, 'hidden');
      } else _helpers.removeClass(item, 'hidden');
    });
  };

  TodoFilter.prototype.handelCompleteTodoFilter = function() {
    var todoItems = document.getElementById('todoList').childNodes;
    _helpers.forEach(todoItems, function (item) {
      if (_helpers.hasClass(item, 'completed')) {
        _helpers.removeClass(item, 'hidden');
      } else _helpers.addClass(item, 'hidden');
    });

  };

  TodoFilter.prototype.updateCountTodoList = function() {
    var count = 0;
    var countTodo = document.getElementById('countTodo');
    _helpers.forEach(this.todoList.todos, function (item) {
      if (!item.isCompleted) count++;
    });
    
    countTodo.innerHTML = (count === 1) ? (count +' item left') : (count +' items left');
  };

  return view;
})();
