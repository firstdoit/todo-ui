var React = require('react/addons');
var DragDropMixin = require('react-dnd').DragDropMixin;
var ItemTypes = require('./ItemTypes');
var ReactIntl = require('react-intl');
var IntlMixin = ReactIntl.IntlMixin;
var FormattedMessage = ReactIntl.FormattedMessage;

// CSS
require('../styles/todo-item.less');

var dragSource = {
  beginDrag: function(component) {
    return {
      item: {
        id: component.props.id,
        title: component.props.title
      }
    };
  },
  endDrag: function(component) {
    component.props.endMoveTodo(component.props.id);
  }
};

var dropTarget = {
  // item is currently dragged todo
  // component is the target area
  over: function(component, item) {
    component.props.moveTodo(item.id, component.props.id);
  }
};

var TodoItem = React.createClass({
  mixins: [DragDropMixin, IntlMixin],

  statics: {
    configureDragDrop: function(register) {
      register(ItemTypes.TODO, {
        dragSource: dragSource,
        dropTarget: dropTarget
      });
    }
  },

  handleCheck: function() {
    this.props.onCheck(this.props.id, this.refs.checkbox.getDOMNode().checked);
  },

  handleRemoveClick: function() {
    this.props.onRemove(this.props.id);
  },

  render: function() {
    var isDragging = this.getDragState(ItemTypes.TODO).isDragging;
    var opacity = isDragging ? 0 : 1;
    var style = {
      opacity: opacity
    };
    var className = "todo-item row";
    if (this.props.done) {
      className += " done";
    }
    return (
      <li className={className}
        style={style}
        {...this.dragSourceFor(ItemTypes.TODO)}
        {...this.dropTargetFor(ItemTypes.TODO)}>
        <div className="checkbox col-sm-12">
          <input onChange={this.handleCheck}
            type="checkbox"
            ref="checkbox"
            id={'todo-' + this.props.id}
            checked={this.props.done}/>
          <label htmlFor={'todo-' + this.props.id}>{this.props.title}</label>
          <div className="controls pull-right">
            <button onClick={this.handleRemoveClick} className="btn btn-link ">
              <FormattedMessage
                message={this.getIntlMessage('remove')}/>
            </button>
            <i className="glyphicon glyphicon-resize-vertical"></i>
          </div>
        </div>
      </li>
    );
  }
});

module.exports = TodoItem;
