import React from 'react';

class AddItem extends React.Component {
  constructor(props) {
    super(props);
    this._onSubmit = this._onSubmit.bind(this);
    this._onToggleCheckAll = this._onToggleCheckAll.bind(this);
  }
  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-body form-horizontal">
          <label className="col-sm-1">
            <input type="checkbox"
              checked={this.props.areAllComplete}
              ref="checkAll"
              onClick={this._onToggleCheckAll} />
          </label>
          <div className="col-sm-11">
            <input type="text"
              ref="newItem"
              className="form-control"
              placeholder="New Item"
              onKeyDown={this._onSubmit} />
          </div>
        </div>
      </div>
    )
  }

  _onSubmit(e) {
    if(e.keyCode === 13){
      let newItem = this.refs.newItem.value;
      this.refs.newItem.value = '';
      this.props.addItem(newItem);
    }
  }

  _onToggleCheckAll(e) {
    let completed = this.refs.checkAll.checked;
    this.props.toggleCheckAll(completed);
  }
}


module.exports = AddItem;