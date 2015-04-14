var React = require('react/addons');

// CSS
require('../styles/todo-footer.less');

var TodoFooter = React.createClass({
  render: function() {
    return (
      <div className="todo-footer row">
        <div className="col-xs-12">
          <span className="remaining pull-left">{this.props.todos.length} items left</span>

          <button className="btn btn-link pull-right">Mark all as complete</button>
        </div>
      </div>
    );
  }
});

module.exports = TodoFooter;
