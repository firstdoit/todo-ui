var $ = window.jQuery = require('jquery');
var _ = require('underscore');
var React = require('react/addons');
var ReactIntl = require('react-intl');
var IntlMixin = ReactIntl.IntlMixin;
var FormattedMessage = ReactIntl.FormattedMessage;
var update = require('react/lib/update');
var TodoInput = require('./TodoInput');
var TodoItem = require('./TodoItem');
var TodoFooter = require('./TodoFooter');
var TodoAPI = require('./TodoAPI');

// CSS
require('../styles/tt-uikit-0.11.0.min.css');
require('../styles/main.less');

var TodoApp = React.createClass({
  mixins: [IntlMixin],

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

  handleRemove: function(todoId) {
    TodoAPI.removeTodo(todoId).done(function() {
      var todoIndex = _.findIndex(this.state.todos, function (t) {
        return t.id === todoId;
      });

      this.setState(update(this.state, {
        todos: {
          $splice: [
            [todoIndex, 1] //remove
          ]
        }
      }));
    }.bind(this));
  },

  endMoveTodo: function (id) {
    var index = _.findIndex(this.state.todos, function(t) {
      return t.id == id;
    });
    TodoAPI.moveTodo(id, index);
  },

  moveTodo: function (draggedId, targetId) {
    var todos = this.state.todos;

    var todo = _.filter(todos, function (t) {
      return t.id === draggedId;
    })[0];
    var todoIndex = _.indexOf(todos, todo);
    var targetIndex = _.findIndex(todos, function (t) {
      return t.id === targetId;
    });

    this.setState(update(this.state, {
      todos: {
        $splice: [
          [todoIndex, 1], //remove dragged from old position
          [targetIndex, 0, todo] //add at target position
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
          onRemove={this.handleRemove}
          moveTodo={this.moveTodo}
          endMoveTodo={this.endMoveTodo}/>
      );
    }.bind(this));

    return (
      <div className='container main'>
        <header>
          <h1>
            <FormattedMessage
              message={this.getIntlMessage('title')}/>
          </h1>
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
