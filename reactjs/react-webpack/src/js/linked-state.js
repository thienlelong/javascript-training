var LinkedStateMixin = require('react-addons-linked-state-mixin');
var React = require('react');

var WithLink = React.createClass({
  mixins: [LinkedStateMixin],
  getInitialState: function() {
    return {message: 'Hello!'};
  },
  render: function() {
    return (
      <div>
        <p>Link</p>
        <input type="text" valueLink={this.linkState('message')}/>
        <p>{this.state.message}</p>
      </div>
    );
  }
});

/*ReactLink Without valueLink
*/
var LinkedStateMixin = require('react-addons-linked-state-mixin');

var WithoutLink = React.createClass({
  mixins: [LinkedStateMixin],
  getInitialState: function() {
    return {message: 'Hello!'};
  },
  render: function() {
    var valueLink = this.linkState('message');
    var handleChange = function(e) {
      valueLink.requestChange(e.target.value);
    };
    return (
      <div>
        <p>Without Link</p>
        <input type="text" value={valueLink.value} onChange={handleChange} />
        <p>{this.state.message || "empty"}</p>
      </div>
    );
  }
});

module.exports = {
  WithLink: WithLink,
  WithoutLink: WithoutLink
};
