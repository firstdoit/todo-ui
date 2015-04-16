var React = require('react/addons');
var DragDropMixin = require('react-dnd').DragDropMixin;
var ItemTypes = require('./ItemTypes');

// CSS
require('../styles/todo-item.less');

var dragSource = {
  beginDrag: function(component) {
    return {
      item: {
        id: component.props.id
      }
    };
  }
};

var dropTarget = {
  over: function(component, item) {
    component.props.moveTodo(item.id, component.props.id);
  }
};

var TodoItem = React.createClass({
  mixins: [DragDropMixin],

  statics: {
    configureDragDrop: function(register) {
      register(ItemTypes.TODO, {
        dragSource: dragSource,
        dropTarget: dropTarget
      });
    }
  },

  handleCheck: function () {
    this.props.onCheck(this.props.id, this.refs.checkbox.getDOMNode().checked);
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
          <i className="glyphicon glyphicon-resize-vertical pull-right"></i>
        </div>
      </li>
    );
  }
});

module.exports = TodoItem;
