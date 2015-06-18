// define models of application
var model = (function() {
  // defines that JavaScript code should be executed in "strict mode" (local scope)
  'use strict';

  var models = {
    Todo: Todo
  };

  /*
  * todo (task) constructor
  * @param {String}  : name of task
  * @param {Boolean} : status of task - completed or not
  */
  function Todo(name, isCompleted, id) {
    this.name = name;
    this.isCompleted = isCompleted;
    this.id = id;
  }

  return models;
})();

