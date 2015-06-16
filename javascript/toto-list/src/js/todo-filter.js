var todoFilter = (function() {
  "use strict";

  var _helpers = helpers;
  var view = {
    TodoFilter: TodoFilter
  };

  function TodoFilter(todoList) {
    this.todoList =  todoList
  }

  /*
  * Display menu filter Filter
  */

  TodoFilter.prototype.tongleMenuFilter = function() {
  	var todoFilter = document.getElementById('todoFilter');
    var btnFilters = document.getElementsByClassName('filter__btn');
    
    for (var i = 0; i < btnFilters.length; i++) {
      _helpers.addHandler(btnFilters[i], 'click', _helpers.method(this, 'handelTodoFilter'));
    };

  	if (this.todoList.todos.length) {
  		_helpers.removeClass(todoFilter, 'hidden');
  	}
  }

  /*
  * handle todo filter
  */
  TodoFilter.prototype.handelTodoFilter = function(event) {
    var btnFilter = event.target;
    var btnFilters = document.getElementsByClassName('filter__btn');
    for (var i = 0; i < btnFilters.length; i++) {
      _helpers.removeClass(btnFilters[i],'selected');
    };

    _helpers.addClass(btnFilter, 'selected');

    switch(btnFilter.id){
      case 'btnComplete':
        this.handelCompleteTodoFilter();
        break;
      case 'btnActive':
        this.handelActiveTodoFilter();
        break;
      default:
        this.handelAllTodoFilter();
    }

  }

  TodoFilter.prototype.handelAllTodoFilter = function(){
    var todoItems = document.getElementById('todoList').childNodes;
    for ( var i = 0; i < todoItems.length; i++){
      _helpers.removeClass(todoItems[i], 'hidden');
    }

  }

  TodoFilter.prototype.handelActiveTodoFilter = function(){
    var todoItems = document.getElementById('todoList').childNodes;
    for ( var i = 0; i < todoItems.length; i++){
      if (_helpers.hasClass(todoItems[i], 'completed')){
        _helpers.addClass(todoItems[i], 'hidden');
      } 
      else _helpers.removeClass(todoItems[i], 'hidden');
    }

  }

  TodoFilter.prototype.handelCompleteTodoFilter = function(){
    var todoItems = document.getElementById('todoList').childNodes;
    for ( var i = 0; i < todoItems.length; i++){
      if (_helpers.hasClass(todoItems[i], 'completed')){
        _helpers.removeClass(todoItems[i], 'hidden');
      } 
      else _helpers.addClass(todoItems[i], 'hidden');
    }

  }
  
  return view;
})();