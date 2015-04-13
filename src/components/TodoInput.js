var React = require('react/addons');

// CSS
require('../styles/todo-input.less');

var TodoInput = React.createClass({
  render: function() {
    return (
      <div className="todo-input">
        <form>
          <input type="text" value={this.props.newTitle}/>
          <input type="submit" value="Add Todo"/>
        </form>
      </div>
    );
  }
});

module.exports = TodoInput;
