var $ = window.jQuery = require('jquery');
var _ = require('underscore');
var React = require('react/addons');
var update = require('react/lib/update');
var TodoInput = require('./TodoInput');
var TodoItem = require('./TodoItem');
var TodoFooter = require('./TodoFooter');
var TodoAPI = require('./TodoAPI');

// CSS
require('../styles/tt-uikit-0.11.0.min.css');
require('../styles/main.less');

var TodoApp = React.createClass({
  getInitialState: function() {
    return {
      todos: [],
      newTitle: ''
    };
  },

  onTodoList: function(todos) {
    this.setState({
      todos: todos
    });
  },

  componentDidMount: function() {
    TodoAPI.listTodos().done(this.onTodoList);
  },

  handleInput: function(newTitle) {
    this.setState({
      newTitle: newTitle
    });
  },

  handleSubmit: function() {
    if (this.state.newTitle === '') {
      return;
    }
    TodoAPI.createTodo(this.state.newTitle).done(function(todos) {
      this.setState({
        todos: todos,
        newTitle: ''
      });
    }.bind(this));
  },

  handleCheck: function(todoId, checked) {
    var updateTodo = function(c) {
      var todos = _.map(this.state.todos, function(t) {
        if (t.id === todoId) {
          t.done = c;
        }
        return t;
      });
      this.setState({
        todos: todos
      });
    }.bind(this);

    // Send update to server
    try {
      TodoAPI.setTodoDone(todoId, checked).fail(function(reason) {
        console.log('Updating todo ' + todoId + ' failed', reason);
        // Revert in case of problems
        updateTodo(!checked);
      });
      // Update UI synchronously
      updateTodo(checked);
    } catch (e) {
      console.error(e);
    }
  },

  handleCheckAll: function() {
    _.each(this.state.todos, function(t) {
      this.handleCheck(t.id, true);
    }.bind(this));
  },

  moveTodo: function (id, afterId) {
    var todos = this.state.todos;

    var todo = _.filter(todos, function (c) {
      return c.id === id;
    })[0];
    var afterTodo = _.filter(todos, function (c) {
      return c.id === afterId;
    })[0];
    var todoIndex = todos.indexOf(todo);
    var afterIndex = todos.indexOf(afterTodo);

    this.setState(update(this.state, {
      todos: {
        $splice: [
          [todoIndex, 1], //remove from old position
          [afterIndex, 0, todo] //add at new position
        ]
      }
    }));
  },

  render: function() {
    var todoNodes = _.map(this.state.todos, function(t) {
      return (
        <TodoItem title={t.title}
          done={t.done}
          key={t.id}
          id={t.id}
          onCheck={this.handleCheck}
          moveTodo={this.moveTodo}/>
      );
    }.bind(this));

    return (
      <div className='container main'>
        <header>
          <h1>Todos</h1>
        </header>
        <hr className="row"/>
        <TodoInput newTitle={this.state.newTitle}
          onTitleInput={this.handleInput}
          onTitleSubmit={this.handleSubmit}/>
        <ul className="row">
        {todoNodes}
        </ul>
        <hr className="row"/>
        <TodoFooter todos={this.state.todos}
          onCheckAll={this.handleCheckAll}/>
      </div>
    );
  }
});

module.exports = TodoApp;
