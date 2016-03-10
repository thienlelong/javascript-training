var React = require('react');
var ReactDOM = require('react-dom');
require('../css/style.css');

// WITHOUT JSX
// WITH JSX
var Hello = React.createClass({
    render: function() {
        return <div>Hello {this.props.name}</div>;
    }
});

ReactDOM.render(
  <Hello name="World asdad" />,
    document.getElementById('react')
);