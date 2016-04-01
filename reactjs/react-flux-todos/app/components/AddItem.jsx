import React from 'react';

class AddItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-body">
          <input type="text"
            ref="newItem"
            className="form-control"
            placeholder="New Item"
            onKeyDown={this.handleSubmit} />
        </div>
      </div>
    )
  }

  handleSubmit(e) {
    if(e.keyCode === 13){
      let newItem = this.refs.newItem.value;
      this.refs.newItem.value = '';
      this.props.addItem(newItem);
    }
  }
}


module.exports = AddItem;