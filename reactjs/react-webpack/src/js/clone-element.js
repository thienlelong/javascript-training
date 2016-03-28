var cloneWithProps = require('react-addons-clone-with-props');
var React = require('react');

var _makeBlue = function(element) {
  return cloneWithProps(element, {style: {color: 'blue'}});
};

var Blue = React.createClass({
  render: function() {
    var blueChildren = React.Children.map(this.props.children, _makeBlue);
    return <div>{blueChildren}
    {this.props.children}
    </div>;
  }
});

module.exports = Blue;