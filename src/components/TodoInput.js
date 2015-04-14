var React = require('react/addons');

// CSS
require('../styles/todo-input.less');

var TodoInput = React.createClass({
  render: function() {
    return (
      <div className="todo-input">
        <form className="form-inline row">
          <div className="col-xs-8 col-md-9 form-group">
            <input className="form-control" placeholder="What needs to be done?" type="text" value={this.props.newTitle}/>
          </div>
          <div className="col-xs-4 col-md-3">
            <input type="submit" className="btn btn-default" value="Add Todo"/>
          </div>
        </form>
      </div>
    );
  }
});

module.exports = TodoInput;
