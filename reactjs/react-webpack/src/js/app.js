var React = require('react');
var ReactDOM = require('react-dom');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
require('../css/style.css');
var Avatar = require('./avatar.js');

var Avatars = React.createClass({
  getInitialState() {
    return {
      avatars: [
        {id: 1, name: "Avatar 1", height: 100, width: 100, initialLike: false, src: "http://canime.files.wordpress.com/2010/05/mask-dtb.jpg"},
        {id: 2, name: "Avatar 2", height: 100, width: 100, initialLike: true, src: "http://z4.ifrm.com/30544/116/0/a3359905/avatar-3359905.jpg"},
        {id: 3, name: "Avatar 3", height: 100, width: 100, initialLike: false, src: "http://z4.ifrm.com/30544/116/0/a3359905/avatar-3359905.jpg"}
      ]
    };
  },
  // Thêm method deleteItem() set lại State (chứa các Component con) cho Component cha này
  deleteItem(id) {
    this.setState({
      avatars: this.state.avatars.filter(function(avatar){
        return avatar.id !== id;
      })
    });
  },
  render() {
    var avatars = this.state.avatars.map(function(avatar){
    // use below solution
    // map(function(){},this)
    // or map(function(){}.bind(this))
    // or var that = this; onDelete = {that.deleteUser}
    // to pass this value to map function.
    // bind onDelete (event) to deleteUser.
      return <Avatar onDelete={this.deleteItem} id={avatar.id} name={avatar.name} width={avatar.width} height={avatar.height} src={avatar.src} initialLike={avatar.initialLike} />;
    }, this);
    return (
      <ul>
        <ReactCSSTransitionGroup transitionName="example" transitionAppear={true} transitionAppearTimeout={500}>
          {avatars}
        </ReactCSSTransitionGroup>
      </ul>
    );
  }
});

var AvatarsComponent = ReactDOM.render(
  <Avatars />, document.getElementById('react')
);