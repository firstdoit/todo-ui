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

  render: function() {
    var todoNodes = this.state.todos.map(function(t) {
      return <TodoItem title={t.title} done={t.done} id={t.id} />;
    });

    return (
      <div className='container main'>
        <header>
          <h1>Todos</h1>
        </header>
        <hr className="row"/>
        <TodoInput newTitle={this.state.newTitle} />
        <ul className="row">
        {todoNodes}
        </ul>
        <hr className="row"/>
        <TodoFooter todos={this.state.todos}/>
      </div>
    );
  }
});

module.exports = TodoApp;