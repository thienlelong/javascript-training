'use strict';
var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var port = parseInt(process.env.PORT, 10) || 8000;

// Enables CORS
var enableAccess = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

  // intercept OPTIONS method
  if ('OPTIONS' === req.method) {
    res.send(200);
  } else {
    next();
  }
};

// used to parse JSON object given in the request body
app.use(enableAccess);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var todosList = {
  '1': {
    'id': 1,
    'name': 'Task 1',
    'completed': false
  },
  '2': {
    'id': 2,
    'name': 'Task 2',
    'completed': true
  }
};

var next_id = 3;
/**
 * get()
 * HTTP GET /todos
 * Returns: the list of tasks in JSON format
 */
app.get('/todos', function(req, res) {
  var todos = [];

  for (var key in todosList) {

    todos.push(todosList[key]);
  }

  res.send(todos);

  // simulate delay in server
  /*setTimeout(function() {
    res.send(todos);
  }, 500);*/
});

app.get('/todos/:id', function(req, res) {
  res.send(todosList[req.params.id]);
});

/**
 * post()
 * HTTP POST /todos
 * Returns: todo has been add new
 */
app.post('/todos', function(req, res) {
  var todo = {};
  todo.id = next_id++;
  todo.name = req.body.name;
  todo.completed = false;
  todosList[todo.id] = todo;

  res.send(todo);
});

/**
 * post()
 * HTTP POST /todos
 * Returns: todo has been update
 */
app.post('/todos/:id', function(req, res) {
  var todo = {};
  todo.id = req.params.id;
  todo.name = req.body.name;
  todo.completed = req.body.completed;
  todosList[todo.id] = todo;

  res.send(todo);
});

app.delete('/todos/:id', function(req, res) {
  var todo = {};
  todo.id = req.params.id;
  delete todosList[todo.id];
  res.send(todo);
});

// to port on which the express server listen
app.listen(port);
console.log('Now serving the app at http://localhost:' + port + '/');
