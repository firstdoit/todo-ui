var React = require('react/addons');

// CSS
require('../styles/todo-footer.less');

var TodoFooter = React.createClass({
  render: function() {
    return (
      <div className="todo-footer">
        <span className="remaining">{this.props.todos.length} items left</span>
        <button className="btn btn-link">Mark all as complete</button>
      </div>
    );
  }
});

module.exports = TodoFooter;
