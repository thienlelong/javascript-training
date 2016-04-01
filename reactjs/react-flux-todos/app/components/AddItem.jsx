import React from 'react';

class AddItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleToggleCheckAll = this.handleToggleCheckAll.bind(this);
  }
  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-body form-horizontal">
          <label className="col-sm-1">
            <input type="checkbox"
              defaultChecked={false}
              ref="checkAll"
              onClick={this.handleToggleCheckAll} />
          </label>
          <div className="col-sm-11">
            <input type="text"
              ref="newItem"
              className="form-control"
              placeholder="New Item"
              onKeyDown={this.handleSubmit} />
          </div>
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

  handleToggleCheckAll(e) {
    let completed = this.refs.checkAll.checked;
    this.props.toggleCheckAll(completed);
  }
}


module.exports = AddItem;