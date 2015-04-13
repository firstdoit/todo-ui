'use strict';

describe('TodoApp', function () {
  var React = require('react/addons');
  var TodoUiApp, component;

  beforeEach(function () {
    var container = document.createElement('div');
    container.id = 'content';
    document.body.appendChild(container);

    TodoUiApp = require('components/TodoApp.js');
    component = React.createElement(TodoUiApp);
  });

  it('should create a new instance of TodoApp', function () {
    expect(component).toBeDefined();
  });
});
