var $ = window.jQuery = require('jquery');
var _ = require('underscore');
var React = require('react/addons');
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
    var todos = this.state.todos;
    var newId = todos[todos.length-1].id + 1;
    todos.push({
      title: this.state.newTitle,
      id: newId,
      done: false
    });
    this.setState({
      todos: todos,
      newTitle: ''
    });
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
    TodoAPI.setTodoDone(todoId, checked).fail(function(reason) {
      console.log('Updating todo ' + todoId + ' failed', reason);
      // Revert in case of problems
      updateTodo(!checked)
    });

    // Update UI synchronously
    updateTodo(checked);
  },

  handleCheckAll: function() {
    var todos = _.map(this.state.todos, function(t) {
      t.done = true;
      return t;
    });
    this.setState({
      todos: todos
    });
  },

  render: function() {
    var todoNodes = _.map(this.state.todos, function(t) {
      return (
        <TodoItem title={t.title}
          done={t.done}
          key={t.id}
          id={t.id}
          onCheck={this.handleCheck}/>
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
