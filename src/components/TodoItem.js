var React = require('react/addons');

// CSS
require('../styles/todo-item.less');

var TodoItem = React.createClass({
  render: function() {
    return (
      <li className='todo-item'>
        <input type="checkbox" value={this.props.done}/>
        <span>{this.props.title}</span>
        <i className="handle"></i>
      </li>
    );
  }
});

module.exports = TodoItem;
