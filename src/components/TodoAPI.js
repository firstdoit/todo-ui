var $ = require('jquery');
var _ = require('underscore');

var API_ENDPOINT = 'https://tt-todo-api.herokuapp.com/api/todos/';

// Local cache
var todos = [];

var listTodos = function() {
  return $.get(API_ENDPOINT).then(function(result) {
    todos = result.todos;
    return todos;
  });
};

var createTodo = function(title) {
  if (title == null) {
    throw new Error("Can't create todo without title");
  }
  return $.ajax({
    url: API_ENDPOINT,
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({title: title})
  }).then(function(createdTodo) {
    todos.push(createdTodo);
    return todos;
  });
};

var updateTodo = function(todo) {
  if (todo == null || todo.id == null) {
    throw new Error("Can't update todo without id");
  }
  return $.ajax({
    url: API_ENDPOINT + todo.id,
    method: 'PUT',
    contentType: 'application/json',
    data: JSON.stringify(todo)
  });
};

var setTodoDone = function(id, done) {
  if (id == null) {
    throw new Error("Can't update todo without id");
  }
  if (done == null) {
    done = true;
  }
  var todo = _.findWhere(todos, {id: id});
  todo.done = done;
  return updateTodo(todo);
};

module.exports = {
  listTodos: listTodos,
  createTodo: createTodo,
  setTodoDone: setTodoDone
};
