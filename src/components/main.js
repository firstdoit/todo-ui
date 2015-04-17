require('intl'); // Patch older browsers
var TodoIntl = require('./TodoIntl');
var React = require('react');
var Router = require('react-router');
var Route = Router.Route;

var content = document.getElementById('content');

var Routes = (
  <Route handler={TodoIntl}>
    <Route name="/" handler={TodoIntl}/>
  </Route>
);

Router.run(Routes, function (Handler) {
  React.render(<Handler/>, content);
});
