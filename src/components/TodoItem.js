var React = require('react/addons');

// CSS
require('../styles/todo-item.less');

var TodoItem = React.createClass({
  handleCheck: function () {
    this.props.onCheck(this.props.id, this.refs.checkbox.getDOMNode().checked);
  },

  render: function() {
    var className = "todo-item row";
    if (this.props.done) {
      className += " done";
    }
    return (
      <li className={className}>
        <div className="checkbox col-sm-12">
          <input onChange={this.handleCheck}
            type="checkbox"
            ref="checkbox"
            id={'todo-' + this.props.id}
            checked={this.props.done}/>
          <label htmlFor={'todo-' + this.props.id}>{this.props.title}</label>
          <i className="glyphicon glyphicon-resize-vertical pull-right"></i>
        </div>
      </li>
    );
  }
});

module.exports = TodoItem;