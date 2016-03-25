var React = require('react');

var Avatar = React.createClass({
  propTypes: {
    id: React.PropTypes.number.isRequired,
    name: React.PropTypes.string.isRequired,
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
    initialLike: React.PropTypes.bool.isRequired,
    onDelete: React.PropTypes.func.isRequired,
  },
  getInitialState() {
    return {
      liked: this.props.initialLike
    };
  },
  onClick() {
    this.setState({liked: !this.state.liked});
  },
  _onDelete() {
    this.props.onDelete(this.props.id);
  },
  render() {
    var textLike = this.state.liked ? 'like' : 'don\'t liked';
    return (
      <li key={this.props.id}>
        <span>{this.props.id}</span>
        <img  src={this.props.src} width={this.props.width} height={this.props.height} alt="alt" />
        <span>{this.props.name}</span>
        <button onClick={this.onClick}>{textLike}</button>
        <button onClick={this._onDelete}>Delete</button>
      </li>
    );
  }
});

module.exports = Avatar;