var React = require('react/addons');
var _ = require('underscore');
var ReactIntl = require('react-intl');
var IntlMixin = ReactIntl.IntlMixin;
var FormattedMessage = ReactIntl.FormattedMessage;

// CSS
require('../styles/todo-footer.less');

var TodoFooter = React.createClass({
  mixins: [IntlMixin],

  handleClick: function() {
    this.props.onCheckAll();
  },

  render: function() {
    var openTodos = _.filter(this.props.todos, function(t) {
      return t.done === false;
    });
    return (
      <div className="todo-footer row">
        <div className="col-xs-12">
          <span className="remaining pull-left">
            <FormattedMessage
              items={openTodos.length}
              message={this.getIntlMessage('itemsLeft')}/>
          </span>

          <button onClick={this.handleClick} className="btn btn-link pull-right">
            <FormattedMessage
              message={this.getIntlMessage('markAsComplete')}/>
          </button>
        </div>
      </div>
    );
  }
});

module.exports = TodoFooter;
