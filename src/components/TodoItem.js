var React = require('react/addons');

// CSS
require('../styles/todo-item.less');

var TodoItem = React.createClass({
  render: function() {
    return (
      <li className="todo-item row">
        <div className="checkbox col-sm-12">
          <input type="checkbox" id={'todo-' + this.props.id} value={this.props.done}/>
          <label htmlFor={'todo-' + this.props.id}>{this.props.title}</label>
        </div>
      </li>
    );
  }
});

module.exports = TodoItem;
