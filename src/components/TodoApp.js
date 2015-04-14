var $ = window.jQuery = require('jquery');
var React = require('react/addons');
var TodoInput = require('./TodoInput');
var TodoItem = require('./TodoItem');
var TodoFooter = require('./TodoFooter');

// CSS
require('../styles/tt-uikit-0.11.0.min.css');
require('../styles/main.less');

var api = 'https://tt-todo-api.herokuapp.com/api/todos/';

var TodoApp = React.createClass({
  getInitialState: function() {
    return {
      todos: [],
      newTitle: ''
    };
  },

  componentDidMount: function() {
    var success = function(result) {
      console.log(result);
      if (this.isMounted()) {
        this.setState({
          todos: result.todos
        });
      }
    };
    $.get(api, success.bind(this));
  },

  handleInput: function(newTitle) {
    this.setState({
      newTitle: newTitle
    });
  },

  handleSubmit: function() {
    var todos = this.state.todos;
    todos.push({title: this.state.newTitle});
    this.setState({
      todos: todos,
      newTitle: ''
    });
  },

  handleCheck: function(todoId, checked) {
    var todos = this.state.todos.map(function(t) {
      if (t.id === todoId) {
        t.done = checked;
      }
      return t;
    });
    this.setState({
      todos: todos
    });
  },

  handleCheckAll: function() {
    var todos = this.state.todos.map(function(t) {
      t.done = true;
      return t;
    });
    this.setState({
      todos: todos
    });
  },

  render: function() {
    var todoNodes = this.state.todos.map(function(t) {
      return (
        <TodoItem title={t.title}
          done={t.done}
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
