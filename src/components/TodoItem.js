var React = require('react/addons');

// CSS
require('../styles/todo-item.less');

var TodoItem = React.createClass({
  handleCheck: function () {
    this.props.onCheck(this.props.id, this.refs.checkbox.getDOMNode().checked);
  },

  render: function() {
    return (
      <li className="todo-item row">
        <div className="checkbox col-sm-12">
          <input onChange={this.handleCheck}
            type="checkbox"
            ref="checkbox"
            id={'todo-' + this.props.id}
            checked={this.props.done}/>
          <label htmlFor={'todo-' + this.props.id}>{this.props.title}</label>
        </div>
      </li>
    );
  }
});

module.exports = TodoItem;
