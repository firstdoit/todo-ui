var $ = require('jquery');
var React = require('react/addons');

// CSS
require('../styles/tt-uikit-0.11.0.min.css');
require('../styles/main.less');

var api = 'https://tt-todo-api.herokuapp.com/api/todos/';

var TodoUiApp = React.createClass({
  getInitialState: function() {
    return {
      todos: []
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

  renderTodo: function(c) {
    return (
      <li>{c.title}</li>
    );
  },

  render: function() {
    var todoNodes = this.state.todos.map(this.renderTodo);

    return (
      <div className='main'>
        <ul>
          {todoNodes}
        </ul>
      </div>
    );
  }
});

module.exports = TodoUiApp;
